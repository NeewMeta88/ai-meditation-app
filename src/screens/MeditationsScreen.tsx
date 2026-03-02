import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation";
import { generateAffirmation, Mood } from "../ai/affirmations";
import { useSubscription } from "../state/subscriptionStore";
import { MoodSelector } from "../components/MoodSelector";
import { MeditationSession, SessionCard } from "../components/SessionCard";

type Props = NativeStackScreenProps<RootStackParamList, "Meditations">;

const SESSION_CARD_WIDTH = 280;
const SESSION_CARD_SPACING = 16;

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
    <SafeAreaView className="flex-1 bg-background-dark">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pb-6 pt-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/15">
                <MaterialIcons name="person" size={26} color="#f8fafc" />
              </View>
              <View>
                <Text className="text-[11px] font-semibold uppercase tracking-[1.1px] text-slate-400">
                  Welcome back
                </Text>
                <Text className="text-[36px] font-bold leading-10 text-slate-100">Good Morning, Alex</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-1.5 rounded-full border border-primary/30 bg-primary/20 px-3 py-1.5">
              <MaterialIcons name="workspace-premium" size={16} color="#9513ec" />
              <Text className="text-[10px] font-bold uppercase tracking-[0.5px] text-primary">
                Premium
              </Text>
            </View>
          </View>
        </View>

        <View className="pb-8">
          <View className="mb-4 flex-row items-center justify-between px-6">
            <Text className="text-[32px] font-bold text-slate-100">Today&apos;s sessions</Text>
            <Pressable accessibilityRole="button" style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
              <Text className="text-sm font-semibold text-primary">View All</Text>
            </Pressable>
          </View>

          <FlatList
            horizontal
            data={sessions}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
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

        <View className="mx-6 mb-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-5 py-6">
          <View className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-primary/25" />

          <View className="relative z-10">
            <View className="mb-2 flex-row items-center gap-2">
              <MaterialIcons name="auto-awesome" size={20} color="#9513ec" />
              <Text className="text-[38px] font-bold leading-10 text-slate-100">AI Mood of the Day</Text>
            </View>
            <Text className="mb-6 text-sm text-slate-400">How are you feeling right now?</Text>

            <MoodSelector selectedMood={mood} onSelectMood={setMood} />

            <Pressable
              accessibilityRole="button"
              disabled={loading}
              onPress={handleGenerate}
              style={({ pressed }) => [
                { opacity: loading ? 0.7 : pressed ? 0.95 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] },
              ]}
              className="flex-row items-center justify-center gap-2 rounded-2xl bg-primary py-4"
            >
              <MaterialIcons name="psychology" size={20} color="#ffffff" />
              <Text className="text-lg font-bold text-white">
                {loading ? "Generating..." : "Generate Affirmation"}
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="mx-6 rounded-3xl border border-white/5 bg-surface-dark/55 px-6 py-6">
          <View className="mb-4 flex-row items-center gap-3">
            <View className="h-6 w-1 rounded-full bg-primary" />
            <Text className="text-[11px] font-bold uppercase tracking-[2px] text-slate-500">
              Your Affirmation
            </Text>
          </View>

          <ScrollView
            className="min-h-[104px]"
            style={{ maxHeight: 220 }}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text className="text-center text-[33px] italic leading-10 text-slate-300">
              &quot;{affirmation}&quot;
            </Text>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
