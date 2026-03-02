import { MaterialIcons } from "@expo/vector-icons";
import { ImageBackground, Pressable, Text, View } from "react-native";

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
      style={({ pressed }) => [{ width: 280, opacity: pressed ? 0.96 : 1 }]}
    >
      <View className="relative mb-3 h-[176px] overflow-hidden rounded-2xl bg-slate-900">
        <ImageBackground
          source={{ uri: session.image }}
          resizeMode="cover"
          className="h-full w-full"
          imageStyle={locked ? { opacity: 0.58 } : undefined}
        >
          {locked ? <View className="h-full w-full bg-slate-950/45" /> : null}
        </ImageBackground>

        {locked ? (
          <View className="absolute inset-0 items-center justify-center">
            <View className="h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10">
              <MaterialIcons name="lock" size={22} color="#ffffff" />
            </View>
          </View>
        ) : null}

        {locked ? (
          <View className="absolute right-3 top-3 rounded-md bg-primary px-2 py-1">
            <Text className="text-[10px] font-bold uppercase tracking-[0.7px] text-white">
              Premium
            </Text>
          </View>
        ) : (
          <View className="absolute left-3 top-3 rounded-md bg-slate-950/60 px-2 py-1">
            <Text className="text-[10px] font-bold uppercase tracking-[0.7px] text-accent-teal">
              Unlocked
            </Text>
          </View>
        )}
      </View>

      <Text className={locked ? "text-xl font-bold text-slate-300/75" : "text-xl font-bold text-slate-100"}>
        {session.title}
      </Text>
      <View className="mt-1 flex-row items-center gap-1.5">
        <MaterialIcons name="schedule" size={14} color={locked ? "#64748b" : "#94a3b8"} />
        <Text className={locked ? "text-sm text-slate-500" : "text-sm text-slate-400"}>
          {session.durationMin} min
        </Text>
      </View>
    </Pressable>
  );
}
