export const formatearDinero = (cantidad: number) => {
    return cantidad.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
    });
  };
  