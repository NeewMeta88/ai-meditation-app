import { Pressable, Text, View } from "react-native";

type Mood = "Calm" | "Focused" | "Anxious";

type MoodSelectorProps = {
  selectedMood: Mood;
  onSelectMood: (mood: Mood) => void;
};

const MOODS: Array<{ mood: Mood; emoji: string; accentClassName: string }> = [
  { mood: "Calm", emoji: "\u{1F60C}", accentClassName: "border-accent-teal bg-accent-teal/10" },
  { mood: "Focused", emoji: "\u{1F3AF}", accentClassName: "border-primary bg-primary/10" },
  { mood: "Anxious", emoji: "\u{1F61F}", accentClassName: "border-orange-400 bg-orange-400/10" },
];

export function MoodSelector({ selectedMood, onSelectMood }: MoodSelectorProps) {
  return (
    <View className="mb-8 flex-row flex-wrap gap-3">
      {MOODS.map(({ mood, emoji, accentClassName }) => {
        const selected = selectedMood === mood;
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
            <Text className="text-sm font-medium text-slate-100">{mood}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
