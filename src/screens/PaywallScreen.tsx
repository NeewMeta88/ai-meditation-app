import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
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

export function PaywallScreen({ navigation }: Props) {
  const { setSubscribed } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<Plan>("yearly");

  const handleSubscribe = async () => {
    await setSubscribed(true);
    // Root navigator switches to Meditations when subscription state becomes true.
    navigation.navigate("Meditations");
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.backgroundDarkPaywall }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: spacing[10] }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-auto w-full max-w-md">
          <View className="flex-row items-center justify-between px-6 py-5">
            <Pressable
              accessibilityRole="button"
              android_ripple={{ color: rgba.white10, borderless: true }}
              className="h-11 w-11 items-center justify-center rounded-full"
              style={({ pressed }) => [{ backgroundColor: pressed ? rgba.white10 : "transparent" }]}
            >
              <MaterialIcons name="close" size={24} color={colors.slate400} />
            </Pressable>

            <View className="flex-row items-center gap-2">
              <View
                className="h-8 w-8 items-center justify-center"
                style={{
                  borderRadius: radius.lg,
                  backgroundColor: colors.primary,
                  ...shadows.glowLavender,
                }}
              >
                <MaterialIcons name="self-improvement" size={18} color={colors.white} />
              </View>
              <Text
                style={{
                  color: colors.white,
                  fontSize: typography.sizes.base,
                  fontWeight: typography.weights.bold,
                  letterSpacing: -0.2,
                }}
              >
                ZenPulse
              </Text>
            </View>

            <View className="w-6" />
          </View>

          <View className="px-6 pb-8 pt-3">
            <View className="mb-6 overflow-hidden rounded-xl">
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

            <Text
              className="text-center"
              style={{
                color: colors.white,
                fontSize: typography.sizes.x3l,
                fontWeight: typography.weights.bold,
                letterSpacing: -0.5,
              }}
            >
              Unlock ZenPulse Premium
            </Text>
            <Text
              className="mt-2 text-center"
              style={{ color: colors.slate400, fontSize: typography.sizes.lg }}
            >
              Experience your daily calm
            </Text>
          </View>

          <View className="mb-10 px-8" style={{ gap: spacing[4] }}>
            {BENEFITS.map((benefit) => (
              <View key={benefit.label} className="flex-row items-center" style={{ gap: spacing[4] }}>
                <View
                  className="h-8 w-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: rgba.accentTeal05 }}
                >
                  <MaterialIcons name={benefit.icon} size={20} color={colors.accentTeal} />
                </View>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: typography.sizes.base,
                    fontWeight: typography.weights.medium,
                  }}
                >
                  {benefit.label}
                </Text>
              </View>
            ))}
          </View>

          <View className="mb-8 px-6" style={{ gap: spacing[4] }}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setSelectedPlan("yearly")}
              style={({ pressed }) => [{ opacity: pressed ? 0.96 : 1 }]}
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

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center" style={{ gap: spacing[4] }}>
                    <View
                      className="h-6 w-6 items-center justify-center rounded-full"
                      style={{
                        borderWidth: 2,
                        borderColor: selectedPlan === "yearly" ? colors.primary : colors.slate700,
                      }}
                    >
                      {selectedPlan === "yearly" ? (
                        <View
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: colors.primary }}
                        />
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
                  <View className="items-end">
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
              style={({ pressed }) => [{ opacity: pressed ? 0.96 : 1 }]}
            >
              <GlassCard variant={selectedPlan === "monthly" ? "active" : "default"} style={{ padding: spacing[5] }}>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center" style={{ gap: spacing[4] }}>
                    <View
                      className="h-6 w-6 items-center justify-center rounded-full"
                      style={{
                        borderWidth: 2,
                        borderColor: selectedPlan === "monthly" ? colors.primary : colors.slate700,
                      }}
                    >
                      {selectedPlan === "monthly" ? (
                        <View
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: colors.primary }}
                        />
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
                  <View className="items-end">
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

          <View className="mt-auto px-6 pb-6">
            <PrimaryButton
              label="Try Free for 7 Days"
              onPress={handleSubscribe}
              style={{
                minHeight: 64,
                borderRadius: radius.xl,
              }}
              textStyle={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}
            />
          </View>

          <View className="px-8 pb-10">
            <Text
              className="text-center"
              style={{
                color: colors.slate500,
                fontSize: typography.sizes.xxs,
                lineHeight: 16,
                marginBottom: spacing[6],
              }}
            >
              Your subscription will automatically renew at the end of the trial period. You can
              cancel at any time in your store settings.
            </Text>

            <View className="flex-row flex-wrap items-center justify-center" style={{ gap: spacing[3] }}>
              <Text style={{ color: colors.slate400, fontSize: typography.sizes.xs, fontWeight: typography.weights.medium }}>
                Restore Purchase
              </Text>
              <View className="h-1 w-1 rounded-full" style={{ backgroundColor: colors.slate700 }} />
              <Text style={{ color: colors.slate400, fontSize: typography.sizes.xs, fontWeight: typography.weights.medium }}>
                Terms of Service
              </Text>
              <View className="h-1 w-1 rounded-full" style={{ backgroundColor: colors.slate700 }} />
              <Text style={{ color: colors.slate400, fontSize: typography.sizes.xs, fontWeight: typography.weights.medium }}>
                Privacy Policy
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
