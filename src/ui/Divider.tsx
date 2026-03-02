import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { colors, spacing, typography } from "../theme/tokens";

type DividerProps = {
  label?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export function Divider({ label, style, labelStyle }: DividerProps) {
  if (!label) {
    return <View style={[styles.line, style]} />;
  }

  return (
    <View style={[styles.row, style]}>
      <View style={styles.flexLine} />
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={styles.flexLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
  },
  flexLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  label: {
    color: colors.slate500,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
});
