import crypto from 'crypto';
import zlib from 'zlib';

// Pre-generated 2048-bit RSA Debug Signing Key & Self-Signed X.509 Certificate (DER)
let cachedCertDer: Buffer | null = null;
let cachedPrivateKeyPem: string | null = null;

function getAndroidDebugKeyAndCert(): {
  privateKeyPem: string;
  certDer: Buffer;
} {
  if (cachedPrivateKeyPem && cachedCertDer) {
    return { privateKeyPem: cachedPrivateKeyPem, certDer: cachedCertDer };
  }

  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'der' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });

  cachedPrivateKeyPem = privateKey;
  cachedCertDer = buildSelfSignedX509Der(publicKey, privateKey);
  return { privateKeyPem: cachedPrivateKeyPem, certDer: cachedCertDer };
}

function asn1Length(len: number): Buffer {
  if (len < 128) return Buffer.from([len]);
  const hex = len.toString(16);
  const padded = hex.length % 2 === 0 ? hex : '0' + hex;
  const bytes = Buffer.from(padded, 'hex');
  return Buffer.concat([Buffer.from([0x80 | bytes.length]), bytes]);
}

function asn1Tag(tag: number, content: Buffer): Buffer {
  return Buffer.concat([
    Buffer.from([tag]),
    asn1Length(content.length),
    content,
  ]);
}

function asn1Seq(items: Buffer[]): Buffer {
  return asn1Tag(0x30, Buffer.concat(items));
}

function asn1Set(items: Buffer[]): Buffer {
  return asn1Tag(0x31, Buffer.concat(items));
}

function asn1Oid(oidBytes: number[]): Buffer {
  return asn1Tag(0x06, Buffer.from(oidBytes));
}

function asn1Utf8(str: string): Buffer {
  return asn1Tag(0x0c, Buffer.from(str, 'utf8'));
}

function asn1UtcTime(str: string): Buffer {
  return asn1Tag(0x17, Buffer.from(str, 'ascii'));
}

function asn1Integer(numBytes: Buffer): Buffer {
  if (numBytes[0] & 0x80) {
    return asn1Tag(0x02, Buffer.concat([Buffer.from([0x00]), numBytes]));
  }
  return asn1Tag(0x02, numBytes);
}

function buildSelfSignedX509Der(
  spkiDer: Buffer,
  privateKeyPem: string
): Buffer {
  const version = asn1Tag(0xa0, asn1Integer(Buffer.from([0x02])));
  const serial = asn1Integer(Buffer.from([0x01, 0x23, 0x45, 0x67]));
  const sigAlg = asn1Seq([
    asn1Oid([0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x0b]),
    Buffer.from([0x05, 0x00]),
  ]);

  const cnAttr = asn1Set([
    asn1Seq([asn1Oid([0x55, 0x04, 0x03]), asn1Utf8('Android Debug')]),
  ]);
  const issuer = asn1Seq([cnAttr]);
  const validity = asn1Seq([
    asn1UtcTime('240101000000Z'),
    asn1UtcTime('491231235959Z'),
  ]);

  const tbsCertificate = asn1Seq([
    version,
    serial,
    sigAlg,
    issuer,
    validity,
    issuer,
    spkiDer,
  ]);

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(tbsCertificate);
  const signature = signer.sign(privateKeyPem);

  const bitStringSig = asn1Tag(
    0x03,
    Buffer.concat([Buffer.from([0x00]), signature])
  );

  return asn1Seq([tbsCertificate, sigAlg, bitStringSig]);
}

function buildUtf16StringPoolChunk(strings: string[]): Buffer {
  if (strings.length === 0) {
    const emptyHeader = Buffer.alloc(28, 0);
    emptyHeader.writeUInt16LE(0x0001, 0); // RES_STRING_POOL_TYPE
    emptyHeader.writeUInt16LE(28, 2);
    emptyHeader.writeUInt32LE(28, 4);
    emptyHeader.writeUInt32LE(0, 8);
    emptyHeader.writeUInt32LE(0, 12);
    emptyHeader.writeUInt32LE(0, 16);
    emptyHeader.writeUInt32LE(28, 20);
    emptyHeader.writeUInt32LE(0, 24);
    return emptyHeader;
  }

  const encodedStrings: Buffer[] = strings.map((str) => {
    const u16 = Buffer.from(str, 'utf16le');
    const lenBuf = Buffer.alloc(2);
    lenBuf.writeUInt16LE(str.length, 0);
    const nullTerm = Buffer.alloc(2, 0);
    return Buffer.concat([lenBuf, u16, nullTerm]);
  });

  const offsetsBuf = Buffer.alloc(strings.length * 4);
  let currentOffset = 0;
  for (let i = 0; i < encodedStrings.length; i++) {
    offsetsBuf.writeUInt32LE(currentOffset, i * 4);
    currentOffset += encodedStrings[i].length;
  }

  let stringsDataBuf = Buffer.concat(encodedStrings);
  if (stringsDataBuf.length % 4 !== 0) {
    const pad = 4 - (stringsDataBuf.length % 4);
    stringsDataBuf = Buffer.concat([stringsDataBuf, Buffer.alloc(pad, 0)]);
  }

  const spHeaderSize = 28;
  const stringsStart = spHeaderSize + offsetsBuf.length;
  const spChunkSize = stringsStart + stringsDataBuf.length;
  const spHeader = Buffer.alloc(spHeaderSize);
  spHeader.writeUInt16LE(0x0001, 0); // RES_STRING_POOL_TYPE
  spHeader.writeUInt16LE(spHeaderSize, 2);
  spHeader.writeUInt32LE(spChunkSize, 4);
  spHeader.writeUInt32LE(strings.length, 8);
  spHeader.writeUInt32LE(0, 12);
  spHeader.writeUInt32LE(0, 16); // UTF-16LE
  spHeader.writeUInt32LE(stringsStart, 20);
  spHeader.writeUInt32LE(0, 24);

  return Buffer.concat([spHeader, offsetsBuf, stringsDataBuf]);
}

/**
 * Encodes a valid Android Binary XML (AXML / 0x00080003) AndroidManifest.xml
 * with:
 * - android:icon="@mipmap/ic_launcher" (0x7f010000) so the custom App Logo shows in the installer & launcher
 * - android:theme="@android:style/Theme.NoTitleBar" (0x01030006) so there is no black "Shop" ActionBar
 * - android:usesCleartextTraffic="true" (0x010104ec) so WebView can load http/https assets
 * - targetSdkVersion="34" so Google Play Protect does not show "built for an older version of Android"
 * - MainActivity (<packageName>.MainActivity) launched on app open
 */
