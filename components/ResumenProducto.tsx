import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useQuiosco from '../hooks/useQuiosco';
import { Producto as ProductoType } from '../types/types';

interface ResumenProductoProps {
  producto: ProductoType;
}

const ResumenProducto: React.FC<ResumenProductoProps> = ({ producto }) => {
  const { handleClickModal, handleSetProducto, handleEliminarProductoPedido  } = useQuiosco();

  // Función para abrir el modal y permitir la edición
  const editarProducto = () => {
    handleSetProducto(producto); // Seleccionamos el producto
    handleClickModal(); // Abrimos el modal
  };

  return (
    <View style={{ padding: 10, backgroundColor: 'white', marginVertical: 5, borderRadius: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{producto.nombre}</Text>
      <Text>Cantidad: {producto.cantidad}</Text>
      <Text>Precio: ${producto.precio.toFixed(2)}</Text>
      <Text>Subtotal: ${(producto.precio * producto.cantidad).toFixed(2)}</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <TouchableOpacity
          style={{ backgroundColor: '#1E40AF', padding: 10, borderRadius: 5 }}
          onPress={editarProducto} // Asegúrate de invocar la función correctamente
        >
          <Text style={{ color: 'white' }}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: '#DC2626', padding: 10, borderRadius: 5 }}
          onPress={() => handleEliminarProductoPedido(producto.id)}
        >
          <Text style={{ color: 'white' }}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResumenProducto;
