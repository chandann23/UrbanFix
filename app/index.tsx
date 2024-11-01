import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import { Redirect } from 'expo-router';
import HomeScreen from '@/screens/HomeScreen';
import ReportScreen from '@/screens/ReportScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  Report: { message: string };
  AllReports: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


const mockNavigation = {
  navigate: (screenName: string) => console.log(`Navigating to ${screenName}`),
  goBack: () => console.log('Going back'),
  // Add other navigation methods you're using
};

const mockRoute = {
  params: {
    message: "Welcome to Report Screen"
  }
};



export default function Index() {
  const { session, loading } = useAuth();


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If no session and not on auth pages, show the HomeScreen
  if (!session) {
    return <HomeScreen />;
  }



  // If authenticated, redirect to the main app area
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{
          title: 'Report Issue',
        }}
      />

    </Stack.Navigator>

  )
}