export function buildBinaryAndroidManifest(options: {
  packageName: string;
  appName: string;
  versionCode?: number;
  versionName?: string;
}): Buffer {
  const pkg = options.packageName.trim() || 'com.defineatelier.app';
  const label = options.appName.trim() || 'Define Atelier';
  const versionCode = options.versionCode || 1;
  const versionName = options.versionName || '1.0.0';
  const mainActivityClass = `${pkg}.MainActivity`;

  // Attributes with resource IDs must appear first in the String Pool, sorted by their resource ID
  const resAttrDefs = [
    { name: 'theme', id: 0x01010000 },
    { name: 'label', id: 0x01010001 },
    { name: 'icon', id: 0x01010002 },
    { name: 'name', id: 0x01010003 },
    { name: 'exported', id: 0x01010010 },
    { name: 'minSdkVersion', id: 0x0101020c },
    { name: 'versionCode', id: 0x0101021b },
    { name: 'versionName', id: 0x0101021c },
    { name: 'targetSdkVersion', id: 0x01010270 },
    { name: 'usesCleartextTraffic', id: 0x010104ec },
  ];

  const extraStrings = [
    'http://schemas.android.com/apk/res/android',
    'android',
    'manifest',
    'package',
    pkg,
    versionName,
    'uses-sdk',
    'uses-permission',
    'android.permission.INTERNET',
    'application',
    label,
    'activity',
    mainActivityClass,
    'intent-filter',
    'action',
    'android.intent.action.MAIN',
    'category',
    'android.intent.category.LAUNCHER',
  ];

  const allStrings = [...resAttrDefs.map((d) => d.name), ...extraStrings];
  const strIdx = (s: string) => allStrings.indexOf(s);

  const stringPoolChunk = buildUtf16StringPoolChunk(allStrings);

  // Resource ID Map Chunk (0x00080180)
  const resMapSize = 8 + resAttrDefs.length * 4;
  const resMapChunk = Buffer.alloc(resMapSize);
  resMapChunk.writeUInt16LE(0x0180, 0);
  resMapChunk.writeUInt16LE(8, 2);
  resMapChunk.writeUInt32LE(resMapSize, 4);
  resAttrDefs.forEach((def, idx) => {
    resMapChunk.writeUInt32LE(def.id, 8 + idx * 4);
  });

  const nsUriIdx = strIdx('http://schemas.android.com/apk/res/android');
  const nsPrefixIdx = strIdx('android');
  const NO_INDEX = 0xffffffff;

  function makeNamespaceChunk(isStart: boolean, line: number): Buffer {
    const b = Buffer.alloc(24);
    b.writeUInt16LE(isStart ? 0x0100 : 0x0101, 0);
    b.writeUInt16LE(16, 2);
    b.writeUInt32LE(24, 4);
    b.writeUInt32LE(line, 8);
    b.writeUInt32LE(NO_INDEX, 12);
    b.writeUInt32LE(nsPrefixIdx, 16);
    b.writeUInt32LE(nsUriIdx, 20);
    return b;
  }

  interface XmlAttr {
    nsIdx: number;
    nameIdx: number;
    rawValIdx: number;
    dataType: number; // 0x01 = reference, 0x03 = string, 0x10 = int_dec, 0x12 = boolean
    data: number;
  }

  function makeStartElement(
    tagName: string,
    line: number,
    attrs: XmlAttr[]
  ): Buffer {
    const totalSize = 36 + attrs.length * 20;
    const b = Buffer.alloc(totalSize);
    b.writeUInt16LE(0x0102, 0);
    b.writeUInt16LE(16, 2);
    b.writeUInt32LE(totalSize, 4);
    b.writeUInt32LE(line, 8);
    b.writeUInt32LE(NO_INDEX, 12);
    b.writeUInt32LE(NO_INDEX, 16);
    b.writeUInt32LE(strIdx(tagName), 20);
    b.writeUInt16LE(20, 24);
    b.writeUInt16LE(20, 26);
    b.writeUInt16LE(attrs.length, 28);
    b.writeUInt16LE(0, 30);
    b.writeUInt16LE(0, 32);
    b.writeUInt16LE(0, 34);

    attrs.forEach((attr, i) => {
      const off = 36 + i * 20;
      b.writeUInt32LE(attr.nsIdx, off);
      b.writeUInt32LE(attr.nameIdx, off + 4);
      b.writeUInt32LE(attr.rawValIdx, off + 8);
      b.writeUInt16LE(8, off + 12);
      b.writeUInt8(0, off + 14);
      b.writeUInt8(attr.dataType, off + 15);
      b.writeUInt32LE(attr.data >>> 0, off + 16);
    });

    return b;
  }

  function makeEndElement(tagName: string, line: number): Buffer {
    const b = Buffer.alloc(24);
    b.writeUInt16LE(0x0103, 0);
    b.writeUInt16LE(16, 2);
    b.writeUInt32LE(24, 4);
    b.writeUInt32LE(line, 8);
    b.writeUInt32LE(NO_INDEX, 12);
    b.writeUInt32LE(NO_INDEX, 16);
    b.writeUInt32LE(strIdx(tagName), 20);
    return b;
  }

  function strAttr(ns: number, name: string, val: string): XmlAttr {
    const vIdx = strIdx(val);
    return {
      nsIdx: ns,
      nameIdx: strIdx(name),
      rawValIdx: vIdx,
      dataType: 0x03, // TYPE_STRING
      data: vIdx,
    };
  }

  function intAttr(ns: number, name: string, val: number): XmlAttr {
    return {
      nsIdx: ns,
      nameIdx: strIdx(name),
      rawValIdx: NO_INDEX,
      dataType: 0x10, // TYPE_INT_DEC
      data: val,
    };
  }

  function boolAttr(ns: number, name: string, val: boolean): XmlAttr {
    return {
      nsIdx: ns,
      nameIdx: strIdx(name),
      rawValIdx: NO_INDEX,
      dataType: 0x12, // TYPE_INT_BOOLEAN
      data: val ? 0xffffffff : 0,
    };
  }

  function refAttr(ns: number, name: string, resId: number): XmlAttr {
    return {
      nsIdx: ns,
      nameIdx: strIdx(name),
      rawValIdx: NO_INDEX,
      dataType: 0x01, // TYPE_REFERENCE
      data: resId,
    };
  }

  // Attributes inside each element sorted by resource ID
  const xmlNodes = Buffer.concat([
    makeNamespaceChunk(true, 1),
    makeStartElement('manifest', 2, [
      intAttr(nsUriIdx, 'versionCode', versionCode),
      strAttr(nsUriIdx, 'versionName', versionName),
      strAttr(NO_INDEX, 'package', pkg),
    ]),
    makeStartElement('uses-sdk', 3, [
      intAttr(nsUriIdx, 'minSdkVersion', 24),
      intAttr(nsUriIdx, 'targetSdkVersion', 34),
    ]),
    makeEndElement('uses-sdk', 3),
    makeStartElement('uses-permission', 4, [
      strAttr(nsUriIdx, 'name', 'android.permission.INTERNET'),
    ]),
    makeEndElement('uses-permission', 4),
    // <application android:theme="@android:style/Theme.NoTitleBar" android:label="..." android:icon="@mipmap/ic_launcher" android:usesCleartextTraffic="true">
    makeStartElement('application', 5, [
      refAttr(nsUriIdx, 'theme', 0x01030006), // @android:style/Theme.NoTitleBar
      strAttr(nsUriIdx, 'label', label),
      refAttr(nsUriIdx, 'icon', 0x7f010000), // @mipmap/ic_launcher in resources.arsc
      boolAttr(nsUriIdx, 'usesCleartextTraffic', true),
    ]),
    // <activity android:theme="@android:style/Theme.NoTitleBar" android:label="..." android:icon="@mipmap/ic_launcher" android:name="<pkg>.MainActivity" android:exported="true">
    makeStartElement('activity', 6, [
      refAttr(nsUriIdx, 'theme', 0x01030006),
      strAttr(nsUriIdx, 'label', label),
      refAttr(nsUriIdx, 'icon', 0x7f010000),
      strAttr(nsUriIdx, 'name', mainActivityClass),
      boolAttr(nsUriIdx, 'exported', true),
    ]),
    makeStartElement('intent-filter', 7, []),
    makeStartElement('action', 8, [
      strAttr(nsUriIdx, 'name', 'android.intent.action.MAIN'),
    ]),
    makeEndElement('action', 8),
    makeStartElement('category', 9, [
      strAttr(nsUriIdx, 'name', 'android.intent.category.LAUNCHER'),
    ]),
    makeEndElement('category', 9),
    makeEndElement('intent-filter', 7),
    makeEndElement('activity', 6),
    makeEndElement('application', 5),
    makeEndElement('manifest', 2),
    makeNamespaceChunk(false, 10),
  ]);

  const totalAxmSize =
    8 + stringPoolChunk.length + resMapChunk.length + xmlNodes.length;
  const axmlHeader = Buffer.alloc(8);
  axmlHeader.writeUInt16LE(0x0003, 0);
  axmlHeader.writeUInt16LE(8, 2);
  axmlHeader.writeUInt32LE(totalAxmSize, 4);

  return Buffer.concat([axmlHeader, stringPoolChunk, resMapChunk, xmlNodes]);
}

