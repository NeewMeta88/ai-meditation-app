import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation";
import { generateAffirmation, Mood } from "../ai/affirmations";
import { useSubscription } from "../state/subscriptionStore";
import { MoodSelector } from "../components/MoodSelector";
import { MeditationSession, SessionCard } from "../components/SessionCard";
import { colors, radius, rgba, shadows, spacing, typography } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "Meditations">;

const SESSION_CARD_WIDTH = 248;
const SESSION_CARD_SPACING = 14;
const CONTENT_WIDTH = "88%";

const sessions: MeditationSession[] = [
  {
    id: "morning-serenity",
    title: "Morning Serenity",
    durationMin: 12,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpI-1bHaxP-yBO50lIlSDfpnywDGM8wnuYDXzvj72NpdH0hZY3WFkSBDuStjM2YkqUVf_ebCi60Cy6mgWGgU5_aR_BUZoGqtmE16bQNm3DuiLcO2TIAbBHBNIUWclXSeyCHzmKUcOkRQDyaDP3kj2RmaW1yE4rsLAv7m_lwxFvTSVxM66adQelNKjoirNnqm5WHzy_KzVqH6uolwmaeURueYgWTJF_UyH-DZl2SZmqtJWGBsIkb6oOrYDuPIgLpnxKgMjG5MihbiM",
    isPremium: false,
  },
  {
    id: "night-stillness",
    title: "Night Stillness",
    durationMin: 20,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC0fHyhEzqH0PnfqXKs-ob6Ld1tPQ7PbQZZapH2J7YrofrXIHSmWJ92NXJEynrDT04uTJNxfZ2KFFI9_6MWWqYjZOofAsNQixj6uWz-CdBk4YHiy01zAzfxMAyQzCY0wlLhUSO6nls1WHle08m228i-cskS-l7f08lzn3tfZ4-CXq3B_GWy_KIipBTEnoFITZSNILPrHCcWrLPZ7j4B6GfM8QW5ALdg1HV8qtLAnL6vI4rWrmhnoaKFEj6SktLRsmsOomGVWRxlRes",
    isPremium: true,
  },
  {
    id: "deep-reset",
    title: "Deep Reset",
    durationMin: 15,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    isPremium: true,
  },
];

