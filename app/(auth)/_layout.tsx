{/*import { useAuth } from '@/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={'/'} />;
  }

  return <Stack />;
}*/}

import { Stack } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { Redirect } from 'expo-router';
import HomeScreen from '@/screens/HomeScreen';

export default function AuthLayout() {
  const { session } = useAuth();

  // If user is authenticated, redirect to the main app
  if (session) {
    return <HomeScreen />;
  }

  return (
    <Stack>
      <Stack.Screen 
        name="sign-in" 
        options={{
          title: 'Sign In',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="sign-up" 
        options={{
          title: 'Create Account',
          headerShown: true,
        }} 
      />
    </Stack>
  );
}