/**
 * Generates a compiled Android resource table (resources.arsc) mapping
 * resource ID 0x7f010000 (@mipmap/ic_launcher) to "res/mipmap/ic_launcher.png"
 * so the Android Package Installer and Home Screen Launcher display the user's custom App Logo.
 */
export function buildResourcesArscWithIcon(packageName: string): Buffer {
  const globalStringPool = buildUtf16StringPoolChunk([
    'res/mipmap/ic_launcher.png',
  ]);
  const typeStringPool = buildUtf16StringPoolChunk(['mipmap']);
  const keyStringPool = buildUtf16StringPoolChunk(['ic_launcher']);

  // 1. ResTable_typeSpec (0x0202) for type id = 1 (mipmap), 1 entry
  const typeSpecChunk = Buffer.alloc(20, 0);
  typeSpecChunk.writeUInt16LE(0x0202, 0); // RES_TABLE_TYPE_SPEC_TYPE
  typeSpecChunk.writeUInt16LE(16, 2); // headerSize = 16
  typeSpecChunk.writeUInt32LE(20, 4); // chunkSize = 20
  typeSpecChunk.writeUInt8(1, 8); // id = 1 (1-based)
  typeSpecChunk.writeUInt8(0, 9);
  typeSpecChunk.writeUInt16LE(0, 10);
  typeSpecChunk.writeUInt32LE(1, 12); // entryCount = 1
  typeSpecChunk.writeUInt32LE(0, 16); // flags for entry 0 = 0 (default config)

  // 2. ResTable_type (0x0201) for type id = 1 (mipmap), default config
  // Header = 20 bytes + ResTable_config (48 bytes) = 68 bytes
  // Offset table = 4 bytes (1 entry at offset 0)
  // Entry + Value = 16 bytes (ResTable_entry 8 bytes + Res_value 8 bytes)
  // Total = 88 bytes
  const typeChunkHeaderSize = 68;
  const entriesStart = 72; // 68 + 4
  const typeChunkSize = 88;
  const typeChunk = Buffer.alloc(typeChunkSize, 0);
  typeChunk.writeUInt16LE(0x0201, 0); // RES_TABLE_TYPE_TYPE
  typeChunk.writeUInt16LE(typeChunkHeaderSize, 2);
  typeChunk.writeUInt32LE(typeChunkSize, 4);
  typeChunk.writeUInt8(1, 8); // id = 1
  typeChunk.writeUInt8(0, 9);
  typeChunk.writeUInt16LE(0, 10);
  typeChunk.writeUInt32LE(1, 12); // entryCount = 1
  typeChunk.writeUInt32LE(entriesStart, 16);
  typeChunk.writeUInt32LE(48, 20); // ResTable_config.size = 48 (all other config fields 0 = default)

  // Entry offset array at byte 68
  typeChunk.writeUInt32LE(0, 68); // entry 0 starts at offset 0 from entriesStart

  // ResTable_entry at byte 72
  typeChunk.writeUInt16LE(8, 72); // size = 8
  typeChunk.writeUInt16LE(0, 74); // flags = 0
  typeChunk.writeUInt32LE(0, 76); // key = 0 ('ic_launcher' in keyStringPool)

  // Res_value at byte 80
  typeChunk.writeUInt16LE(8, 80); // size = 8
  typeChunk.writeUInt8(0, 82); // res0 = 0
  typeChunk.writeUInt8(0x03, 83); // dataType = TYPE_STRING (points to globalStringPool)
  typeChunk.writeUInt32LE(0, 84); // data = 0 ('res/mipmap/ic_launcher.png')

  // 3. ResTable_package (0x0200)
  const pkgHeaderSize = 288;
  const typeStringsOffset = pkgHeaderSize;
  const keyStringsOffset = typeStringsOffset + typeStringPool.length;
  const pkgChunkSize =
    pkgHeaderSize +
    typeStringPool.length +
    keyStringPool.length +
    typeSpecChunk.length +
    typeChunk.length;

  const pkgHeader = Buffer.alloc(pkgHeaderSize, 0);
  pkgHeader.writeUInt16LE(0x0200, 0); // RES_TABLE_PACKAGE_TYPE
  pkgHeader.writeUInt16LE(pkgHeaderSize, 2);
  pkgHeader.writeUInt32LE(pkgChunkSize, 4);
  pkgHeader.writeUInt32LE(0x7f, 8); // package id = 0x7f

  const pkgNameBuf = Buffer.from(packageName.slice(0, 127), 'utf16le');
  pkgNameBuf.copy(pkgHeader, 12);

  pkgHeader.writeUInt32LE(typeStringsOffset, 268);
  pkgHeader.writeUInt32LE(1, 272); // lastPublicType = 1
  pkgHeader.writeUInt32LE(keyStringsOffset, 276);
  pkgHeader.writeUInt32LE(1, 280); // lastPublicKey = 1
  pkgHeader.writeUInt32LE(0, 284); // typeIdOffset = 0

  const pkgChunk = Buffer.concat([
    pkgHeader,
    typeStringPool,
    keyStringPool,
    typeSpecChunk,
    typeChunk,
  ]);

  // 4. Top-level ResTable_header (0x0002)
  const totalSize = 12 + globalStringPool.length + pkgChunk.length;
  const tableHeader = Buffer.alloc(12, 0);
  tableHeader.writeUInt16LE(0x0002, 0); // RES_TABLE_TYPE
  tableHeader.writeUInt16LE(12, 2);
  tableHeader.writeUInt32LE(totalSize, 4);
  tableHeader.writeUInt32LE(1, 8); // packageCount = 1

  return Buffer.concat([tableHeader, globalStringPool, pkgChunk]);
}

function encodeUleb128(value: number): Buffer {
  const bytes: number[] = [];
  let val = value >>> 0;
  do {
    let byte = val & 0x7f;
    val >>>= 7;
    if (val !== 0) {
      byte |= 0x80;
    }
    bytes.push(byte);
  } while (val !== 0);
  return Buffer.from(bytes);
}

