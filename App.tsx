import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from "./src/navigation";
import { SubscriptionProvider } from "./src/state/subscriptionStore";

export default function App() {
  return (
    <SafeAreaProvider>
      <SubscriptionProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SubscriptionProvider>
    </SafeAreaProvider>
  );
}
