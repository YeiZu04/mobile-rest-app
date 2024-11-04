import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Animated,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur"; // Cambia la importación
import useQuiosco from "../hooks/useQuiosco";
import ResumenProducto from "../components/ResumenProducto"; // Componente del producto en resumen
import ModalProducto from "../components/ModalProducto";

const ResumenPedidoScreen = () => {
  const {
    pedido,
    total,
    handleSubmitNuevaOrden,
    producto,
    modal,
    handleClickModal,
  } = useQuiosco();
  const [loading, setLoading] = useState(false); // Estado para controlar la barra de carga
  const [pedidoEnviado, setPedidoEnviado] = useState(false); // Estado para controlar el mensaje de pedido enviado
  const progress = useRef(new Animated.Value(0)).current; // Valor de la animación de la barra de progreso

  // Función para confirmar el pedido
  const confirmarPedido = () => {
    setLoading(true); // Iniciar la barra de carga

    // Reiniciar animación de la barra de progreso
    Animated.timing(progress, {
      toValue: 1, // La barra se llenará hasta el final
      duration: 3000, // Duración de 3 segundos
      useNativeDriver: false, // Necesario porque estamos animando el ancho de una vista
    }).start(() => {
      // Después de 3 segundos, simular la confirmación del pedido
      handleSubmitNuevaOrden(); // Enviar el pedido
      setLoading(false); // Ocultar la barra de carga
      setPedidoEnviado(true); // Mostrar mensaje de éxito

      // Mostrar alerta con un retraso de 3 segundos
      setTimeout(() => {
        Alert.alert(
          "Pedido confirmado",
          "Tu pedido ha sido recibido en cocina"
        );
        setPedidoEnviado(false); // Reiniciar estado de pedido enviado
        progress.setValue(0); // Reiniciar la barra de progreso
      }, 1000);
    });
  };

  // Calcular el ancho de la barra de progreso en base al valor de la animación
  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Resumen de Pedido</Text>

      {pedido.length === 0 ? (
        <Text className="text-center">No hay productos en el pedido</Text>
      ) : (
        <>
          <FlatList
            data={pedido}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ResumenProducto producto={item} />} // Mostrar cada producto
          />

          <Text className="text-xl mt-5">Total: ${total.toFixed(2)}</Text>
          <TouchableOpacity
            className="bg-indigo-600 p-4 mt-5 rounded"
            onPress={confirmarPedido}
          >
            <Text className="text-white text-center font-bold">
              Confirmar Pedido
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* Mostrar desenfoque y barra de progreso cuando está enviando el pedido */}
      {loading && (
        <>
          <BlurView
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1,
            }}
            intensity={50} // Intensidad del desenfoque
            tint="light" // Tipo de desenfoque (light, dark)
          />

          <View
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [{ translateX: -100 }, { translateY: -25 }],
              width: 200,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation: 5,
              zIndex: 2, // Colocar la barra sobre el BlurView
            }}
          >
            <Text style={{ textAlign: "center", marginBottom: 10 }}>
              Enviando pedido...
            </Text>
            <View
              style={{
                height: 10,
                backgroundColor: "#e0e0e0",
                borderRadius: 5,
                overflow: "hidden",
                width: "100%",
              }}
            >
              <Animated.View
                style={{
                  height: 10,
                  backgroundColor: "#4caf50",
                  width: progressWidth,
                }}
              />
            </View>
          </View>
        </>
      )}

      {/* Modal para editar producto */}
      {producto && (
        <Modal
          visible={modal}
          animationType="slide"
          onRequestClose={handleClickModal}
        >
          <ModalProducto producto={producto} onClose={handleClickModal} />
        </Modal>
      )}
    </View>
  );
};

export default ResumenPedidoScreen;