export function MeditationsScreen({ navigation }: Props) {
  const { isSubscribed } = useSubscription();
  const [mood, setMood] = useState<Mood>("neutral");
  const [loading, setLoading] = useState(false);
  const [affirmation, setAffirmation] = useState(
    "Your breath is an anchor. In the midst of the day, you have the power to find your center and return to a place of peace."
  );

  const handleGenerate = async () => {
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <View style={styles.headerRow}>
            <View style={styles.userRow}>
              <View style={styles.avatar}>
                <MaterialIcons name="person" size={26} color="#f8fafc" />
              </View>
              <View>
                <Text style={styles.welcomeText}>Welcome back</Text>
                <Text style={styles.greetingText}>Good Morning, Alex</Text>
              </View>
            </View>

            <View style={styles.premiumBadge}>
              <MaterialIcons name="workspace-premium" size={16} color="#9513ec" />
              <Text style={styles.premiumBadgeText}>Premium</Text>
            </View>
          </View>
        </View>

        <View style={styles.sessionsSection}>
          <View style={styles.sessionsHeader}>
            <Text style={styles.sessionsTitle}>Today&apos;s sessions</Text>
            <Pressable accessibilityRole="button" style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
              <Text style={styles.viewAllText}>View All</Text>
            </Pressable>
          </View>

          <FlatList
            horizontal
            data={sessions}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sessionsListContent}
            ItemSeparatorComponent={() => <View style={{ width: SESSION_CARD_SPACING }} />}
            decelerationRate="fast"
            snapToAlignment="start"
            snapToInterval={SESSION_CARD_WIDTH + SESSION_CARD_SPACING}
            initialNumToRender={3}
            windowSize={5}
            removeClippedSubviews
            getItemLayout={(_, index) => ({
              length: SESSION_CARD_WIDTH + SESSION_CARD_SPACING,
              offset: (SESSION_CARD_WIDTH + SESSION_CARD_SPACING) * index,
              index,
            })}
            extraData={isSubscribed}
            renderItem={({ item: session }) => {
              const locked = !isSubscribed && session.isPremium;

              return (
                <SessionCard
                  session={session}
                  locked={locked}
                  onPress={() => {
                    if (locked) {
                      navigation.navigate("Paywall");
                      return;
                    }
                    navigation.navigate("Affirmation", {
                      mood,
                      initialText: affirmation,
                    });
                  }}
                />
              );
            }}
          />
        </View>

        <View style={styles.moodCard}>
          <View style={styles.moodGlow} />

          <View style={styles.moodCardContent}>
            <View style={styles.moodTitleRow}>
              <MaterialIcons name="auto-awesome" size={20} color="#9513ec" />
              <Text style={styles.moodTitle}>AI Mood of the Day</Text>
            </View>
            <Text style={styles.moodSubtitle}>How are you feeling right now?</Text>

            <MoodSelector selectedMood={mood} onSelectMood={setMood} />

            <Pressable
              accessibilityRole="button"
              disabled={loading}
              onPress={handleGenerate}
              style={({ pressed }) => [
                styles.generateButton,
                {
                  opacity: loading ? 0.7 : pressed ? 0.95 : 1,
                  transform: [{ scale: pressed ? 0.99 : 1 }],
                },
              ]}
            >
              <MaterialIcons name="psychology" size={20} color="#ffffff" />
              <Text style={styles.generateButtonText}>
                {loading ? "Generating..." : "Generate Affirmation"}
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.outputCard}>
          <View style={styles.outputHeader}>
            <View style={styles.outputHeaderLine} />
            <Text style={styles.outputHeaderText}>Your Affirmation</Text>
          </View>

          <ScrollView
            style={styles.outputScroll}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.outputScrollContent}
          >
            <Text style={styles.outputText}>
              &quot;{affirmation}&quot;
            </Text>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundDarkHome,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[10],
  },
  headerSection: {
    width: CONTENT_WIDTH,
    alignSelf: "center",
    paddingTop: spacing[2],
    paddingBottom: spacing[6],
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[3],
  },
  userRow: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: rgba.primary30,
    backgroundColor: rgba.primary15,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    color: colors.slate400,
    fontSize: 11,
    fontWeight: typography.weights.semibold,
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  greetingText: {
    color: colors.slate100,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    lineHeight: 22,
  },
  premiumBadge: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1.5],
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: rgba.primary30,
    backgroundColor: rgba.primary20,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    ...shadows.glowLavender,
  },
  premiumBadgeText: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sessionsSection: {
    marginBottom: spacing[8],
  },
  sessionsHeader: {
    width: CONTENT_WIDTH,
    alignSelf: "center",
    marginBottom: spacing[4],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sessionsTitle: {
    color: colors.slate100,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  viewAllText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  sessionsListContent: {
    paddingHorizontal: spacing[6],
  },
  moodCard: {
    width: CONTENT_WIDTH,
    alignSelf: "center",
    marginBottom: spacing[6],
    overflow: "hidden",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: rgba.white10,
    backgroundColor: rgba.white05,
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[6],
  },
  moodGlow: {
    position: "absolute",
    right: -44,
    top: -48,
    height: 140,
    width: 140,
    borderRadius: radius.full,
    backgroundColor: rgba.primary20,
  },
  moodCardContent: {
    zIndex: 1,
  },
  moodTitleRow: {
    marginBottom: spacing[2],
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  moodTitle: {
    color: colors.slate100,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  moodSubtitle: {
    marginBottom: spacing[6],
    color: colors.slate400,
    fontSize: typography.sizes.sm,
  },
  generateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    paddingVertical: spacing[4],
    ...shadows.glowPrimary,
  },
  generateButtonText: {
    color: colors.white,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  outputCard: {
    width: CONTENT_WIDTH,
    alignSelf: "center",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: rgba.white05,
    backgroundColor: "rgba(30, 41, 59, 0.55)",
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[6],
  },
  outputHeader: {
    marginBottom: spacing[4],
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
  },
  outputHeaderLine: {
    height: 24,
    width: 4,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  outputHeaderText: {
    color: colors.slate500,
    fontSize: 11,
    fontWeight: typography.weights.bold,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  outputScroll: {
    minHeight: 104,
    maxHeight: 220,
  },
  outputScrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  outputText: {
    textAlign: "center",
    color: colors.slate300,
    fontSize: typography.sizes.lg,
    fontStyle: "italic",
    lineHeight: 30,
  },
});
