import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Affirmation">;

export function AffirmationScreen({ navigation }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-rose-950">
      <View className="flex-1 justify-center px-6">
        <Text className="text-center text-3xl font-bold text-rose-100">
          Daily Affirmation
        </Text>
        <Text className="mt-4 text-center text-lg text-rose-200">
          I create calm and focus with every breath.
        </Text>

        <Pressable
          onPress={() => navigation.goBack()}
          className="mt-10 rounded-2xl bg-rose-300 px-5 py-4"
        >
          <Text className="text-center text-base font-semibold text-rose-950">
            Back to Meditations
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
