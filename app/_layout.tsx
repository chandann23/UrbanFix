import AuthProvider, { useAuth } from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import { Redirect, Slot, Stack } from "expo-router";

export default function RootLayout() {
  const { session } = useAuth();
  if (session) {
    return <Redirect href={'/'} />;
  }

  return (
    <AuthProvider>
      <QueryProvider>

      <Slot />
      </QueryProvider>
    </AuthProvider>
  );
}

