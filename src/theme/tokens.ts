export const colors = {
  primary: "#9513ec",
  accentTeal: "#40E0D0",
  accentTealAlt: "#2dd4bf",
  accentLavender: "#C8A2C8",
  backgroundLight: "#f7f6f8",
  backgroundDarkPaywall: "#050510",
  backgroundDarkHome: "#0f172a",
  backgroundDarkAffirmation: "#1b1022",
  surfaceDark: "#1e293b",
  white: "#ffffff",
  black: "#000000",
  slate100: "#f1f5f9",
  slate300: "#cbd5e1",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1e293b",
  orange400: "#fb923c",
  indigo500: "#6366f1",
  indigo900: "#312e81",
} as const;

export const rgba = {
  white03: "rgba(255, 255, 255, 0.03)",
  white05: "rgba(255, 255, 255, 0.05)",
  white10: "rgba(255, 255, 255, 0.1)",
  white20: "rgba(255, 255, 255, 0.2)",
  white90: "rgba(255, 255, 255, 0.9)",
  primary10: "rgba(149, 19, 236, 0.1)",
  primary15: "rgba(149, 19, 236, 0.15)",
  primary20: "rgba(149, 19, 236, 0.2)",
  primary30: "rgba(149, 19, 236, 0.3)",
  primary40: "rgba(149, 19, 236, 0.4)",
  accentTeal05: "rgba(64, 224, 208, 0.05)",
  backgroundAffirmation40: "rgba(27, 16, 34, 0.4)",
  indigo50010: "rgba(99, 102, 241, 0.1)",
  indigo90010: "rgba(49, 46, 129, 0.1)",
} as const;

export const gradients = {
  paywallScreen: [
    "radial-gradient(circle at 50% -20%, rgba(149, 19, 236, 0.15), transparent 70%)",
    "radial-gradient(circle at 0% 100%, rgba(64, 224, 208, 0.05), transparent 50%)",
  ],
  glassCardAffirmation: "linear-gradient(135deg, rgba(149, 19, 236, 0.1) 0%, rgba(27, 16, 34, 0.4) 100%)",
  primaryButton: [colors.primary, colors.accentLavender],
  outputCard: [colors.surfaceDark, colors.backgroundDarkHome],
} as const;

export const shadows = {
  glowPrimary: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  glowLavender: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  glassSoft: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 4,
  },
} as const;

export const radius = {
  sm: 8,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const spacing = {
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
} as const;

export const typography = {
  sizes: {
    xxs: 10,
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    x3l: 30,
    x4l: 36,
  },
  weights: {
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeights: {
    tight: 1.2,
    snug: 1.35,
    normal: 1.5,
  },
} as const;

export const nativeWindMap = {
  bg: {
    "bg-primary": colors.primary,
    "bg-background-light": colors.backgroundLight,
    "bg-background-dark": colors.backgroundDarkHome,
    "bg-surface-dark": colors.surfaceDark,
  },
  text: {
    "text-primary": colors.primary,
    "text-accent-teal": colors.accentTealAlt,
    "text-accent-lavender": colors.accentLavender,
    "text-slate-100": colors.slate100,
    "text-slate-400": colors.slate400,
  },
  border: {
    "border-primary": colors.primary,
    "border-white/10": rgba.white10,
    "border-white/20": rgba.white20,
    "border-slate-700": colors.slate700,
  },
  rounded: {
    rounded: radius.sm,
    "rounded-lg": radius.lg,
    "rounded-xl": radius.xl,
    "rounded-full": radius.full,
  },
  shadow: {
    "shadow-glow-primary": shadows.glowPrimary,
    "shadow-glow-lavender": shadows.glowLavender,
    "shadow-glass": shadows.glassSoft,
  },
} as const;

export const tokens = {
  colors,
  rgba,
  gradients,
  shadows,
  radius,
  spacing,
  typography,
  nativeWindMap,
} as const;

export type ZenPulseTokens = typeof tokens;
