import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  X,
  ArrowLeft,
  CheckCircle2,
  Truck,
  ShieldCheck,
  PhoneCall,
  Star,
  MapPin,
  CreditCard,
  Search,
  PackageCheck,
} from 'lucide-react';
import {
  EditableText,
  EditableImage,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import {
  useStoreEcommerce,
  STORE_PRODUCTS,
} from './StoreEcommerceContext';

export interface StorePagesRouterSectionProps {
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const StorePagesRouterSection: React.FC<StorePagesRouterSectionProps> = ({
  primaryColor = '#F37021',
  isDark = false,
}) => {
  const {
    activePage,
    setActivePage,
    selectedProduct,
    openProductDetail,
    cart,
    addToCart,
    buyNowDirect,
    updateCartQty,
    removeFromCart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    quickViewProduct,
    setQuickViewProduct,
    couponCode,
    setCouponCode,
    appliedDiscount,
    applyCoupon,
    cartSubtotal,
    orders,
    placeOrder,
    lastPlacedOrder,
  } = useStoreEcommerce();

  const [detailWeight, setDetailWeight] = useState<string>(selectedProduct.weight);
  const [detailQty, setDetailQty] = useState<number>(1);
  const [checkoutName, setCheckoutName] = useState('রাকিবুল হাসান (Rakibul Hasan)');
  const [checkoutPhone, setCheckoutPhone] = useState('01712-345678');
  const [checkoutAddress, setCheckoutAddress] = useState(
    'House 24, Road 11, Banani, Dhaka-1213'
  );
  const [deliveryZone, setDeliveryZone] = useState<'inside_dhaka' | 'outside_dhaka'>(
    'inside_dhaka'
  );
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card'>(
    'cod'
  );
  const [orderNotes, setOrderNotes] = useState('');
  const [trackInput, setTrackInput] = useState('');

  const shippingFee = deliveryZone === 'inside_dhaka' ? 60 : 120;
  const grandTotal = Math.max(0, cartSubtotal + shippingFee - appliedDiscount);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName.trim() || !checkoutPhone.trim() || !checkoutAddress.trim()) return;
    placeOrder({
      customerName: checkoutName,
      phone: checkoutPhone,
      address: checkoutAddress,
      deliveryZone,
      paymentMethod,
      notes: orderNotes,
    });
    setActivePage('track_order');
  };

  return (
    <>
      {/* ===================================================================== */}
      {/* 1. SLIDE-OVER SHOPPING CART DRAWER (Works on all pages)               */}
      {/* ===================================================================== */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            onClick={() => setIsCartDrawerOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-[1px]"
          />
          <div
            className={`relative z-10 w-full max-w-[390px] h-full flex flex-col justify-between shadow-2xl border-l ${
              isDark
                ? 'bg-[#121822] border-white/10 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} style={{ color: primaryColor }} />
                <h3 className="text-sm font-black">
                  শপিং ব্যাগ (Shopping Cart · {cart.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-white/15 cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <ShoppingBag size={36} className="mx-auto opacity-30" />
                  <p className="text-xs text-slate-500">Your Bazar bag is empty.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      setActivePage('category');
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Browse Organic Products
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.product.id}_${item.selectedWeight}`}
                    className={`p-3 rounded-2xl border flex items-center gap-3 ${
                      isDark
                        ? 'bg-[#171F2C] border-white/10'
                        : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="text-xs font-extrabold truncate">
                        {item.product.name}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Pack: <strong>{item.selectedWeight}</strong> · ৳
                        {item.product.price.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-slate-900">
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQty(item.product.id, item.selectedWeight, -1)
                            }
                            className="cursor-pointer"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="text-xs font-extrabold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQty(item.product.id, item.selectedWeight, 1)
                            }
                            className="cursor-pointer"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedWeight)
                          }
                          className="text-rose-500 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-slate-200 dark:border-white/10 space-y-3 bg-slate-50/70 dark:bg-slate-900/60">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Subtotal</span>
                  <span className="text-base font-black" style={{ color: primaryColor }}>
                    ৳{cartSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      setActivePage('cart');
                    }}
                    className="py-2.5 px-3 rounded-xl border-2 text-xs font-extrabold cursor-pointer"
                    style={{ borderColor: primaryColor, color: primaryColor }}
                  >
                    View Full Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      setActivePage('checkout');
                    }}
                    className="py-2.5 px-3 rounded-xl text-xs font-extrabold text-white shadow-md cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    অর্ডার কনফার্ম করুন
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. QUICK VIEW MODAL                                                   */}
      {/* ===================================================================== */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setQuickViewProduct(null)}
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
          />
          <div
            className={`relative z-10 w-full max-w-2xl rounded-3xl p-6 shadow-2xl border grid grid-cols-1 sm:grid-cols-12 gap-6 ${
              isDark
                ? 'bg-[#151D2A] border-white/15 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-slate-200 dark:border-white/15 flex items-center justify-center cursor-pointer"
            >
              <X size={15} />
            </button>
            <div className="sm:col-span-5 rounded-2xl overflow-hidden bg-slate-100 aspect-square">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-7 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase text-emerald-600">
                  {quickViewProduct.categoryLabel}
                </span>
                <h3 className="text-base sm:text-lg font-black leading-snug">
                  {quickViewProduct.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black" style={{ color: primaryColor }}>
                    ৳{quickViewProduct.price.toLocaleString()}
                  </span>
                  {quickViewProduct.regularPrice && (
                    <span className="text-xs line-through text-slate-400">
                      ৳{quickViewProduct.regularPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                  {quickViewProduct.shortDescription}
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(quickViewProduct, quickViewProduct.weight, 1, true);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl border-2 text-xs font-extrabold cursor-pointer"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const prod = quickViewProduct;
                    setQuickViewProduct(null);
                    openProductDetail(prod);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-extrabold text-white cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  Full Details →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. PAGE: PRODUCT DETAILS PAGE ('product_detail')                      */}
      {/* ===================================================================== */}
      {activePage === 'product_detail' && (
        <section
          className={`py-10 px-4 sm:px-6 ${
            isDark ? 'bg-[#0F141C] text-white' : 'bg-white text-slate-900'
          }`}
        >
          <div className="max-w-6xl mx-auto space-y-8">
            <button
              type="button"
              onClick={() => setActivePage('home')}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold hover:underline cursor-pointer"
              style={{ color: primaryColor }}
            >
              <ArrowLeft size={14} />
              <span>Back to All Products</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Product Image */}
              <div className="lg:col-span-5 space-y-3">
                <div className="rounded-3xl overflow-hidden border-2 border-orange-200/80 dark:border-white/10 aspect-square bg-slate-100">
                  <EditableImage
                    id={`store_detail_img_${selectedProduct.id}`}
                    defaultSrc={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Product Purchase & Purity Specs */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-[11px] font-extrabold text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {selectedProduct.categoryLabel}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-extrabold">
                    ✓ In Stock · Ready to Ship
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    SKU: {selectedProduct.sku}
                  </span>
                </div>

                <h1 className="text-xl sm:text-3xl font-black leading-tight">
                  {selectedProduct.name}
                </h1>
                {selectedProduct.banglaSub && (
                  <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    {selectedProduct.banglaSub}
                  </p>
                )}

                <div className="flex items-center gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black" style={{ color: primaryColor }}>
                      ৳{selectedProduct.price.toLocaleString()}
                    </span>
                    {selectedProduct.regularPrice && (
                      <span className="text-sm line-through text-slate-400">
                        ৳{selectedProduct.regularPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span>
                      {selectedProduct.rating} ({selectedProduct.reviewsCount} Verified Reviews)
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedProduct.shortDescription}
                </p>

                {/* Pack Weight Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-extrabold">
                    Select Pack Weight / Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.weightOptions.map((w) => {
                      const active = detailWeight === w;
                      return (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setDetailWeight(w)}
                          className={`px-4 py-2 rounded-xl text-xs font-extrabold border-2 cursor-pointer ${
                            active
                              ? 'text-white border-transparent'
                              : 'border-slate-200 dark:border-white/15'
                          }`}
                          style={active ? { backgroundColor: primaryColor } : undefined}
                        >
                          {w}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity + Add to Cart + Direct Order Now */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-white/15">
                    <button
                      type="button"
                      onClick={() => setDetailQty((q) => Math.max(1, q - 1))}
                      className="cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-black">{detailQty}</span>
                    <button
                      type="button"
                      onClick={() => setDetailQty((q) => q + 1)}
                      className="cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      addToCart(selectedProduct, detailWeight, detailQty, true)
                    }
                    className="px-6 py-3 rounded-xl border-2 text-xs sm:text-sm font-extrabold cursor-pointer"
                    style={{ borderColor: primaryColor, color: primaryColor }}
                  >
                    + Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      buyNowDirect(selectedProduct, detailWeight, detailQty)
                    }
                    className="px-7 py-3 rounded-xl text-xs sm:text-sm font-extrabold text-white shadow-lg cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    ক্যাশ অন ডেলিভারিতে অর্ডার করুন (Order Now)
                  </button>
                </div>

                {/* Purity Highlights & Lab Nutrition Table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                      Why Bazar Purity?
                    </h4>
                    <ul className="space-y-1.5 text-xs">
                      {selectedProduct.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-1.5">
                          <CheckCircle2
                            size={14}
                            className="text-emerald-600 flex-shrink-0 mt-0.5"
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider">
                      Nutrition &amp; Origin Specs
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      {selectedProduct.nutritionFacts.map((nf) => (
                        <div key={nf.label} className="flex justify-between">
                          <span className="text-slate-500">{nf.label}</span>
                          <span className="font-bold">{nf.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 4. PAGE: FULL SHOPPING CART ('cart')                                  */}
      {/* ===================================================================== */}
      {activePage === 'cart' && (
        <section
          className={`py-10 px-4 sm:px-6 ${
            isDark ? 'bg-[#0F141C] text-white' : 'bg-white text-slate-900'
          }`}
        >
          <div className="max-w-6xl mx-auto space-y-6">
            <h1 className="text-2xl sm:text-3xl font-black">
              আপনার শপিং ব্যাগ (Shopping Cart · {cart.length} Items)
            </h1>

            {cart.length === 0 ? (
              <div className="p-12 rounded-3xl border text-center space-y-4">
                <p className="text-sm text-slate-500">Your shopping cart is currently empty.</p>
                <button
                  type="button"
                  onClick={() => setActivePage('category')}
                  className="px-6 py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-3">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}_${item.selectedWeight}`}
                      className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isDark
                          ? 'bg-[#171F2C] border-white/10'
                          : 'bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div>
                          <h3 className="text-sm font-extrabold">{item.product.name}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Weight: <strong>{item.selectedWeight}</strong> · Unit Price: ৳
                            {item.product.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-xl border bg-white dark:bg-slate-900">
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQty(item.product.id, item.selectedWeight, -1)
                            }
                            className="cursor-pointer"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="text-xs font-black">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQty(item.product.id, item.selectedWeight, 1)
                            }
                            className="cursor-pointer"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <div className="text-sm font-black" style={{ color: primaryColor }}>
                          ৳{(item.product.price * item.quantity).toLocaleString()}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedWeight)
                          }
                          className="text-rose-500 p-1.5 cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Order Summary + Coupon */}
                <div
                  className={`lg:col-span-4 p-6 rounded-3xl border space-y-4 h-fit ${
                    isDark
                      ? 'bg-[#171F2C] border-white/10'
                      : 'bg-[#FFF9F4] border-orange-200/80'
                  }`}
                >
                  <h3 className="text-base font-black">Order Summary</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon: BAZAR100"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-900 text-xs font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => applyCoupon(couponCode)}
                      className="px-4 py-2 rounded-xl text-xs font-extrabold text-white cursor-pointer"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Apply
                    </button>
                  </div>

                  <div className="space-y-2 text-xs pt-2 border-t border-slate-200 dark:border-white/10">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold">৳{cartSubtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span className="font-bold">-৳{appliedDiscount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black pt-2 border-t">
                      <span>Total</span>
                      <span style={{ color: primaryColor }}>
                        ৳{Math.max(0, cartSubtotal - appliedDiscount).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActivePage('checkout')}
                    className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-white shadow-lg cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Proceed to Checkout (অর্ডার কনফার্ম) →
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 5. PAGE: CASH ON DELIVERY & BKASH CHECKOUT ('checkout')               */}
      {/* ===================================================================== */}
      {activePage === 'checkout' && (
        <section
          className={`py-10 px-4 sm:px-6 ${
            isDark ? 'bg-[#0F141C] text-white' : 'bg-white text-slate-900'
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <form
              onSubmit={handleCheckoutSubmit}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-7 space-y-5">
                <h1 className="text-xl sm:text-2xl font-black">
                  ক্যাশ অন ডেলিভারিতে অর্ডার করতে আপনার তথ্য দিন (Checkout)
                </h1>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-extrabold mb-1">
                      আপনার নাম (Full Name) *
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold mb-1">
                      মোবাইল নাম্বার (Mobile Number) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={checkoutPhone}
                      onChange={(e) => setCheckoutPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold mb-1">
                      সম্পূর্ণ ঠিকানা (Full Delivery Address) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={checkoutAddress}
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-xs font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      onClick={() => setDeliveryZone('inside_dhaka')}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-center justify-between ${
                        deliveryZone === 'inside_dhaka'
                          ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/20'
                          : 'border-slate-200 dark:border-white/10'
                      }`}
                    >
                      <span className="text-xs font-extrabold">ঢাকা সিটির ভেতরে (Inside Dhaka)</span>
                      <span className="text-xs font-black" style={{ color: primaryColor }}>
                        ৳60
                      </span>
                    </label>
                    <label
                      onClick={() => setDeliveryZone('outside_dhaka')}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-center justify-between ${
                        deliveryZone === 'outside_dhaka'
                          ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/20'
                          : 'border-slate-200 dark:border-white/10'
                      }`}
                    >
                      <span className="text-xs font-extrabold">ঢাকার বাইরে (Outside Dhaka)</span>
                      <span className="text-xs font-black" style={{ color: primaryColor }}>
                        ৳120
                      </span>
                    </label>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-extrabold">
                      Payment Method (পেমেন্ট মাধ্যম):
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {(
                        [
                          { id: 'cod', label: 'Cash on Delivery' },
                          { id: 'bkash', label: 'bKash Payment' },
                          { id: 'nagad', label: 'Nagad' },
                          { id: 'card', label: 'Visa / Card' },
                        ] as const
                      ).map((pm) => (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setPaymentMethod(pm.id)}
                          className={`p-3 rounded-xl border-2 text-xs font-extrabold cursor-pointer ${
                            paymentMethod === pm.id
                              ? 'text-white border-transparent'
                              : 'border-slate-200 dark:border-white/15'
                          }`}
                          style={
                            paymentMethod === pm.id
                              ? { backgroundColor: primaryColor }
                              : undefined
                          }
                        >
                          {pm.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`lg:col-span-5 p-6 rounded-3xl border space-y-4 h-fit ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-[#FFF9F4] border-orange-200/80'
                }`}
              >
                <h3 className="text-base font-black">Your Order Summary</h3>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}_${item.selectedWeight}`}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200/60 dark:border-white/10"
                    >
                      <span className="font-bold truncate max-w-[200px]">
                        {item.quantity}x {item.product.name} ({item.selectedWeight})
                      </span>
                      <span className="font-extrabold">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 text-xs pt-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold">৳{cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span className="font-bold">৳{shippingFee}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Coupon Discount</span>
                      <span className="font-bold">-৳{appliedDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black pt-2 border-t">
                    <span>সর্বমোট (Total Payable)</span>
                    <span style={{ color: primaryColor }}>
                      ৳{grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-sm font-black text-white shadow-lg cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  অর্ডার কনফার্ম করুন (Place Order ৳{grandTotal.toLocaleString()})
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 6. PAGE: LIVE ORDER TRACKING ('track_order')                          */}
      {/* ===================================================================== */}
      {activePage === 'track_order' && (
        <section
          className={`py-10 px-4 sm:px-6 ${
            isDark ? 'bg-[#0F141C] text-white' : 'bg-white text-slate-900'
          }`}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 rounded-3xl border bg-[#FFF8F1] dark:bg-[#171F2C] border-orange-200/80 dark:border-white/10 space-y-4">
              <div className="flex items-center gap-2.5">
                <PackageCheck size={24} style={{ color: primaryColor }} />
                <h1 className="text-xl sm:text-2xl font-black">
                  Track Your Bazar Order (অর্ডার ট্র্যাকিং)
                </h1>
              </div>
              {lastPlacedOrder && (
                <div className="p-4 rounded-2xl bg-emerald-600 text-white text-xs font-bold flex flex-wrap items-center justify-between gap-2">
                  <span>
                    ✓ ধন্যবাদ {lastPlacedOrder.customerName}! আপনার অর্ডার #{lastPlacedOrder.orderId}{' '}
                    সফলভাবে গ্রহণ করা হয়েছে।
                  </span>
                  <span>Total: ৳{lastPlacedOrder.total.toLocaleString()}</span>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  placeholder="Search by Order ID (e.g. BZ-88421) or Phone Number..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-900 text-xs font-semibold"
                />
              </div>
            </div>

            <div className="space-y-4">
              {orders
                .filter(
                  (o) =>
                    !trackInput.trim() ||
                    o.orderId.toLowerCase().includes(trackInput.toLowerCase()) ||
                    o.phone.includes(trackInput)
                )
                .map((ord) => (
                  <div
                    key={ord.orderId}
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isDark
                        ? 'bg-[#171F2C] border-white/10'
                        : 'bg-white border-slate-200/80 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 border-slate-100 dark:border-white/10">
                      <div>
                        <span className="text-sm font-black" style={{ color: primaryColor }}>
                          Order #{ord.orderId}
                        </span>
                        <span className="text-xs text-slate-400 ml-2">{ord.createdAt}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold">
                        {ord.status}
                      </span>
                    </div>
                    <div className="text-xs space-y-1">
                      <div>
                        <strong>Customer:</strong> {ord.customerName} ({ord.phone})
                      </div>
                      <div>
                        <strong>Delivery Address:</strong> {ord.address}
                      </div>
                      <div>
                        <strong>Total Payable:</strong> ৳{ord.total.toLocaleString()} (
                        {ord.paymentMethod.toUpperCase()})
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 7. PAGE: OUR PURITY STANDARDS & CONTACT ('about_contact')             */}
      {/* ===================================================================== */}
      {activePage === 'about_contact' && (
        <section
          className={`py-10 px-4 sm:px-6 ${
            isDark ? 'bg-[#0F141C] text-white' : 'bg-white text-slate-900'
          }`}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-3xl border border-orange-200/80 dark:border-white/10 space-y-4">
              <EditableText
                id="bazar_about_title"
                as="h2"
                defaultText="কেন বাজার (Bazar) সবার সেরা?"
                className="text-xl sm:text-2xl font-black block"
              />
              <EditableText
                id="store_about_desc"
                as="p"
                defaultText="We source wild honey directly from Sundarban Mouals, wood-pressed mustard oil from traditional Tetul Kather Ghani, pure cow milk Gawa Ghee from Pabna bathans, and cold-chain imported dates from Saudi Arabia."
                className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed block"
              />
              <div className="space-y-2 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>BSTI &amp; BCSIR Lab Tested Purity Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={16} style={{ color: primaryColor }} />
                  <span>Fast Home Delivery Across All 64 Districts in Bangladesh</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
              <h3 className="text-lg font-black">Customer Care &amp; Showroom</h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <PhoneCall size={15} style={{ color: primaryColor }} />
                  <span>Hotline: 09642-922922 / WhatsApp: +8801321208940</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} style={{ color: primaryColor }} />
                  <span>Head Office: Mirpur-10 &amp; Banasree, Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default StorePagesRouterSection;
