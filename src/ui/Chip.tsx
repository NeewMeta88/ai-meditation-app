import { ReactNode } from "react";
import { Pressable, PressableProps, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { colors, radius, spacing, typography } from "../theme/tokens";

type ChipTone = "default" | "teal" | "primary" | "orange";

type ChipProps = PressableProps & {
  label: string;
  leftIcon?: ReactNode;
  tone?: ChipTone;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Chip({ label, leftIcon, tone = "default", style, textStyle, ...props }: ChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [styles.base, toneStyles[tone], pressed && styles.pressed, style]}
      {...props}
    >
      <View style={styles.content}>
        {leftIcon}
        <Text style={[styles.label, textStyle]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.slate700,
    backgroundColor: "transparent",
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  pressed: {
    opacity: 0.9,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  label: {
    color: colors.slate100,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
});

const toneStyles = StyleSheet.create({
  default: {},
  teal: {
    borderColor: colors.accentTealAlt,
    backgroundColor: "rgba(45, 212, 191, 0.1)",
  },
  primary: {
    borderColor: colors.primary,
    backgroundColor: "rgba(149, 19, 236, 0.1)",
  },
  orange: {
    borderColor: colors.orange400,
    backgroundColor: "rgba(251, 146, 60, 0.1)",
  },
});
