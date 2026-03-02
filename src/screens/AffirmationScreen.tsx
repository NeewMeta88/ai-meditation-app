import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { generateAffirmation, Mood } from "../ai/affirmations";
import { RootStackParamList } from "../navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Affirmation">;

const DEFAULT_AFFIRMATION =
  "I create calm and focus with every breath.";

export function AffirmationScreen({ navigation, route }: Props) {
  const [mood] = useState<Mood>(route.params?.mood ?? "neutral");
  const [affirmation, setAffirmation] = useState(
    route.params?.initialText ?? DEFAULT_AFFIRMATION
  );
  const [loading, setLoading] = useState(false);

  const handleRegenerate = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const nextAffirmation = await generateAffirmation({ mood });
      setAffirmation(nextAffirmation);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    Alert.alert("Saved", "Affirmation saved.");
  };

  return (
    <SafeAreaView className="flex-1 bg-rose-950">
      <View className="flex-1 justify-center px-6">
        <Text className="text-center text-3xl font-bold text-rose-100">
          Daily Affirmation
        </Text>
        <ScrollView
          className="mt-4"
          style={{ maxHeight: 220 }}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <Text className="text-center text-lg text-rose-200">{affirmation}</Text>
        </ScrollView>

        <Pressable
          disabled={loading}
          onPress={handleRegenerate}
          style={({ pressed }) => [{ opacity: loading ? 0.7 : pressed ? 0.9 : 1 }]}
          className="mt-10 rounded-2xl bg-rose-300 px-5 py-4"
        >
          <Text className="text-center text-base font-semibold text-rose-950">
            {loading ? "Regenerating..." : "Regenerate"}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSave}
          className="mt-4 rounded-2xl bg-rose-300 px-5 py-4"
        >
          <Text className="text-center text-base font-semibold text-rose-950">
            Save
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.goBack()}
          className="mt-4 rounded-2xl bg-rose-300 px-5 py-4"
        >
          <Text className="text-center text-base font-semibold text-rose-950">
            Back to Meditations
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
