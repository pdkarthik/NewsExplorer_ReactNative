import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#007AFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={({ navigation }) => ({
          title: 'News Feed',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('Bookmarks')}
              style={styles.headerButton}
            >
              <Text style={styles.headerButtonText}>Bookmarks</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={{ title: 'Article Details' }}
      />
      <Stack.Screen 
        name="Bookmarks" 
        component={BookmarksScreen} 
        options={{ title: 'My Bookmarks' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    paddingHorizontal: 8,
  },
  headerButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AppNavigator;