function encodeMutf8StringItem(str: string): Buffer {
  const utf8Buf = Buffer.from(str, 'utf8');
  // In ASCII strings, UTF-16 code unit length === UTF-8 byte length
  const lenPrefix = encodeUleb128(str.length);
  return Buffer.concat([lenPrefix, utf8Buf, Buffer.from([0x00])]);
}

/**
 * Dynamically compiles a Dalvik Executable (classes.dex) containing `<packageName>.MainActivity`
 * extending `android.app.Activity`.
 *
 * Inside `onCreate(Bundle)`:
 *   super.onCreate(savedInstanceState);
 *   WebView wv = new WebView(this);
 *   WebSettings ws = wv.getSettings();
 *   ws.setJavaScriptEnabled(true);
 *   ws.setDomStorageEnabled(true);
 *   wv.setWebViewClient(new WebViewClient());
 *   wv.loadUrl(launchUrl);
 *   this.setContentView(wv);
 */
export function buildWebViewClassesDex(options: {
  packageName: string;
  launchUrl: string;
}): Buffer {
  const pkg = options.packageName.trim() || 'com.defineatelier.app';
  const classDesc = `L${pkg.replace(/\./g, '/')}/MainActivity;`;
  const launchUrl = options.launchUrl || 'file:///android_asset/index.html';

  // 1. Collect all strings and sort lexicographically (mandatory in DEX format!)
  const rawStrings = [
    '<init>',
    'L',
    'Landroid/app/Activity;',
    'Landroid/content/Context;',
    'Landroid/os/Bundle;',
    'Landroid/view/View;',
    'Landroid/webkit/WebSettings;',
    'Landroid/webkit/WebView;',
    'Landroid/webkit/WebViewClient;',
    'Ljava/lang/String;',
    'V',
    'VL',
    'VZ',
    'Z',
    classDesc,
    'getSettings',
    'loadUrl',
    'onCreate',
    'setContentView',
    'setDomStorageEnabled',
    'setJavaScriptEnabled',
    'setWebViewClient',
    launchUrl,
  ];

  const uniqueStrings = Array.from(new Set(rawStrings)).sort();
  const sIdx = (s: string) => {
    const i = uniqueStrings.indexOf(s);
    if (i === -1) throw new Error(`Missing DEX string: ${s}`);
    return i;
  };

  // 2. Collect Type Descriptors and sort by their String ID index (mandatory in DEX!)
  const rawTypes = [
    'Landroid/app/Activity;',
    'Landroid/content/Context;',
    'Landroid/os/Bundle;',
    'Landroid/view/View;',
    'Landroid/webkit/WebSettings;',
    'Landroid/webkit/WebView;',
    'Landroid/webkit/WebViewClient;',
    'Ljava/lang/String;',
    'V',
    'Z',
    classDesc,
  ];
  const sortedTypes = rawTypes.slice().sort((a, b) => sIdx(a) - sIdx(b));
  const tIdx = (t: string) => {
    const i = sortedTypes.indexOf(t);
    if (i === -1) throw new Error(`Missing DEX type: ${t}`);
    return i;
  };

  // 3. Define Prototypes and sort by (return_type_idx, parameters_list)
  interface ProtoDef {
    key: string;
    shorty: string;
    returnType: string;
    params: string[];
  }
  const rawProtos: ProtoDef[] = [
    { key: '()V', shorty: 'V', returnType: 'V', params: [] },
    {
      key: '()WebSettings',
      shorty: 'L',
      returnType: 'Landroid/webkit/WebSettings;',
      params: [],
    },
    {
      key: '(Context)V',
      shorty: 'VL',
      returnType: 'V',
      params: ['Landroid/content/Context;'],
    },
    {
      key: '(Bundle)V',
      shorty: 'VL',
      returnType: 'V',
      params: ['Landroid/os/Bundle;'],
    },
    {
      key: '(View)V',
      shorty: 'VL',
      returnType: 'V',
      params: ['Landroid/view/View;'],
    },
    {
      key: '(WebViewClient)V',
      shorty: 'VL',
      returnType: 'V',
      params: ['Landroid/webkit/WebViewClient;'],
    },
    {
      key: '(String)V',
      shorty: 'VL',
      returnType: 'V',
      params: ['Ljava/lang/String;'],
    },
    { key: '(Z)V', shorty: 'VZ', returnType: 'V', params: ['Z'] },
  ];

  const sortedProtos = rawProtos.slice().sort((a, b) => {
    const rDiff = tIdx(a.returnType) - tIdx(b.returnType);
    if (rDiff !== 0) return rDiff;
    const minLen = Math.min(a.params.length, b.params.length);
    for (let i = 0; i < minLen; i++) {
      const pDiff = tIdx(a.params[i]) - tIdx(b.params[i]);
      if (pDiff !== 0) return pDiff;
    }
    return a.params.length - b.params.length;
  });

  const pIdx = (key: string) => {
    const i = sortedProtos.findIndex((p) => p.key === key);
    if (i === -1) throw new Error(`Missing DEX proto: ${key}`);
    return i;
  };

  // 4. Define Methods and sort by (class_idx, name_idx, proto_idx)
  interface MethodDef {
    key: string;
    classType: string;
    name: string;
    protoKey: string;
  }
  const rawMethods: MethodDef[] = [
    {
      key: 'Activity.<init>',
      classType: 'Landroid/app/Activity;',
      name: '<init>',
      protoKey: '()V',
    },
    {
      key: 'Activity.onCreate',
      classType: 'Landroid/app/Activity;',
      name: 'onCreate',
      protoKey: '(Bundle)V',
    },
    {
      key: 'Activity.setContentView',
      classType: 'Landroid/app/Activity;',
      name: 'setContentView',
      protoKey: '(View)V',
    },
    {
      key: 'WebSettings.setDomStorageEnabled',
      classType: 'Landroid/webkit/WebSettings;',
      name: 'setDomStorageEnabled',
      protoKey: '(Z)V',
    },
    {
      key: 'WebSettings.setJavaScriptEnabled',
      classType: 'Landroid/webkit/WebSettings;',
      name: 'setJavaScriptEnabled',
      protoKey: '(Z)V',
    },
    {
      key: 'WebView.<init>',
      classType: 'Landroid/webkit/WebView;',
      name: '<init>',
      protoKey: '(Context)V',
    },
    {
      key: 'WebView.getSettings',
      classType: 'Landroid/webkit/WebView;',
      name: 'getSettings',
      protoKey: '()WebSettings',
    },
    {
      key: 'WebView.loadUrl',
      classType: 'Landroid/webkit/WebView;',
      name: 'loadUrl',
      protoKey: '(String)V',
    },
    {
      key: 'WebView.setWebViewClient',
      classType: 'Landroid/webkit/WebView;',
      name: 'setWebViewClient',
      protoKey: '(WebViewClient)V',
    },
    {
      key: 'WebViewClient.<init>',
      classType: 'Landroid/webkit/WebViewClient;',
      name: '<init>',
      protoKey: '()V',
    },
    {
      key: 'MainActivity.<init>',
      classType: classDesc,
      name: '<init>',
      protoKey: '()V',
    },
    {
      key: 'MainActivity.onCreate',
      classType: classDesc,
      name: 'onCreate',
      protoKey: '(Bundle)V',
    },
  ];

  const sortedMethods = rawMethods.slice().sort((a, b) => {
    const cDiff = tIdx(a.classType) - tIdx(b.classType);
    if (cDiff !== 0) return cDiff;
    const nDiff = sIdx(a.name) - sIdx(b.name);
    if (nDiff !== 0) return nDiff;
    return pIdx(a.protoKey) - pIdx(b.protoKey);
  });

  const mIdx = (key: string) => {
    const i = sortedMethods.findIndex((m) => m.key === key);
    if (i === -1) throw new Error(`Missing DEX method: ${key}`);
    return i;
  };

  // 5. Build code_item for MainActivity.<init>()V
  // registers_size=1 (v0=this), ins_size=1, outs_size=1, tries_size=0
  // invoke-direct {v0}, Activity.<init> (70 10 <mIdx> 00 00)
  // return-void (0e 00)
  const initCodeItem = Buffer.alloc(16 + 8, 0);
  initCodeItem.writeUInt16LE(1, 0); // registers_size = 1
  initCodeItem.writeUInt16LE(1, 2); // ins_size = 1
  initCodeItem.writeUInt16LE(1, 4); // outs_size = 1
  initCodeItem.writeUInt16LE(0, 6); // tries_size = 0
  initCodeItem.writeUInt32LE(0, 8); // debug_info_off = 0
  initCodeItem.writeUInt32LE(4, 12); // insns_size = 4 (16-bit units)
  // 70 10 <mIdx> 00 00
  initCodeItem.writeUInt8(0x70, 16);
  initCodeItem.writeUInt8(0x10, 17);
  initCodeItem.writeUInt16LE(mIdx('Activity.<init>'), 18);
  initCodeItem.writeUInt16LE(0x0000, 20);
  // 0e 00
  initCodeItem.writeUInt8(0x0e, 22);
  initCodeItem.writeUInt8(0x00, 23);

  // 6. Build code_item for MainActivity.onCreate(Bundle)V
  // registers_size = 4 (v0=WebView, v1=WebSettings/WebViewClient/String, v2=this, v3=Bundle)
  // ins_size = 2 (v2, v3), outs_size = 2
  const insns: number[] = [];
  const pushU16 = (val: number) => insns.push(val & 0xffff);
  const invoke35c = (
    opcode: number,
    argCount: number,
    methodIndex: number,
    regC: number,
    regD = 0
  ) => {
    pushU16(((argCount << 12) | opcode) & 0xffff);
    pushU16(methodIndex);
    pushU16(((regD << 4) | regC) & 0xffff);
  };

  // 1. invoke-super {v2, v3}, Activity.onCreate(Bundle)V
  invoke35c(0x6f, 2, mIdx('Activity.onCreate'), 2, 3);

  // 2. new-instance v0, WebView (22 00 <tIdx>)
  pushU16(0x0022); // op=0x22, reg=v0
  pushU16(tIdx('Landroid/webkit/WebView;'));

  // 3. invoke-direct {v0, v2}, WebView.<init>(Context)V
  invoke35c(0x70, 2, mIdx('WebView.<init>'), 0, 2);

  // 4. invoke-virtual {v0}, WebView.getSettings()WebSettings
  invoke35c(0x6e, 1, mIdx('WebView.getSettings'), 0);

  // 5. move-result-object v1 (0c 01)
  pushU16(0x010c);

  // 6. const/4 v3, 1 (12 13)
  pushU16(0x1312);

  // 7. invoke-virtual {v1, v3}, WebSettings.setJavaScriptEnabled(Z)V
  invoke35c(0x6e, 2, mIdx('WebSettings.setJavaScriptEnabled'), 1, 3);

  // 8. invoke-virtual {v1, v3}, WebSettings.setDomStorageEnabled(Z)V
  invoke35c(0x6e, 2, mIdx('WebSettings.setDomStorageEnabled'), 1, 3);

  // 9. new-instance v1, WebViewClient (22 01 <tIdx>)
  pushU16(0x0122);
  pushU16(tIdx('Landroid/webkit/WebViewClient;'));

  // 10. invoke-direct {v1}, WebViewClient.<init>()V
  invoke35c(0x70, 1, mIdx('WebViewClient.<init>'), 1);

  // 11. invoke-virtual {v0, v1}, WebView.setWebViewClient(WebViewClient)V
  invoke35c(0x6e, 2, mIdx('WebView.setWebViewClient'), 0, 1);

  // 12. const-string v1, launchUrl (1a 01 <sIdx>)
  pushU16(0x011a);
  pushU16(sIdx(launchUrl));

  // 13. invoke-virtual {v0, v1}, WebView.loadUrl(String)V
  invoke35c(0x6e, 2, mIdx('WebView.loadUrl'), 0, 1);

  // 14. invoke-virtual {v2, v0}, Activity.setContentView(View)V
  invoke35c(0x6e, 2, mIdx('Activity.setContentView'), 2, 0);

  // 15. return-void (0e 00)
  pushU16(0x000e);

  // Pad insns to even number of 16-bit units for 4-byte alignment
  if (insns.length % 2 !== 0) {
    pushU16(0x0000); // nop
  }

  const onCreateCodeItem = Buffer.alloc(16 + insns.length * 2, 0);
  onCreateCodeItem.writeUInt16LE(4, 0); // registers_size = 4
  onCreateCodeItem.writeUInt16LE(2, 2); // ins_size = 2
  onCreateCodeItem.writeUInt16LE(2, 4); // outs_size = 2
  onCreateCodeItem.writeUInt16LE(0, 6); // tries_size = 0
  onCreateCodeItem.writeUInt32LE(0, 8); // debug_info_off = 0
  onCreateCodeItem.writeUInt32LE(insns.length, 12);
  insns.forEach((word, idx) => {
    onCreateCodeItem.writeUInt16LE(word, 16 + idx * 2);
  });

  // 7. Layout fixed tables after 112-byte DEX Header
  const headerSize = 0x70; // 112 bytes
  const stringIdsSize = uniqueStrings.length;
  const stringIdsOff = headerSize;

  const typeIdsSize = sortedTypes.length;
  const typeIdsOff = stringIdsOff + stringIdsSize * 4;

  const protoIdsSize = sortedProtos.length;
  const protoIdsOff = typeIdsOff + typeIdsSize * 4;

  const methodIdsSize = sortedMethods.length;
  const methodIdsOff = protoIdsOff + protoIdsSize * 12;

  const classDefsSize = 1;
  const classDefsOff = methodIdsOff + methodIdsSize * 8;

  const dataStartOff = classDefsOff + classDefsSize * 32;

  // Build Data Section with exact offsets
  const dataChunks: Buffer[] = [];
  let currentDataOff = dataStartOff;

  const pushDataChunk = (buf: Buffer, align4 = false): number => {
    if (align4 && currentDataOff % 4 !== 0) {
      const pad = 4 - (currentDataOff % 4);
      dataChunks.push(Buffer.alloc(pad, 0));
      currentDataOff += pad;
    }
    const off = currentDataOff;
    dataChunks.push(buf);
    currentDataOff += buf.length;
    return off;
  };

  // 7a. type_list items for Protos that have parameters (4-byte aligned)
  const protoParamOffsets: number[] = sortedProtos.map((proto) => {
    if (proto.params.length === 0) return 0;
    const tlBuf = Buffer.alloc(4 + proto.params.length * 2, 0);
    tlBuf.writeUInt32LE(proto.params.length, 0);
    proto.params.forEach((paramType, idx) => {
      tlBuf.writeUInt16LE(tIdx(paramType), 4 + idx * 2);
    });
    return pushDataChunk(tlBuf, true);
  });

  // 7b. code_item for <init> and onCreate (4-byte aligned)
  const initCodeOff = pushDataChunk(initCodeItem, true);
  const onCreateCodeOff = pushDataChunk(onCreateCodeItem, true);

  // 7c. string_data_item for each string
  const stringDataOffsets: number[] = uniqueStrings.map((s) => {
    const itemBuf = encodeMutf8StringItem(s);
    return pushDataChunk(itemBuf, false);
  });

  // 7d. class_data_item for MainActivity
  // static_fields=0, instance_fields=0, direct_methods=1 (<init>), virtual_methods=1 (onCreate)
  const classDataBuf = Buffer.concat([
    encodeUleb128(0), // static_fields_size
    encodeUleb128(0), // instance_fields_size
    encodeUleb128(1), // direct_methods_size
    encodeUleb128(1), // virtual_methods_size
    // direct_method[0]: <init>, access_flags = ACC_PUBLIC | ACC_CONSTRUCTOR (0x10001), code_off
    encodeUleb128(mIdx('MainActivity.<init>')),
    encodeUleb128(0x10001),
    encodeUleb128(initCodeOff),
    // virtual_method[0]: onCreate, access_flags = ACC_PUBLIC (0x0001), code_off
    encodeUleb128(mIdx('MainActivity.onCreate')),
    encodeUleb128(0x0001),
    encodeUleb128(onCreateCodeOff),
  ]);
  const classDataOff = pushDataChunk(classDataBuf, false);

  // 7e. map_list (4-byte aligned)
  if (currentDataOff % 4 !== 0) {
    const pad = 4 - (currentDataOff % 4);
    dataChunks.push(Buffer.alloc(pad, 0));
    currentDataOff += pad;
  }
  const mapOff = currentDataOff;

  interface MapEntry {
    type: number;
    size: number;
    offset: number;
  }
  const mapEntries: MapEntry[] = [
    { type: 0x0000, size: 1, offset: 0 }, // TYPE_HEADER_ITEM
    { type: 0x0001, size: stringIdsSize, offset: stringIdsOff }, // TYPE_STRING_ID_ITEM
    { type: 0x0002, size: typeIdsSize, offset: typeIdsOff }, // TYPE_TYPE_ID_ITEM
    { type: 0x0003, size: protoIdsSize, offset: protoIdsOff }, // TYPE_PROTO_ID_ITEM
    { type: 0x0005, size: methodIdsSize, offset: methodIdsOff }, // TYPE_METHOD_ID_ITEM
    { type: 0x0006, size: classDefsSize, offset: classDefsOff }, // TYPE_CLASS_DEF_ITEM
    {
      type: 0x1001,
      size: protoParamOffsets.filter((o) => o !== 0).length,
      offset: dataStartOff,
    }, // TYPE_TYPE_LIST
    { type: 0x2001, size: 2, offset: initCodeOff }, // TYPE_CODE_ITEM
    {
      type: 0x2002,
      size: uniqueStrings.length,
      offset: stringDataOffsets[0],
    }, // TYPE_STRING_DATA_ITEM
    { type: 0x2000, size: 1, offset: classDataOff }, // TYPE_CLASS_DATA_ITEM
    { type: 0x1000, size: 1, offset: mapOff }, // TYPE_MAP_LIST
  ];

  const mapListBuf = Buffer.alloc(4 + mapEntries.length * 12, 0);
  mapListBuf.writeUInt32LE(mapEntries.length, 0);
  mapEntries.forEach((me, i) => {
    const off = 4 + i * 12;
    mapListBuf.writeUInt16LE(me.type, off);
    mapListBuf.writeUInt16LE(0, off + 2);
    mapListBuf.writeUInt32LE(me.size, off + 4);
    mapListBuf.writeUInt32LE(me.offset, off + 8);
  });
  pushDataChunk(mapListBuf, true);

  // Ensure total file size is 4-byte aligned
  if (currentDataOff % 4 !== 0) {
    const pad = 4 - (currentDataOff % 4);
    dataChunks.push(Buffer.alloc(pad, 0));
    currentDataOff += pad;
  }

  const totalFileSize = currentDataOff;
  const dataSize = totalFileSize - dataStartOff;

  // 8. Build Fixed Tables Buffers
  const stringIdsBuf = Buffer.alloc(stringIdsSize * 4);
  stringDataOffsets.forEach((off, i) => {
    stringIdsBuf.writeUInt32LE(off, i * 4);
  });

  const typeIdsBuf = Buffer.alloc(typeIdsSize * 4);
  sortedTypes.forEach((t, i) => {
    typeIdsBuf.writeUInt32LE(sIdx(t), i * 4);
  });

  const protoIdsBuf = Buffer.alloc(protoIdsSize * 12);
  sortedProtos.forEach((p, i) => {
    protoIdsBuf.writeUInt32LE(sIdx(p.shorty), i * 12);
    protoIdsBuf.writeUInt32LE(tIdx(p.returnType), i * 12 + 4);
    protoIdsBuf.writeUInt32LE(protoParamOffsets[i], i * 12 + 8);
  });

  const methodIdsBuf = Buffer.alloc(methodIdsSize * 8);
  sortedMethods.forEach((m, i) => {
    methodIdsBuf.writeUInt16LE(tIdx(m.classType), i * 8);
    methodIdsBuf.writeUInt16LE(pIdx(m.protoKey), i * 8 + 2);
    methodIdsBuf.writeUInt32LE(sIdx(m.name), i * 8 + 4);
  });

  const classDefsBuf = Buffer.alloc(32, 0);
  classDefsBuf.writeUInt32LE(tIdx(classDesc), 0); // class_idx
  classDefsBuf.writeUInt32LE(0x0001, 4); // access_flags = ACC_PUBLIC
  classDefsBuf.writeUInt32LE(tIdx('Landroid/app/Activity;'), 8); // superclass_idx
  classDefsBuf.writeUInt32LE(0, 12); // interfaces_off
  classDefsBuf.writeUInt32LE(0xffffffff, 16); // source_file_idx = NO_INDEX
  classDefsBuf.writeUInt32LE(0, 20); // annotations_off
  classDefsBuf.writeUInt32LE(classDataOff, 24); // class_data_off
  classDefsBuf.writeUInt32LE(0, 28); // static_values_off

  // 9. Build 112-byte DEX Header
  const headerBuf = Buffer.alloc(112, 0);
  Buffer.from('6465780a30333500', 'hex').copy(headerBuf, 0); // "dex\n035\0"
  headerBuf.writeUInt32LE(totalFileSize, 0x20);
  headerBuf.writeUInt32LE(112, 0x24);
  headerBuf.writeUInt32LE(0x12345678, 0x28);
  headerBuf.writeUInt32LE(0, 0x2c); // link_size
  headerBuf.writeUInt32LE(0, 0x30); // link_off
  headerBuf.writeUInt32LE(mapOff, 0x34);
  headerBuf.writeUInt32LE(stringIdsSize, 0x38);
  headerBuf.writeUInt32LE(stringIdsOff, 0x3c);
  headerBuf.writeUInt32LE(typeIdsSize, 0x40);
  headerBuf.writeUInt32LE(typeIdsOff, 0x44);
  headerBuf.writeUInt32LE(protoIdsSize, 0x48);
  headerBuf.writeUInt32LE(protoIdsOff, 0x4c);
  headerBuf.writeUInt32LE(0, 0x50); // field_ids_size
  headerBuf.writeUInt32LE(0, 0x54); // field_ids_off
  headerBuf.writeUInt32LE(methodIdsSize, 0x58);
  headerBuf.writeUInt32LE(methodIdsOff, 0x5c);
  headerBuf.writeUInt32LE(classDefsSize, 0x60);
  headerBuf.writeUInt32LE(classDefsOff, 0x64);
  headerBuf.writeUInt32LE(dataSize, 0x68);
  headerBuf.writeUInt32LE(dataStartOff, 0x6c);

  const dex = Buffer.concat([
    headerBuf,
    stringIdsBuf,
    typeIdsBuf,
    protoIdsBuf,
    methodIdsBuf,
    classDefsBuf,
    ...dataChunks,
  ]);

  // Compute SHA-1 signature of bytes [0x20 .. end]
  const sha1 = crypto.createHash('sha1').update(dex.subarray(0x20)).digest();
  sha1.copy(dex, 0x0c);

  // Compute Adler-32 checksum of bytes [0x0C .. end]
  let a = 1;
  let b = 0;
  for (let i = 0x0c; i < dex.length; i++) {
    a = (a + dex[i]) % 65521;
    b = (b + a) % 65521;
  }
  const adler = ((b << 16) | a) >>> 0;
  dex.writeUInt32LE(adler, 0x08);

  return dex;
}

