import { Pressable, StyleSheet, Text, View } from "react-native";
import { MOODS, Mood } from "../ai/affirmations";
import { colors, radius, rgba, spacing, typography } from "../theme/tokens";

type MoodSelectorProps = {
  selectedMood: Mood;
  onSelectMood: (mood: Mood) => void;
};

const ACCENT_BY_MOOD: Record<Mood, { borderColor: string; backgroundColor: string }> = {
  happy: { borderColor: colors.accentTealAlt, backgroundColor: "rgba(45, 212, 191, 0.1)" },
  neutral: { borderColor: colors.primary, backgroundColor: rgba.primary10 },
  sad: { borderColor: colors.orange400, backgroundColor: "rgba(251, 146, 60, 0.1)" },
};

export function MoodSelector({ selectedMood, onSelectMood }: MoodSelectorProps) {
  return (
    <View style={styles.container}>
      {MOODS.map(({ mood, emoji, label }) => {
        const selected = selectedMood === mood;
        const accentStyle = ACCENT_BY_MOOD[mood];
        return (
          <Pressable
            key={mood}
            accessibilityRole="button"
            onPress={() => onSelectMood(mood)}
            style={({ pressed }) => [
              styles.button,
              selected ? accentStyle : styles.buttonDefault,
              { opacity: pressed ? 0.92 : 1 },
            ]}
          >
            <Text style={styles.emoji}>{emoji}</Text>
            <Text style={styles.label}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[3],
    marginBottom: spacing[8],
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  buttonDefault: {
    borderColor: colors.slate700,
    backgroundColor: "transparent",
  },
  emoji: {
    fontSize: typography.sizes.lg,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.slate100,
  },
});
