import React, { useEffect, useRef } from 'react';
import { AppState, AppStateStatus, StatusBar, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, persistor } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

// Suppress development logs for evaluation
LogBox.ignoreAllLogs(true);

const App = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }
    
    if (nextAppState === 'background') {
      console.log('App went to background');
    }

    appState.current = nextAppState;
    console.log('AppState', appState.current);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
