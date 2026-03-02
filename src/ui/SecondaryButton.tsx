import { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { colors, radius, rgba, spacing, typography } from "../theme/tokens";

type SecondaryButtonProps = PressableProps & {
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function SecondaryButton({
  label,
  leftIcon,
  rightIcon,
  loading,
  disabled,
  style,
  textStyle,
  ...props
}: SecondaryButtonProps) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      <View style={styles.content}>
        {loading ? <ActivityIndicator color={colors.slate100} /> : leftIcon}
        <Text style={[styles.label, textStyle]}>{label}</Text>
        {!loading && rightIcon}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: rgba.white20,
    backgroundColor: "transparent",
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[4],
    justifyContent: "center",
  },
  pressed: {
    backgroundColor: rgba.white03,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.55,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
  },
  label: {
    color: colors.slate100,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },
});
