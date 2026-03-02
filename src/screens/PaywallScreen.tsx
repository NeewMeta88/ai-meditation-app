import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSubscription } from "../state/subscriptionStore";

export function PaywallScreen() {
  const { setSubscribed } = useSubscription();

  const handleSubscribe = async () => {
    await setSubscribed(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-emerald-950">
      <View className="flex-1 justify-center px-6">
        <Text className="text-center text-4xl font-bold text-emerald-100">
          ZenPulse
        </Text>
        <Text className="mt-4 text-center text-base text-emerald-200">
          Unlock premium meditations and daily affirmation flows.
        </Text>

        <Pressable
          onPress={handleSubscribe}
          className="mt-10 rounded-2xl bg-emerald-400 px-5 py-4"
        >
          <Text className="text-center text-lg font-semibold text-emerald-950">
            Start Subscription
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