/**
 * Builds a PKCS#7 / CMS SignedData DER block (META-INF/CERT.RSA) for V1 JAR signing.
 */
function buildPkcs7CertRsa(
  sfBytes: Buffer,
  certDer: Buffer,
  privateKeyPem: string
): Buffer {
  const sig = crypto
    .createSign('RSA-SHA256')
    .update(sfBytes)
    .sign(privateKeyPem);

  const oidSignedData = asn1Oid([
    0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x07, 0x02,
  ]);
  const oidData = asn1Oid([
    0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x07, 0x01,
  ]);
  const algSha256 = asn1Seq([
    asn1Oid([0x60, 0x86, 0x48, 0x01, 0x65, 0x03, 0x04, 0x02, 0x01]),
    Buffer.from([0x05, 0x00]),
  ]);
  const algRsa = asn1Seq([
    asn1Oid([0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01]),
    Buffer.from([0x05, 0x00]),
  ]);

  const cnAttr = asn1Set([
    asn1Seq([asn1Oid([0x55, 0x04, 0x03]), asn1Utf8('Android Debug')]),
  ]);
  const issuerAndSerial = asn1Seq([
    asn1Seq([cnAttr]),
    asn1Integer(Buffer.from([0x01, 0x23, 0x45, 0x67])),
  ]);

  const signerInfo = asn1Seq([
    asn1Integer(Buffer.from([0x01])),
    issuerAndSerial,
    algSha256,
    algRsa,
    asn1Tag(0x04, sig),
  ]);

  const signedData = asn1Seq([
    asn1Integer(Buffer.from([0x01])),
    asn1Set([algSha256]),
    asn1Seq([oidData]),
    asn1Tag(0xa0, certDer),
    asn1Set([signerInfo]),
  ]);

  return asn1Seq([oidSignedData, asn1Tag(0xa0, signedData)]);
}

