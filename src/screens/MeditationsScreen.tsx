import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation";
import { useSubscription } from "../state/subscriptionStore";

type Props = NativeStackScreenProps<RootStackParamList, "Meditations">;

export function MeditationsScreen({ navigation }: Props) {
  const { setSubscribed } = useSubscription();

  const handleLogout = async () => {
    await setSubscribed(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <View className="flex-1 px-6 py-4">
        <Text className="text-3xl font-bold text-slate-100">Meditations</Text>
        <Text className="mt-2 text-base text-slate-300">
          Your daily calm sessions are ready.
        </Text>

        <Pressable
          onPress={() => navigation.navigate("Affirmation")}
          className="mt-8 rounded-2xl bg-cyan-400 px-5 py-4"
        >
          <Text className="text-center text-base font-semibold text-slate-950">
            Open Affirmation
          </Text>
        </Pressable>

        <Pressable
          onPress={handleLogout}
          className="mt-4 rounded-2xl border border-slate-600 px-5 py-4"
        >
          <Text className="text-center text-base font-semibold text-slate-200">
            Cancel Subscription
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
