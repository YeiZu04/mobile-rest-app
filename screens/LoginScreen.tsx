import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute,useFocusEffect  } from '@react-navigation/native';  

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
  setIsAuthenticated: (auth: boolean) => void;  // Pasamos la función de autenticación
}

const LoginScreen: React.FC<Props> = ({ navigation, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const route = useRoute(); 

   // Resetear el estado de loading cada vez que el usuario acceda al login
   useFocusEffect(
    React.useCallback(() => {
      setLoading(false);  // Reiniciar el estado de `loading` al entrar en la pantalla
    }, [])
  );

  const handleLogin = async () => {
    setLoading(true); 
    try {
      const response = await axios.post('http://20.220.28.3/api/login', { email, password });
      const token = response.data.token;
      await AsyncStorage.setItem('AUTH_TOKEN', token);

      // Simular el proceso de carga durante 4 segundos antes de redirigir
      setTimeout(() => {
        setIsAuthenticated(true); // Cambiar el estado para marcar que el usuario está logueado
        setLoading(false); 
      }, 3000); 
    } catch (error: any) {
      setLoading(false); 
      if (error.response) {
        Alert.alert('Error de inicio de sesión', error.response.data.message || 'Credenciales incorrectas');
      } else {
        Alert.alert('Error', 'Error de conexión, por favor intenta nuevamente');
      }
    }
  };

  return (
    <View className="flex-1 justify-center px-5 bg-gray-200">
      {loading ? ( 
        <View className="justify-center items-center">
          <Image
            source={require('../assets/burger.gif')} 
            style={{ width: 200, height: 200 }}
          />
          <Text className="text-lg font-bold mt-5">Cargando...</Text>
        </View>
      ) : (
        <>
          <View className="justify-center items-center mb-5">
            <View
              style={{
                shadowColor: '#000', 
                shadowOffset: { width: 0, height: 4 }, 
                shadowOpacity: 0.3, 
                shadowRadius: 5, 
                elevation: 10, 
              }}
            >
              <Image
                source={require('../assets/img/logo.png')}
                style={{
                  width: 250,
                  height: 250,
                  borderRadius: 125, 
                }}
              />
            </View>
          </View>

          <Text className="text-2xl font-bold text-center">Iniciar Sesión</Text>

          <TextInput
            className="border p-3 mt-5 rounded w-full"
            placeholder="Tu Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            className="border p-3 mt-5 rounded w-full"
            placeholder="Tu Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            className="bg-indigo-600 p-3 mt-5 rounded w-full"
            onPress={handleLogin}
            disabled={loading} 
          >
            <Text className="text-white text-center">Iniciar Sesión</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default LoginScreen;
