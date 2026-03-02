export type Mood = "happy" | "neutral" | "sad";

function readEnv(name: string): string | undefined {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  const value = env?.[name];
  return typeof value === "string" ? value : undefined;
}

export const MOODS: ReadonlyArray<{ mood: Mood; label: string; emoji: string }> = [
  { mood: "happy", label: "Calm", emoji: "\u{1F60C}" },
  { mood: "neutral", label: "Focused", emoji: "\u{1F3AF}" },
  { mood: "sad", label: "Anxious", emoji: "\u{1F61F}" },
] as const;

export const USE_MOCK =
  String(readEnv("EXPO_PUBLIC_USE_MOCK") ?? readEnv("USE_MOCK") ?? "").toLowerCase() === "true";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "arcee-ai/trinity-large-preview:free";
const REQUEST_TIMEOUT_MS = 12_000;

const MOCK_LIBRARY: Record<Mood, readonly string[]> = {
  happy: [
    "Your calm is already within reach, and each breath helps you return to it. Let your shoulders soften and your mind settle into this moment. You are allowed to move through today with ease and quiet confidence. Peace is not far away, it is here with you now.",
    "A gentle steadiness is guiding you right now. With every inhale, you invite clarity; with every exhale, you release pressure. You do not need to force calm, you only need to notice it. This moment is enough, and you are enough inside it.",
  ],
  neutral: [
    "Your mind is clear enough for the next small step, and that is all you need. Breathe in focus, breathe out distraction, and keep returning to what matters. You are building momentum through calm consistency. Progress grows from this grounded attention.",
    "You can meet this day with steady attention and a relaxed body. Let each breath organize your thoughts and simplify your priorities. You already have what you need to move forward with clarity. Calm focus will carry you through one step at a time.",
  ],
  sad: [
    "You are safe in this breath, even if your mind feels crowded right now. Let the inhale create space and the exhale release what feels heavy. You are not behind, and you do not need to solve everything at once. Gentle calm can hold you while you reset.",
    "It is okay to slow down and care for yourself in this moment. With each breath, allow your body to unclench and your thoughts to soften. You are doing better than your worry suggests. A quiet center is still available to you, one breath at a time.",
  ],
};

const MOOD_NOTES: Record<Mood, string> = {
  happy: "The user reports a positive mood and wants grounded calm, not hype.",
  neutral: "The user reports a neutral mood and wants clarity, focus, and steadiness.",
  sad: "The user reports a low or anxious mood and needs gentle reassurance without cliches.",
};

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(items: readonly T[]): T {
  return items[randomInt(0, items.length - 1)];
}

async function mockAffirmation(mood: Mood): Promise<string> {
  const delayRange: Record<Mood, [number, number]> = {
    happy: [700, 900],
    neutral: [850, 1050],
    sad: [950, 1200],
  };

  const [minDelay, maxDelay] = delayRange[mood];
  const delay = randomInt(minDelay, maxDelay);
  await new Promise<void>((resolve) => {
    setTimeout(resolve, delay);
  });

  return pickRandom(MOCK_LIBRARY[mood]);
}

export function buildLLMPrompt(mood: Mood): string {
  return [
    "You are a premium meditation coach writing one personalized daily affirmation.",
    "Write exactly 3 to 5 sentences in warm, modern English.",
    "Tone: calm, grounded, compassionate, and confident.",
    "Avoid spiritual jargon, hashtags, and list formatting.",
    "Avoid mention of AI, model, prompts, or policy.",
    "Keep it practical and emotionally supportive, suitable for a meditation app hero card.",
    "Use second person perspective.",
    MOOD_NOTES[mood],
  ].join(" ");
}

type GenerateAffirmationOptions = {
  mood: Mood;
  timeoutMs?: number;
  signal?: AbortSignal;
  useMock?: boolean;
};

export async function generateAffirmation({
  mood,
  timeoutMs = REQUEST_TIMEOUT_MS,
  signal,
  useMock,
}: GenerateAffirmationOptions): Promise<string> {
  const apiKey = readEnv("EXPO_PUBLIC_OPENROUTER_API_KEY")?.trim();
  const forceMock = useMock ?? USE_MOCK;

  if (forceMock || !apiKey) {
    return mockAffirmation(mood);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const onExternalAbort = () => controller.abort();
  signal?.addEventListener("abort", onExternalAbort);

  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    const referer = readEnv("EXPO_PUBLIC_OPENROUTER_SITE_URL")?.trim();
    const title = readEnv("EXPO_PUBLIC_OPENROUTER_APP_NAME")?.trim();

    if (referer) {
      headers["HTTP-Referer"] = referer;
    }

    if (title) {
      headers["X-Title"] = title;
    }

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.7,
        max_tokens: 220,
        messages: [
          {
            role: "system",
            content:
              "You create concise, premium daily affirmations for a meditation app. Keep responses emotionally grounded and easy to read.",
          },
          {
            role: "user",
            content: buildLLMPrompt(mood),
          },
        ],
      }),
    });

    if (!response.ok) {
      return mockAffirmation(mood);
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };

    const content = payload.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return mockAffirmation(mood);
    }

    return content;
  } catch {
    return mockAffirmation(mood);
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener("abort", onExternalAbort);
  }
}
