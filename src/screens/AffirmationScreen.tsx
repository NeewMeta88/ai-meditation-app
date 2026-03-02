import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { generateAffirmation, Mood, MOODS } from "../ai/affirmations";
import { RootStackParamList } from "../navigation";
import { colors, radius, rgba, spacing, typography } from "../theme/tokens";
import { Badge, PrimaryButton, SecondaryButton } from "../ui";

type Props = NativeStackScreenProps<RootStackParamList, "Affirmation">;

const DEFAULT_AFFIRMATION =
  "I am at peace with my past and excited for my future. Each breath I take fills me with tranquility and strength.";

export function AffirmationScreen({ navigation, route }: Props) {
  const [mood] = useState<Mood>(route.params?.mood ?? "neutral");
  const [affirmation, setAffirmation] = useState(route.params?.initialText ?? DEFAULT_AFFIRMATION);
  const [loading, setLoading] = useState(false);

  const moodMeta = useMemo(() => MOODS.find((entry) => entry.mood === mood), [mood]);
  const moodLabel = moodMeta?.label ?? "Calm";
  const moodEmoji = moodMeta?.emoji ?? "\u{1F60C}";

  const handleRegenerate = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const nextAffirmation = await generateAffirmation({ mood });
      setAffirmation(nextAffirmation);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    Alert.alert("Saved", "Affirmation saved.");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundDarkAffirmation }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: spacing[8] }}
        showsVerticalScrollIndicator={false}
      >
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: "20%",
            right: "-35%",
            width: 500,
            height: 500,
            borderRadius: radius.full,
            backgroundColor: "rgba(149, 19, 236, 0.05)",
          }}
        />
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            bottom: "18%",
            left: "-35%",
            width: 500,
            height: 500,
            borderRadius: radius.full,
            backgroundColor: rgba.indigo90010,
          }}
        />

        <View style={{ width: "100%", maxWidth: 448, alignSelf: "center", paddingHorizontal: spacing[6] }}>
          <View style={{ alignItems: "center", paddingTop: spacing[2] }}>
            <Badge
              tone="calm"
              label={moodLabel}
              icon={<Text style={{ fontSize: typography.sizes.sm }}>{moodEmoji}</Text>}
              style={{ alignSelf: "center" }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: spacing[5],
              paddingBottom: spacing[6],
            }}
          >
            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.goBack()}
              style={({ pressed }) => ({
                width: 40,
                height: 40,
                borderRadius: radius.full,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: pressed ? rgba.white20 : rgba.white10,
              })}
            >
              <MaterialIcons name="arrow-back" size={22} color={colors.slate100} />
            </Pressable>

            <Text
              style={{
                color: colors.slate100,
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
                letterSpacing: -0.2,
              }}
            >
              Your AI Affirmation
            </Text>

            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => ({
                width: 40,
                height: 40,
                borderRadius: radius.full,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: pressed ? rgba.white20 : rgba.white10,
              })}
            >
              <MaterialIcons name="share" size={22} color={colors.slate100} />
            </Pressable>
          </View>

          <View style={{ marginTop: spacing[8], flex: 1 }}>
            <View
              style={{
                minHeight: 400,
                borderRadius: radius.xl,
                padding: spacing[8],
                borderWidth: 1,
                borderColor: rgba.primary20,
                backgroundColor: rgba.backgroundAffirmation40,
                overflow: "hidden",
              }}
            >
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  top: -96,
                  right: -96,
                  width: 256,
                  height: 256,
                  borderRadius: radius.full,
                  backgroundColor: rgba.primary20,
                }}
              />
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  bottom: -96,
                  left: -96,
                  width: 256,
                  height: 256,
                  borderRadius: radius.full,
                  backgroundColor: rgba.indigo50010,
                }}
              />

              <View style={{ flex: 1, justifyContent: "center" }}>
                <MaterialIcons
                  name="format-quote"
                  size={42}
                  color="rgba(149, 19, 236, 0.4)"
                  style={{ marginBottom: spacing[6], alignSelf: "center" }}
                />

                <Text
                  style={{
                    color: colors.slate100,
                    fontSize: typography.sizes.x3l,
                    fontWeight: typography.weights.light,
                    lineHeight: 42,
                    letterSpacing: -0.5,
                    textAlign: "center",
                  }}
                >
                  {affirmation}
                </Text>

                <View style={{ marginTop: spacing[10], alignItems: "center" }}>
                  <View
                    style={{
                      height: 4,
                      width: 48,
                      borderRadius: radius.full,
                      backgroundColor: rgba.primary30,
                    }}
                  />
                  <Text
                    style={{
                      marginTop: spacing[2],
                      color: colors.slate400,
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.medium,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                    }}
                  >
                    Generated for you
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ marginTop: spacing[10], gap: spacing[4] }}>
            <PrimaryButton
              label={loading ? "Regenerating..." : "Regenerate"}
              onPress={handleRegenerate}
              disabled={loading}
              leftIcon={<MaterialIcons name="auto-awesome" size={20} color={colors.white} />}
              style={{ minHeight: 64 }}
            />
            <SecondaryButton
              label="Save to Favorites"
              onPress={handleSave}
              leftIcon={<MaterialIcons name="favorite-border" size={20} color={colors.slate100} />}
              style={{ minHeight: 64 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
