import { StatusBar } from 'expo-status-bar';
import { Switch, Text, View, TouchableOpacity, Image, Linking  } from 'react-native';
import { useColorScheme } from 'nativewind';
import AppNavigation from './navigation/appNavigation';



export default function App() {
  return (
    <AppNavigation/>
  )
}
