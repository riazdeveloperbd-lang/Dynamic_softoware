import { Radius, Spacing } from "@/constants/theme";
import { useLedger } from "@/context/LedgerContext";
import { useAppTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppModal } from "./AppModal";

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ProfileModal({ visible, onClose }: ProfileModalProps) {
  const { user, updateProfile, changePin, logout } = useLedger();
  const { colors, isDark } = useAppTheme();

  const [name, setName] = useState(user.name);
  const [mobile, setMobile] = useState(user.mobile);
  const [email, setEmail] = useState(user.email);
  const [profMsg, setProfMsg] = useState("");

  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinMsg, setPinMsg] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      setProfMsg("Name cannot be empty");
      return;
    }
    await updateProfile(name.trim(), mobile.trim(), email.trim());
    setProfMsg("Profile saved successfully ✓");
    onClose();
    setTimeout(() => setProfMsg(""), 2500);
  };

  return (
    <AppModal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.sheet, { backgroundColor: colors.cardElevated }]}>
          <View
            style={[
              styles.handle,
              {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.15)",
              },
            ]}
          />

          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.title, { color: colors.text }]}>
              Admin Profile
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.body}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
            bounces={false}
          >
            {/* Avatar */}
            <View style={styles.avatarSection}>
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor: colors.primary,
                    borderColor: colors.primaryLight,
                  },
                ]}
              >
                <Text style={styles.avatarText}>
                  {(user.name || "T").charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.userName, { color: colors.text }]}>
                {user.name}
              </Text>
              <Text style={[styles.userRole, { color: colors.primaryLight }]}>
                @{user.username}
              </Text>
            </View>

            {/* Profile Info */}
            <View
              style={[styles.sectionDivider, { borderTopColor: colors.border }]}
            >
              <Text
                style={[
                  styles.sectionDividerText,
                  { color: colors.primaryLight },
                ]}
              >
                Profile Details
              </Text>
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                value={name}
                onChangeText={setName}
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Mobile Number
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Admin Email
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            {profMsg ? (
              <Text style={[styles.msgText, { color: colors.emerald }]}>
                {profMsg}
              </Text>
            ) : null}

            <TouchableOpacity
              style={[styles.saveBtn, { backgroundColor: colors.primary }]}
              onPress={handleSaveProfile}
            >
              <Text style={styles.saveBtnText}>Save Profile Details</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "flex-end",
  },
  sheet: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    maxHeight: "90%",
    flexShrink: 1,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
  closeBtn: {
    padding: 4,
  },
  body: {
    paddingHorizontal: Spacing.lg,
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.md,
    paddingBottom: 60,
    gap: 14,
  },
  avatarSection: {
    alignItems: "center",
    marginVertical: 8,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
  },
  userName: {
    fontSize: 17,
    fontWeight: "800",
    marginTop: 8,
  },
  userRole: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  sectionDivider: {
    borderTopWidth: 1,
    paddingTop: 12,
  },
  sectionDividerText: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 12.5,
    fontWeight: "700",
  },
  input: {
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14.5,
  },
  msgText: {
    fontSize: 12.5,
    fontWeight: "700",
    textAlign: "center",
  },
  saveBtn: {
    paddingVertical: 13,
    borderRadius: Radius.md,
    alignItems: "center",
  },
  saveBtnText: {
    color: "#ffffff",
    fontSize: 14.5,
    fontWeight: "800",
  },
  pinBtn: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    paddingVertical: 13,
    borderRadius: Radius.md,
    alignItems: "center",
  },
  pinBtnText: {
    fontSize: 14.5,
    fontWeight: "800",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 13,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginTop: 10,
  },
  logoutBtnText: {
    fontSize: 14.5,
    fontWeight: "800",
  },
});