/**
 * Computes Android APK Signature Scheme v2 1MB chunked SHA-256 digest
 * over (beforeCentralDir, centralDir, eocd) and constructs the "APK Sig Block 42" container.
 */
function buildApkSigningBlockV2(
  beforeCd: Buffer,
  centralDir: Buffer,
  eocd: Buffer,
  certDer: Buffer,
  privateKeyPem: string
): Buffer {
  const CHUNK_SIZE = 1048576; // 1 MB
  const chunkDigests: Buffer[] = [];

  for (const section of [beforeCd, centralDir, eocd]) {
    let offset = 0;
    while (offset < section.length) {
      const chunk = section.subarray(
        offset,
        Math.min(offset + CHUNK_SIZE, section.length)
      );
      const header = Buffer.alloc(5);
      header[0] = 0xa5;
      header.writeUInt32LE(chunk.length, 1);
      const d = crypto
        .createHash('sha256')
        .update(header)
        .update(chunk)
        .digest();
      chunkDigests.push(d);
      offset += CHUNK_SIZE;
    }
  }

  const topHeader = Buffer.alloc(5);
  topHeader[0] = 0x5a;
  topHeader.writeUInt32LE(chunkDigests.length, 1);
  const topLevelDigest = crypto
    .createHash('sha256')
    .update(topHeader)
    .update(Buffer.concat(chunkDigests))
    .digest();

  const lp = (b: Buffer) => {
    const l = Buffer.alloc(4);
    l.writeUInt32LE(b.length, 0);
    return Buffer.concat([l, b]);
  };

  // Signature Algorithm ID: 0x0103 = RSASSA-PKCS1-v1_5 with SHA2-256
  const algIdBuf = Buffer.alloc(4);
  algIdBuf.writeUInt32LE(0x0103, 0);

  const digestEntry = lp(Buffer.concat([algIdBuf, lp(topLevelDigest)]));
  const digestsSeq = lp(digestEntry);
  const certsSeq = lp(lp(certDer));
  const attributesSeq = lp(Buffer.alloc(0));

  const signedData = Buffer.concat([digestsSeq, certsSeq, attributesSeq]);

  const rawSignature = crypto
    .createSign('RSA-SHA256')
    .update(signedData)
    .sign(privateKeyPem);

  const signatureEntry = lp(Buffer.concat([algIdBuf, lp(rawSignature)]));
  const signaturesSeq = lp(signatureEntry);

  const publicKeySpki = crypto
    .createPublicKey({ key: privateKeyPem, format: 'pem' })
    .export({ type: 'spki', format: 'der' }) as Buffer;

  const signerBlock = lp(
    Buffer.concat([lp(signedData), signaturesSeq, lp(publicKeySpki)])
  );
  const v2SchemeValue = lp(signerBlock);

  const pairLen = 4 + v2SchemeValue.length;
  const pairHeader = Buffer.alloc(12);
  pairHeader.writeBigUInt64LE(BigInt(pairLen), 0);
  pairHeader.writeUInt32LE(0x7109871a, 8);
  const pairBuf = Buffer.concat([pairHeader, v2SchemeValue]);

  const blockSize = pairBuf.length + 24;
  const size1 = Buffer.alloc(8);
  size1.writeBigUInt64LE(BigInt(blockSize), 0);
  const size2 = Buffer.alloc(8);
  size2.writeBigUInt64LE(BigInt(blockSize), 0);
  const magic = Buffer.from('APK Sig Block 42', 'ascii');

  return Buffer.concat([size1, pairBuf, size2, magic]);
}

