// Tipos para los objetos del Quiosco
export interface Categoria {
    id: number;
    nombre: string;
    icono: string;
  }
  
  export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imagen: string;
    categoria_id: number;
    cantidad: number;
  }
  
  export interface PedidoProducto extends Producto {
    cantidad: number;
  }
  