import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useQuiosco from '../hooks/useQuiosco';
import Producto from '../components/Producto';  
import ModalProducto from '../components/ModalProducto';  
import { Ionicons } from '@expo/vector-icons';  
import { Producto as ProductoType, Categoria as CategoriaType } from '../types/types'; 

const HomeScreen = ({ navigation, setIsAuthenticated }) => {  
  const { categorias, handleClickCategoria, categoriaActual, pedido } = useQuiosco();
  const [productos, setProductos] = useState<ProductoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductoType | null>(null);

  // Obtener los productos
  useEffect(() => {
    const fetchProductos = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('AUTH_TOKEN');
        const response = await axios.get('http://209.50.54.241/api/productos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductos(response.data.data);
        setIsLoading(false);
      } catch (error: any) {
        console.log('Error al obtener productos:', error.message);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Abrir el modal
  const abrirModal = useCallback((producto: ProductoType) => {
    setProductoSeleccionado(producto);
    setModalVisible(true);
  }, []);

  // Cerrar el modal
  const cerrarModal = useCallback(() => {
    setModalVisible(false);
    setProductoSeleccionado(null);
  }, []);

   // Función de logout
   const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('AUTH_TOKEN');
      Alert.alert('Cierre de sesión', 'Has cerrado sesión correctamente.');
      setIsAuthenticated(false);  // Cambiar el estado a deslogueado
      navigation.navigate('Login');  // Navegar a la pantalla de inicio de sesión
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al cerrar sesión.');
    }
  };

  if (isLoading) return <Text style={styles.centerText}>Cargando productos...</Text>;
  if (error) return <Text style={styles.centerText}>Error al cargar productos: {error}</Text>;

  const productosFiltrados = productos.filter(
    (producto: ProductoType) => producto.categoria_id === categoriaActual?.id
  );

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header con ícono del carrito y logout */}
      <View className="flex-row justify-between items-center p-4 bg-white">
        <Text className="text-xl font-bold">Categorías</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('ResumenPedido')} style={{ marginRight: 20 }}>
            <Ionicons name="cart-outline" size={28} color="black" />
            {pedido.length > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{pedido.length}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista horizontal de categorías */}
      <View className="p-4">
        <Text className="text-xl font-bold mb-2">Selecciona una Categoría</Text>
        <FlatList
          horizontal
          data={categorias}
          keyExtractor={(item: CategoriaType) => item.id.toString()}
          renderItem={({ item }: { item: CategoriaType }) => (
            <TouchableOpacity
              className={`p-4 mr-2 rounded-lg items-center ${
                item.id === categoriaActual?.id ? 'bg-indigo-600' : 'bg-white'
              }`}
              onPress={() => handleClickCategoria(item.id)}
            >
              <Text
                className={`${
                  item.id === categoriaActual?.id ? 'text-white' : 'text-black'
                }`}
              >
                {item.nombre}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Lista de productos filtrados */}
      <View className="p-4 flex-1">
        <Text className="text-xl font-bold mb-2">Productos</Text>
        {productosFiltrados.length > 0 ? (
          <FlatList
            data={productosFiltrados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Producto producto={item} botonAgregar={true} onAgregar={() => abrirModal(item)} />
            )}
          />
        ) : (
          <Text style={styles.centerText}>No hay productos disponibles</Text>
        )}
      </View>

      {/* Modal para agregar productos */}
      {productoSeleccionado && (
        <Modal visible={modalVisible} animationType="slide" onRequestClose={cerrarModal}>
          <ModalProducto producto={productoSeleccionado} onClose={cerrarModal} />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
