import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import { colors, radius, rgba, shadows, spacing } from "../theme/tokens";

type GlassCardVariant = "default" | "active" | "affirmation";

type GlassCardProps = ViewProps & {
  children: ReactNode;
  variant?: GlassCardVariant;
  style?: StyleProp<ViewStyle>;
};

export function GlassCard({ children, variant = "default", style, ...props }: GlassCardProps) {
  return (
    <View style={[styles.base, variantStyles[variant], style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.xl,
    padding: spacing[5],
    borderWidth: 1,
    borderColor: rgba.white10,
    backgroundColor: rgba.white05,
    ...shadows.glassSoft,
  },
});

const variantStyles = StyleSheet.create({
  default: {},
  active: {
    backgroundColor: rgba.primary10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  affirmation: {
    backgroundColor: rgba.primary10,
    borderColor: rgba.primary20,
  },
});
