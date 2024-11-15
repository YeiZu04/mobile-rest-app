import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = ({ navigation, setIsAuthenticated }) => {
  const [isRegistering, setIsRegistering] = useState(false); // Alterna entre login y registro
  const [name, setName] = useState(''); // Nuevo campo para el nombre
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para manejar el registro
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    const datos = {
      name,
      email,
      password,
      password_confirmation: confirmPassword
    };

    try {
      const response = await axios.post('http://209.50.54.241/api/registro', datos);
      const token = response.data.token;
      await AsyncStorage.setItem('AUTH_TOKEN', token);
      setIsAuthenticated(true);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error de registro', error.response?.data.message || 'Ocurrió un error');
    }
  };

  // Función para manejar el login
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://209.50.54.241/api/login', { email, password });
      const token = response.data.token;
      await AsyncStorage.setItem('AUTH_TOKEN', token);
      setIsAuthenticated(true);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error de inicio de sesión', error.response?.data.message || 'Credenciales incorrectas');
    }
  };

  return (
    <View className="flex-1 justify-center px-5 bg-gray-200">
      {loading ? (
        <View className="justify-center items-center">
          <Image source={require('../assets/burger.gif')} style={{ width: 200, height: 200 }} />
          <Text className="text-lg font-bold mt-5">Cargando...</Text>
        </View>
      ) : (
        <>
          {/* Imagen del Logo */}
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
                source={require('../assets/logo.png')}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                }}
              />
            </View>
          </View>
  
          {/* Título de la pantalla */}
          <Text className="text-2xl font-bold text-center">{isRegistering ? 'Registro' : 'Iniciar Sesión'}</Text>
  
          {/* Campo de Nombre (solo para registro) */}
          {isRegistering && (
            <TextInput
              className="border p-3 mt-5 rounded w-full"
              placeholder="Tu Nombre"
              value={name}
              onChangeText={setName}
            />
          )}
  
          {/* Campo de Email */}
          <TextInput
            className="border p-3 mt-5 rounded w-full"
            placeholder="Tu Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
  
          {/* Campo de Contraseña */}
          <TextInput
            className="border p-3 mt-5 rounded w-full"
            placeholder="Tu Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
  
          {/* Campo de Confirmar Contraseña (solo para registro) */}
          {isRegistering && (
            <TextInput
              className="border p-3 mt-5 rounded w-full"
              placeholder="Confirmar Contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          )}
  
          {/* Botón de Login o Registro */}
          <TouchableOpacity
            className="bg-indigo-600 p-3 mt-5 rounded w-full"
            onPress={isRegistering ? handleRegister : handleLogin}
            disabled={loading}
          >
            <Text className="text-white text-center">{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</Text>
          </TouchableOpacity>
  
          {/* Enlace para alternar entre Login y Registro */}
          <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
            <Text className="text-center text-indigo-600 mt-5">
              {isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
  
};

export default LoginScreen;
