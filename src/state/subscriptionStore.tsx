import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "zenpulse:isSubscribed";

type SubscriptionContextValue = {
  isSubscribed: boolean;
  hydrated: boolean;
  setSubscribed: (value: boolean) => Promise<void>;
  hydrateFromStorage: () => Promise<void>;
};

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(
  undefined
);

export function SubscriptionProvider({ children }: PropsWithChildren) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const hydrateFromStorage = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      setIsSubscribed(stored === "true");
    } finally {
      setHydrated(true);
    }
  }, []);

  const setSubscribed = useCallback(async (value: boolean) => {
    setIsSubscribed(value);
    await AsyncStorage.setItem(STORAGE_KEY, String(value));
  }, []);

  useEffect(() => {
    void hydrateFromStorage();
  }, [hydrateFromStorage]);

  const value = useMemo(
    () => ({
      isSubscribed,
      hydrated,
      setSubscribed,
      hydrateFromStorage,
    }),
    [hydrateFromStorage, hydrated, isSubscribed, setSubscribed]
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within SubscriptionProvider");
  }
  return context;
}
