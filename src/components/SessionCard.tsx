import { MaterialIcons } from "@expo/vector-icons";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, rgba, spacing, typography } from "../theme/tokens";

export type MeditationSession = {
  id: string;
  title: string;
  durationMin: number;
  image: string;
  isPremium: boolean;
};

type SessionCardProps = {
  session: MeditationSession;
  locked: boolean;
  onPress: () => void;
};

export function SessionCard({ session, locked, onPress }: SessionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      android_ripple={{ color: "rgba(255,255,255,0.12)", borderless: false }}
      hitSlop={6}
      style={({ pressed }) => [
        styles.pressable,
        { opacity: pressed ? 0.96 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] },
      ]}
    >
      <View style={styles.imageWrap}>
        <ImageBackground
          source={{ uri: session.image }}
          resizeMode="cover"
          style={styles.image}
          imageStyle={locked ? { opacity: 0.58 } : undefined}
        >
          {locked ? <View style={styles.lockedOverlay} /> : null}
        </ImageBackground>

        {locked ? (
          <View style={styles.centerOverlay}>
            <View style={styles.lockCircle}>
              <MaterialIcons name="lock" size={22} color="#ffffff" />
            </View>
          </View>
        ) : null}

        {locked ? (
          <View style={styles.badgePremium}>
            <Text style={styles.badgePremiumText}>Premium</Text>
          </View>
        ) : (
          <View style={styles.badgeUnlocked}>
            <Text style={styles.badgeUnlockedText}>Unlocked</Text>
          </View>
        )}
      </View>

      <Text style={[styles.title, locked ? styles.titleLocked : styles.titleDefault]}>
        {session.title}
      </Text>
      <View style={styles.durationRow}>
        <MaterialIcons name="schedule" size={14} color={locked ? "#64748b" : "#94a3b8"} />
        <Text style={[styles.durationText, locked ? styles.durationTextLocked : styles.durationTextDefault]}>
          {session.durationMin} min
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: 248,
  },
  imageWrap: {
    position: "relative",
    marginBottom: spacing[3],
    height: 156,
    overflow: "hidden",
    borderRadius: radius.lg,
    backgroundColor: colors.backgroundDarkHome,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  lockedOverlay: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(2, 6, 23, 0.45)",
  },
  centerOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  lockCircle: {
    height: 48,
    width: 48,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: rgba.white20,
    backgroundColor: rgba.white10,
    alignItems: "center",
    justifyContent: "center",
  },
  badgePremium: {
    position: "absolute",
    right: spacing[3],
    top: spacing[3],
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
  },
  badgeUnlocked: {
    position: "absolute",
    left: spacing[3],
    top: spacing[3],
    borderRadius: radius.sm,
    backgroundColor: "rgba(2, 6, 23, 0.6)",
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
  },
  badgePremiumText: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.white,
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  badgeUnlockedText: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.accentTealAlt,
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  title: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
  },
  titleDefault: {
    color: colors.slate100,
  },
  titleLocked: {
    color: "rgba(203, 213, 225, 0.75)",
  },
  durationRow: {
    marginTop: spacing[1],
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1.5],
  },
  durationText: {
    fontSize: typography.sizes.sm,
  },
  durationTextDefault: {
    color: colors.slate400,
  },
  durationTextLocked: {
    color: colors.slate500,
  },
});
