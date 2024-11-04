import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getImagePath } from '../utils/images'; // Utilidad para obtener la ruta de la imagen
import useQuiosco from '../hooks/useQuiosco';
import { Producto as ProductoType } from '../types/types'; // Importamos el tipo Producto

interface ModalProductoProps {
  producto: ProductoType;
  onClose: () => void;
}

const ModalProducto: React.FC<ModalProductoProps> = ({ producto, onClose }) => {
  const [cantidad, setCantidad] = useState(1);
  const { handleAgregarPedido } = useQuiosco();

  const imagePath = getImagePath(producto.imagen);

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Image
        source={imagePath}
        style={{ width: 200, height: 200 }}
      />
      <Text className="text-3xl font-bold mt-4">{producto.nombre}</Text>
      <Text className="text-amber-500 text-5xl font-bold mt-2">${producto.precio}</Text>

      {/* Botones para aumentar o disminuir la cantidad */}
      <View className="flex-row items-center mt-4">
        <TouchableOpacity
          onPress={() => setCantidad(Math.max(1, cantidad - 1))}
          className="p-2 border rounded"
        >
          <Text className="text-2xl">-</Text>
        </TouchableOpacity>
        <Text className="text-3xl mx-4">{cantidad}</Text>
        <TouchableOpacity
          onPress={() => setCantidad(Math.min(5, cantidad + 1))}
          className="p-2 border rounded"
        >
          <Text className="text-2xl">+</Text>
        </TouchableOpacity>
      </View>

      {/* Botón para agregar el producto */}
      <TouchableOpacity
        className="bg-indigo-600 p-4 rounded mt-4 w-full"
        onPress={() => {
          handleAgregarPedido({ ...producto, cantidad });
          onClose();
        }}
      >
        <Text className="text-center text-white text-xl">Agregar al Pedido</Text>
      </TouchableOpacity>

      {/* Botón para cerrar el modal */}
      <TouchableOpacity
        className="mt-4"
        onPress={onClose}
      >
        <Text className="text-red-600 text-lg">Cerrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalProducto;
