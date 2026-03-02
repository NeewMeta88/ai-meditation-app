import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import { Mood } from "../ai/affirmations";
import { AffirmationScreen } from "../screens/AffirmationScreen";
import { MeditationsScreen } from "../screens/MeditationsScreen";
import { PaywallScreen } from "../screens/PaywallScreen";
import { useSubscription } from "../state/subscriptionStore";

export type RootStackParamList = {
  Paywall: undefined;
  Meditations: undefined;
  Affirmation:
    | {
        mood?: Mood;
        initialText?: string;
      }
    | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { isSubscribed, hydrated } = useSubscription();

  if (!hydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-950">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      key={isSubscribed ? "subscribed" : "free"}
      initialRouteName={isSubscribed ? "Meditations" : "Paywall"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Paywall" component={PaywallScreen} />
      <Stack.Screen name="Meditations" component={MeditationsScreen} />
      <Stack.Screen name="Affirmation" component={AffirmationScreen} />
    </Stack.Navigator>
  );
}
