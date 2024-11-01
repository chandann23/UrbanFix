import { Stack } from "expo-router";
import AuthProvider from '../providers/AuthProvider'; // Adjust the import path as needed

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* You can add more screens or modify screen options here */}
      </Stack>
    </AuthProvider>
  );
}
