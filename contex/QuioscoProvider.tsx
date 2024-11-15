import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Categoria, Producto, PedidoProducto } from '../types/types'; // Importamos los tipos

// Definir la interfaz del contexto
interface QuioscoContextProps {
  categorias: Categoria[];
  categoriaActual: Categoria | null;
  modal: boolean;
  producto: Producto | null;
  pedido: PedidoProducto[];
  total: number;
  handleClickCategoria: (id: number) => void;
  handleClickModal: () => void;
  handleSetProducto: (producto: Producto) => void;
  handleAgregarPedido: (producto: PedidoProducto) => void;
  handleEliminarProductoPedido: (id: number) => void;
  handleSubmitNuevaOrden: () => Promise<void>;
}

// Crear el contexto con el tipo definido
const QuioscoContext = createContext<QuioscoContextProps | undefined>(undefined);

// Crear el proveedor
export const QuioscoProvider = ({ children, isAuthenticated }: { children: ReactNode, isAuthenticated: boolean }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaActual, setCategoriaActual] = useState<Categoria | null>(null);
  const [modal, setModal] = useState(false);
  const [producto, setProducto] = useState<Producto | null>(null);
  const [pedido, setPedido] = useState<PedidoProducto[]>([]);
  const [total, setTotal] = useState(0);

  // Calcular el total del pedido
  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

  // Obtener categorías desde la API
  const obtenerCategorias = async () => {
    try {
      const token = await AsyncStorage.getItem("AUTH_TOKEN");
      if (!token) {
        console.log("Token de autenticación no encontrado");
        return; // Evita la llamada si no hay token
      }
  
      const { data } = await axios.get("http://209.50.54.18/api/categorias", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategorias(data.data);
      setCategoriaActual(data.data[0]); // Seleccionar la primera categoría por defecto
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };
  
  useEffect(() => {
    obtenerCategorias();
  }, [isAuthenticated]); // Ejecución solo si el usuario está autenticado
  

  // Manejar la selección de categoría
  const handleClickCategoria = (id: number) => {
    const categoria = categorias.find((categoria) => categoria.id === id) || null;
    setCategoriaActual(categoria);
  };

  // Manejar el estado del modal
  const handleClickModal = () => {
    setModal(!modal);
  };

  // Manejar la selección de producto
  const handleSetProducto = (producto: Producto) => {
    setProducto(producto);
  };

  // Agregar un producto al pedido
  const handleAgregarPedido = (producto: PedidoProducto) => {
    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
      const pedidoActualizado = pedido.map((pedidoState) =>
        pedidoState.id === producto.id ? producto : pedidoState
      );
      setPedido(pedidoActualizado);
    } else {
      setPedido([...pedido, producto]);
    }
  };

  // Eliminar un producto del pedido
  const handleEliminarProductoPedido = (id: number) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
  };

  const handleSubmitNuevaOrden = async () => {
    const token = await AsyncStorage.getItem('AUTH_TOKEN');
  
    try {
      const response = await axios.post('http://209.50.54.18/api/pedidos', {
        productos: pedido.map((prod) => ({
          id: prod.id,
          cantidad: prod.cantidad,
        })),
        total,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log('Respuesta del servidor:', response.data);
  
      // Resetear el pedido después de enviar
      setPedido([]);
    } catch (error) {
      console.log('Error al enviar el pedido:', error);
    }
  };
  
  // Definir el valor del contexto
  const value = {
    categorias,
    categoriaActual,
    modal,
    producto,
    pedido,
    total,
    handleClickCategoria,
    handleClickModal,
    handleSetProducto,
    handleAgregarPedido,
    handleEliminarProductoPedido,
    handleSubmitNuevaOrden,
  };

  // Proveer el contexto a los hijos
  return <QuioscoContext.Provider value={value}>{children}</QuioscoContext.Provider>;
};

export default QuioscoContext;
