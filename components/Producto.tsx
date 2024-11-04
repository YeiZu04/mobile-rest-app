import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getImagePath } from '../utils/images'; // Importamos la función de utilidades
import useQuiosco from '../hooks/useQuiosco';
import { Producto as ProductoType } from '../types/types'; // Importamos el tipo de Producto

interface ProductoProps {
  producto: ProductoType;
  botonAgregar?: boolean;
  botonDisponible?: boolean;
  onAgregar: ()=>void;
}

const Producto: React.FC<ProductoProps> = ({ producto, botonAgregar = false, botonDisponible = false, onAgregar }) => {
  const { handleClickModal, handleSetProducto } = useQuiosco();

  // Obtenemos la ruta de la imagen usando la función getImagePath
  const imagePath = getImagePath(producto.imagen);

  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, // Esto es para Android (sombra)
      }}
    >
      {/* Usa la ruta de la imagen obtenida */}
      <Image
        source={imagePath}
        style={{
          width: '100%',
          height: 220,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{producto.nombre}</Text>
        <Text style={{ marginTop: 10, fontSize: 30, fontWeight: 'bold', color: '#FFA500' }}>
          ${producto.precio}
        </Text>

        {botonAgregar && (
          <TouchableOpacity
          style={{
            backgroundColor: '#4F46E5',
            padding: 10,
            borderRadius: 5,
            marginTop: 15,
          }}
          onPress={onAgregar} // Llamamos la función al presionar el botón
        >
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Agregar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Producto;
