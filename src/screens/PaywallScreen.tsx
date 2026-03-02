import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation";
import { useSubscription } from "../state/subscriptionStore";
import { colors, radius, rgba, shadows, spacing, typography } from "../theme/tokens";
import { GlassCard, PrimaryButton } from "../ui";

type Props = NativeStackScreenProps<RootStackParamList, "Paywall">;

type Plan = "yearly" | "monthly";

const BENEFITS = [
  { icon: "all-inclusive", label: "Unlimited sessions" },
  { icon: "psychology", label: "AI daily affirmation" },
  { icon: "cloud-off", label: "Offline access" },
  { icon: "dark-mode", label: "Better sleep pack" },
  { icon: "block", label: "No ads" },
] as const;

const contentWidth = "88%";

export function PaywallScreen({ navigation }: Props) {
  const { setSubscribed } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<Plan>("yearly");

  const handleSubscribe = async () => {
    await setSubscribed(true);
    // Root navigator switches to Meditations when subscription state becomes true.
    navigation.navigate("Meditations");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: spacing[10] }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Pressable
              accessibilityRole="button"
              android_ripple={{ color: rgba.white10, borderless: true }}
              style={({ pressed }) => [
                styles.closeButton,
                { backgroundColor: pressed ? rgba.white10 : "transparent" },
              ]}
            >
              <MaterialIcons name="close" size={24} color={colors.slate400} />
            </Pressable>

            <View style={styles.brandRow}>
              <View style={styles.brandIconWrap}>
                <MaterialIcons name="self-improvement" size={18} color={colors.white} />
              </View>
              <Text style={styles.brandText}>ZenPulse</Text>
            </View>

            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.heroSection}>
            <View style={styles.heroImageWrap}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOb4BQO9rnK3kG53-Mgs0Bfr6vW4FyDHdJ8HLgTea8qnsGdGW897jK1m-vFDHlXKz4rBCQpC3iR2Jfja2bvXTKcpo5s8F0uW497w6swG_vD4Oafl9H0MKNzH_k4ye-eA2pZr3BuWYDkH-Gt7QqQYY7zUj7Oezpky1yd5ehsfd6ZBpIXWVRGPJSZo-qida--NdcutB9Scslv4z7tGX0GdukmL2B5vrg-nGoq4j6G0aHMbRy9YO_JMRH6FNP9Vpx5FnaQqysYUGkIN8",
                }}
                resizeMode="cover"
                style={{ width: "100%", aspectRatio: 16 / 9 }}
              />
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 68,
                  backgroundColor: "rgba(5, 5, 16, 0.45)",
                }}
              />
            </View>

            <Text style={styles.heroTitle}>
              Unlock ZenPulse Premium
            </Text>
            <Text style={styles.heroSubtitle}>
              Experience your daily calm
            </Text>
          </View>

          <View style={styles.benefitsSection}>
            {BENEFITS.map((benefit) => (
              <View key={benefit.label} style={styles.benefitRow}>
                <View style={styles.benefitIconWrap}>
                  <MaterialIcons name={benefit.icon} size={20} color={colors.accentTeal} />
                </View>
                <Text style={styles.benefitText}>{benefit.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.plansSection}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setSelectedPlan("yearly")}
              style={({ pressed }) => [styles.planButtonWrap, { opacity: pressed ? 0.96 : 1 }]}
            >
              <GlassCard variant={selectedPlan === "yearly" ? "active" : "default"} style={{ padding: spacing[5] }}>
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    borderBottomLeftRadius: radius.lg,
                    backgroundColor: colors.primary,
                    paddingHorizontal: spacing[4],
                    paddingVertical: spacing[1],
                  }}
                >
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: typography.sizes.xxs,
                      fontWeight: typography.weights.bold,
                      letterSpacing: 1.2,
                      textTransform: "uppercase",
                    }}
                  >
                    Best Value
                  </Text>
                </View>

                <View style={styles.planRow}>
                  <View style={styles.planLeft}>
                    <View style={[styles.radioOuter, { borderColor: selectedPlan === "yearly" ? colors.primary : colors.slate700 }]}>
                      {selectedPlan === "yearly" ? (
                        <View style={styles.radioInner} />
                      ) : null}
                    </View>
                    <View>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: typography.sizes.lg,
                          fontWeight: typography.weights.bold,
                        }}
                      >
                        Yearly
                      </Text>
                      <Text
                        style={{
                          color: colors.accentLavender,
                          fontSize: typography.sizes.sm,
                          fontWeight: typography.weights.semibold,
                        }}
                      >
                        Save 50%
                      </Text>
                    </View>
                  </View>
                  <View style={styles.planPriceWrap}>
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: typography.sizes.xl,
                        fontWeight: typography.weights.bold,
                      }}
                    >
                      $59.99
                    </Text>
                    <Text style={{ color: colors.slate400, fontSize: typography.sizes.xs }}>
                      per year
                    </Text>
                  </View>
                </View>
              </GlassCard>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => setSelectedPlan("monthly")}
              style={({ pressed }) => [styles.planButtonWrap, { opacity: pressed ? 0.96 : 1 }]}
            >
              <GlassCard variant={selectedPlan === "monthly" ? "active" : "default"} style={{ padding: spacing[5] }}>
                <View style={styles.planRow}>
                  <View style={styles.planLeft}>
                    <View style={[styles.radioOuter, { borderColor: selectedPlan === "monthly" ? colors.primary : colors.slate700 }]}>
                      {selectedPlan === "monthly" ? (
                        <View style={styles.radioInner} />
                      ) : null}
                    </View>
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: typography.sizes.lg,
                        fontWeight: typography.weights.bold,
                      }}
                    >
                      Monthly
                    </Text>
                  </View>
                  <View style={styles.planPriceWrap}>
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: typography.sizes.xl,
                        fontWeight: typography.weights.bold,
                      }}
                    >
                      $9.99
                    </Text>
                    <Text style={{ color: colors.slate400, fontSize: typography.sizes.xs }}>
                      per month
                    </Text>
                  </View>
                </View>
              </GlassCard>
            </Pressable>
          </View>

          <View style={styles.ctaSection}>
            <PrimaryButton
              label="Try Free for 7 Days"
              onPress={handleSubscribe}
              style={{
                minHeight: 64,
                borderRadius: radius.xl,
                width: "100%",
              }}
              textStyle={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}
            />
          </View>

          <View style={styles.legalSection}>
            <Text style={styles.legalText}>
              Your subscription will automatically renew at the end of the trial period. You can
              cancel at any time in your store settings.
            </Text>

            <View style={styles.linksRow}>
              <Text style={styles.linkText}>
                Restore Purchase
              </Text>
              <View style={styles.linkDot} />
              <Text style={styles.linkText}>
                Terms of Service
              </Text>
              <View style={styles.linkDot} />
              <Text style={styles.linkText}>
                Privacy Policy
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundDarkPaywall,
  },
  scroll: {
    flex: 1,
  },
  container: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[5],
  },
  closeButton: {
    height: 44,
    width: 44,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  brandIconWrap: {
    height: 32,
    width: 32,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.glowLavender,
  },
  brandText: {
    color: colors.white,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    letterSpacing: -0.3,
  },
  headerSpacer: {
    width: 24,
  },
  heroSection: {
    width: contentWidth,
    alignSelf: "center",
    paddingTop: spacing[2],
    marginBottom: spacing[8],
  },
  heroImageWrap: {
    marginBottom: spacing[6],
    overflow: "hidden",
    borderRadius: radius.xl,
  },
  heroTitle: {
    textAlign: "center",
    color: colors.white,
    fontSize: typography.sizes.x3l,
    fontWeight: typography.weights.bold,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    marginTop: spacing[2],
    textAlign: "center",
    color: colors.slate400,
    fontSize: typography.sizes.lg,
  },
  benefitsSection: {
    width: contentWidth,
    alignSelf: "center",
    gap: spacing[4],
    marginBottom: spacing[8],
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[4],
  },
  benefitIconWrap: {
    height: 32,
    width: 32,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: rgba.accentTeal05,
  },
  benefitText: {
    color: colors.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
  },
  plansSection: {
    width: contentWidth,
    alignSelf: "center",
    gap: spacing[4],
    marginBottom: spacing[8],
  },
  planButtonWrap: {
    width: "100%",
    alignSelf: "center",
  },
  planRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  planLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[4],
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: radius.full,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  planPriceWrap: {
    alignItems: "flex-end",
  },
  ctaSection: {
    width: contentWidth,
    alignSelf: "center",
    marginBottom: spacing[8],
  },
  legalSection: {
    width: contentWidth,
    alignSelf: "center",
    paddingBottom: spacing[10],
  },
  legalText: {
    textAlign: "center",
    color: colors.slate500,
    fontSize: typography.sizes.xxs,
    lineHeight: 16,
    marginBottom: spacing[6],
  },
  linksRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[3],
  },
  linkText: {
    color: colors.slate400,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
  linkDot: {
    height: 4,
    width: 4,
    borderRadius: radius.full,
    backgroundColor: colors.slate700,
  },
});
