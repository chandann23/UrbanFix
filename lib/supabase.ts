import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'
import { AppState, Platform } from 'react-native'

// Supabase credentials
const supabaseUrl = 'https://kgcsewcmlqwyhmcsnjru.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnY3Nld2NtbHF3eWhtY3NuanJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzNjI0NTQsImV4cCI6MjA0NTkzODQ1NH0.Gg3VEPaguEtFBK8K9FLyrnuFDTdAj80GG7Z1-SBfljo'

// Custom storage adapter for Expo using expo-secure-store
const customStorage = {
  async getItem(key: string) {
    try {
      // Use the correct method for expo-secure-store
      const value = await SecureStore.getItemAsync(key)
      return value
    } catch (error) {
      console.error('Error getting item from secure store', error)
      return null
    }
  },
  async setItem(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value)
    } catch (error) {
      console.error('Error setting item in secure store', error)
    }
  },
  async removeItem(key: string) {
    try {
      await SecureStore.deleteItemAsync(key)
    } catch (error) {
      console.error('Error removing item from secure store', error)
    }
  },
}

// Fallback storage for web or if SecureStore fails
const fallbackStorage = {
  async getItem(key: string) {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      return window.localStorage.getItem(key)
    }
    return null
  },
  async setItem(key: string, value: string) {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.localStorage.setItem(key, value)
    }
  },
  async removeItem(key: string) {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.localStorage.removeItem(key)
    }
  },
}

// Create Supabase client with multiple storage options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.OS === 'web' ? fallbackStorage : customStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Handle app state changes for token refresh
const handleAppStateChange = (state: string) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
}

// Add event listener for app state changes
const subscription = AppState.addEventListener('change', handleAppStateChange)

// Optional cleanup function
export const cleanup = () => {
  subscription.remove()
}
