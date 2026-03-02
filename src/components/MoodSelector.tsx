import { Pressable, Text, View } from "react-native";
import { MOODS, Mood } from "../ai/affirmations";

type MoodSelectorProps = {
  selectedMood: Mood;
  onSelectMood: (mood: Mood) => void;
};

const ACCENT_BY_MOOD: Record<Mood, string> = {
  happy: "border-accent-teal bg-accent-teal/10",
  neutral: "border-primary bg-primary/10",
  sad: "border-orange-400 bg-orange-400/10",
};

export function MoodSelector({ selectedMood, onSelectMood }: MoodSelectorProps) {
  return (
    <View className="mb-8 flex-row flex-wrap gap-3">
      {MOODS.map(({ mood, emoji, label }) => {
        const selected = selectedMood === mood;
        const accentClassName = ACCENT_BY_MOOD[mood];
        return (
          <Pressable
            key={mood}
            accessibilityRole="button"
            onPress={() => onSelectMood(mood)}
            style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}
            className={`flex-row items-center gap-2 rounded-full border px-4 py-2 ${
              selected ? accentClassName : "border-slate-700 bg-transparent"
            }`}
          >
            <Text className="text-lg">{emoji}</Text>
            <Text className="text-sm font-medium text-slate-100">{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
