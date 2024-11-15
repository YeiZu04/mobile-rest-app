import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ResumenPedido from './components/ResumenPedido';  
import { QuioscoProvider } from './contex/QuioscoProvider'; 
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('AUTH_TOKEN');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error al obtener el token de autenticación:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <QuioscoProvider isAuthenticated={isAuthenticated}>
      <NavigationContainer>
        <Stack.Navigator>
          {isAuthenticated ? (
            <>
              <Stack.Screen name="Home">
                {(props) => ( // Pasar navigation y setIsAuthenticated
                  <HomeScreen {...props} setIsAuthenticated={setIsAuthenticated} />
                )}
              </Stack.Screen>
              <Stack.Screen name="ResumenPedido" component={ResumenPedido} options={{ title: 'Resumen del Pedido' }} />
            </>
          ) : (
            <Stack.Screen name="Login">
              {(props) => ( // Pasar navigation y setIsAuthenticated
                <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />
              )}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </QuioscoProvider>
  );
}