export interface ApkEntryFile {
  name: string;
  data: Buffer;
  storeUncompressed?: boolean;
}

/**
 * Assembles a 4-byte zipaligned Android APK with:
 * - Binary AXML AndroidManifest.xml (with @mipmap/ic_launcher, Theme.NoTitleBar, targetSdkVersion=34)
 * - Compiled resources.arsc mapping 0x7f010000 -> res/mipmap/ic_launcher.png
 * - Dalvik Executable classes.dex with MainActivity launching a full-screen WebView
 * - V1 (JAR) + V2 ("APK Sig Block 42") cryptographic signatures
 */
export function assembleInstallableAndroidApk(options: {
  packageName: string;
  appName: string;
  launchUrl?: string;
  extraFiles: ApkEntryFile[];
}): Buffer {
  const { privateKeyPem, certDer } = getAndroidDebugKeyAndCert();

  const binaryManifest = buildBinaryAndroidManifest({
    packageName: options.packageName,
    appName: options.appName,
  });
  const resourcesArsc = buildResourcesArscWithIcon(options.packageName);
  const classesDex = buildWebViewClassesDex({
    packageName: options.packageName,
    launchUrl: options.launchUrl || 'file:///android_asset/index.html',
  });

  const coreEntries: ApkEntryFile[] = [
    {
      name: 'AndroidManifest.xml',
      data: binaryManifest,
      storeUncompressed: true,
    },
    { name: 'resources.arsc', data: resourcesArsc, storeUncompressed: true },
    { name: 'classes.dex', data: classesDex, storeUncompressed: true },
    ...options.extraFiles,
  ];

  // Build V1 META-INF/MANIFEST.MF, CERT.SF, and CERT.RSA
  const mfLines: string[] = [
    'Manifest-Version: 1.0',
    'Created-By: Expo SDK 57 Android Packager',
    '',
  ];
  for (const entry of coreEntries) {
    const sha256B64 = crypto
      .createHash('sha256')
      .update(entry.data)
      .digest('base64');
    mfLines.push(`Name: ${entry.name}`);
    mfLines.push(`SHA-256-Digest: ${sha256B64}`);
    mfLines.push('');
  }
  const manifestMfBytes = Buffer.from(mfLines.join('\r\n'), 'utf8');

  const wholeMfDigest = crypto
    .createHash('sha256')
    .update(manifestMfBytes)
    .digest('base64');
  const sfLines: string[] = [
    'Signature-Version: 1.0',
    'Created-By: Expo SDK 57 Android Packager',
    `SHA-256-Digest-Manifest: ${wholeMfDigest}`,
    'X-Android-APK-Signed: 2',
    '',
  ];
  const certSfBytes = Buffer.from(sfLines.join('\r\n'), 'utf8');
  const certRsaBytes = buildPkcs7CertRsa(certSfBytes, certDer, privateKeyPem);

  const allEntries: ApkEntryFile[] = [
    ...coreEntries,
    {
      name: 'META-INF/MANIFEST.MF',
      data: manifestMfBytes,
      storeUncompressed: true,
    },
    { name: 'META-INF/CERT.SF', data: certSfBytes, storeUncompressed: true },
    { name: 'META-INF/CERT.RSA', data: certRsaBytes, storeUncompressed: true },
  ];

  const localParts: Buffer[] = [];
  const cdParts: Buffer[] = [];
  let currentOffset = 0;

  for (const entry of allEntries) {
    const nameBuf = Buffer.from(entry.name, 'utf8');
    const crc = zlib.crc32(entry.data) >>> 0;
    const uncompressedSize = entry.data.length;

    let compressedData = entry.data;
    let compressionMethod = 0; // STORED

    if (!entry.storeUncompressed && entry.data.length > 128) {
      compressedData = zlib.deflateRawSync(entry.data);
      compressionMethod = 8; // DEFLATE
    }

    let extraLen = 0;
    if (compressionMethod === 0) {
      const dataStart = currentOffset + 30 + nameBuf.length;
      const remainder = dataStart % 4;
      if (remainder !== 0) {
        extraLen = 4 - remainder;
      }
    }
    const extraBuf = Buffer.alloc(extraLen, 0);

    const lfh = Buffer.alloc(30);
    lfh.writeUInt32LE(0x04034b50, 0);
    lfh.writeUInt16LE(20, 4);
    lfh.writeUInt16LE(0, 6);
    lfh.writeUInt16LE(compressionMethod, 8);
    lfh.writeUInt16LE(0, 10);
    lfh.writeUInt16LE(0x5421, 12);
    lfh.writeUInt32LE(crc, 14);
    lfh.writeUInt32LE(compressedData.length, 18);
    lfh.writeUInt32LE(uncompressedSize, 22);
    lfh.writeUInt16LE(nameBuf.length, 26);
    lfh.writeUInt16LE(extraBuf.length, 28);

    const localRecord = Buffer.concat([
      lfh,
      nameBuf,
      extraBuf,
      compressedData,
    ]);
    localParts.push(localRecord);

    const cdh = Buffer.alloc(46);
    cdh.writeUInt32LE(0x02014b50, 0);
    cdh.writeUInt16LE(20, 4);
    cdh.writeUInt16LE(20, 6);
    cdh.writeUInt16LE(0, 8);
    cdh.writeUInt16LE(compressionMethod, 10);
    cdh.writeUInt16LE(0, 12);
    cdh.writeUInt16LE(0x5421, 14);
    cdh.writeUInt32LE(crc, 16);
    cdh.writeUInt32LE(compressedData.length, 20);
    cdh.writeUInt32LE(uncompressedSize, 24);
    cdh.writeUInt16LE(nameBuf.length, 28);
    cdh.writeUInt16LE(0, 30);
    cdh.writeUInt16LE(0, 32);
    cdh.writeUInt16LE(0, 34);
    cdh.writeUInt16LE(0, 36);
    cdh.writeUInt32LE(0, 38);
    cdh.writeUInt32LE(currentOffset, 42);

    cdParts.push(Buffer.concat([cdh, nameBuf]));
    currentOffset += localRecord.length;
  }

  const beforeCd = Buffer.concat(localParts);
  const centralDir = Buffer.concat(cdParts);

  const eocdForDigest = Buffer.alloc(22);
  eocdForDigest.writeUInt32LE(0x06054b50, 0);
  eocdForDigest.writeUInt16LE(0, 4);
  eocdForDigest.writeUInt16LE(0, 6);
  eocdForDigest.writeUInt16LE(allEntries.length, 8);
  eocdForDigest.writeUInt16LE(allEntries.length, 10);
  eocdForDigest.writeUInt32LE(centralDir.length, 12);
  eocdForDigest.writeUInt32LE(beforeCd.length, 16);
  eocdForDigest.writeUInt16LE(0, 20);

  const v2SigBlock = buildApkSigningBlockV2(
    beforeCd,
    centralDir,
    eocdForDigest,
    certDer,
    privateKeyPem
  );

  const finalEocd = Buffer.from(eocdForDigest);
  finalEocd.writeUInt32LE(beforeCd.length + v2SigBlock.length, 16);

  return Buffer.concat([beforeCd, v2SigBlock, centralDir, finalEocd]);
}
