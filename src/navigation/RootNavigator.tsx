import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import { AffirmationScreen } from "../screens/AffirmationScreen";
import { MeditationsScreen } from "../screens/MeditationsScreen";
import { PaywallScreen } from "../screens/PaywallScreen";
import { useSubscription } from "../state/subscriptionStore";

export type RootStackParamList = {
  Paywall: undefined;
  Meditations: undefined;
  Affirmation: undefined;
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isSubscribed ? (
        <Stack.Screen name="Paywall" component={PaywallScreen} />
      ) : (
        <>
          <Stack.Screen name="Meditations" component={MeditationsScreen} />
          <Stack.Screen name="Affirmation" component={AffirmationScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
