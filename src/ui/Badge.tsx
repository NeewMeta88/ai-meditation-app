import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { colors, radius, rgba, shadows, spacing, typography } from "../theme/tokens";

type BadgeTone = "premium" | "unlocked" | "calm";

type BadgeProps = {
  label: string;
  icon?: ReactNode;
  tone?: BadgeTone;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Badge({ label, icon, tone = "premium", style, textStyle }: BadgeProps) {
  return (
    <View style={[styles.base, toneStyles[tone], style]}>
      {icon}
      <Text style={[styles.label, toneTextStyles[tone], textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1.5],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderRadius: radius.full,
    borderWidth: 1,
  },
  label: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
});

const toneStyles = StyleSheet.create({
  premium: {
    backgroundColor: rgba.primary20,
    borderColor: rgba.primary30,
    ...shadows.glowLavender,
  },
  unlocked: {
    backgroundColor: "rgba(5, 5, 16, 0.6)",
    borderColor: "transparent",
  },
  calm: {
    backgroundColor: rgba.primary20,
    borderColor: rgba.primary30,
  },
});

const toneTextStyles = StyleSheet.create({
  premium: { color: colors.primary },
  unlocked: { color: colors.accentTealAlt },
  calm: { color: colors.primary },
});
