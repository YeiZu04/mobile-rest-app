// utils.ts o en otro archivo que prefieras
export const getImagePath = (imageName: string): any => {
    const imageMap: { [key: string]: any } = {
      // Café
      'cafe_01': require('../assets/img/cafe_01.jpg'),
      'cafe_02': require('../assets/img/cafe_02.jpg'),
      'cafe_03': require('../assets/img/cafe_03.jpg'),
      'cafe_04': require('../assets/img/cafe_04.jpg'),
      'cafe_05': require('../assets/img/cafe_05.jpg'),
      'cafe_06': require('../assets/img/cafe_06.jpg'),
      'cafe_07': require('../assets/img/cafe_07.jpg'),
      'cafe_08': require('../assets/img/cafe_08.jpg'),
      'cafe_09': require('../assets/img/cafe_09.jpg'),
      'cafe_10': require('../assets/img/cafe_10.jpg'),
      'cafe_11': require('../assets/img/cafe_11.jpg'),
      'cafe_12': require('../assets/img/cafe_12.jpg'),
      'cafe_13': require('../assets/img/cafe_13.jpg'),
      'cafe_14': require('../assets/img/cafe_14.jpg'),
  
      // Donas
      'donas_01': require('../assets/img/donas_01.jpg'),
      'donas_02': require('../assets/img/donas_02.jpg'),
      'donas_03': require('../assets/img/donas_03.jpg'),
      'donas_04': require('../assets/img/donas_04.jpg'),
      'donas_05': require('../assets/img/donas_05.jpg'),
      'donas_06': require('../assets/img/donas_06.jpg'),
      'donas_07': require('../assets/img/donas_07.jpg'),
      'donas_08': require('../assets/img/donas_08.jpg'),
      'donas_09': require('../assets/img/donas_09.jpg'),
      'donas_10': require('../assets/img/donas_10.jpg'),
      'donas_11': require('../assets/img/donas_11.jpg'),
      'donas_12': require('../assets/img/donas_12.jpg'),
      'donas_13': require('../assets/img/donas_13.jpg'),
      'donas_14': require('../assets/img/donas_14.jpg'),
  
      // Galletas
      'galletas_01': require('../assets/img/galletas_01.jpg'),
      'galletas_02': require('../assets/img/galletas_02.jpg'),
      'galletas_03': require('../assets/img/galletas_03.jpg'),
      'galletas_04': require('../assets/img/galletas_04.jpg'),
      'galletas_05': require('../assets/img/galletas_05.jpg'),
      'galletas_06': require('../assets/img/galletas_06.jpg'),
  
      // Hamburguesas
      'hamburguesas_01': require('../assets/img/hamburguesas_01.jpg'),
      'hamburguesas_02': require('../assets/img/hamburguesas_02.jpg'),
      'hamburguesas_03': require('../assets/img/hamburguesas_03.jpg'),
      'hamburguesas_04': require('../assets/img/hamburguesas_04.jpg'),
      'hamburguesas_05': require('../assets/img/hamburguesas_05.jpg'),
      'hamburguesas_06': require('../assets/img/hamburguesas_06.jpg'),
      'hamburguesas_07': require('../assets/img/hamburguesas_07.jpg'),
      'hamburguesas_08': require('../assets/img/hamburguesas_08.jpg'),
  
      // Pizzas
      'pizzas_01': require('../assets/img/pizzas_01.jpg'),
      'pizzas_02': require('../assets/img/pizzas_02.jpg'),
      'pizzas_03': require('../assets/img/pizzas_03.jpg'),
      'pizzas_04': require('../assets/img/pizzas_04.jpg'),
      'pizzas_05': require('../assets/img/pizzas_05.jpg'),
      'pizzas_06': require('../assets/img/pizzas_06.jpg'),
      'pizzas_07': require('../assets/img/pizzas_07.jpg'),
      'pizzas_08': require('../assets/img/pizzas_08.jpg'),
      'pizzas_09': require('../assets/img/pizzas_09.jpg'),
      'pizzas_10': require('../assets/img/pizzas_10.jpg'),
      'pizzas_11': require('../assets/img/pizzas_11.jpg'),
  
      // Pasteles
      'pastel_01': require('../assets/img/pastel_01.jpg'),
      'pastel_02': require('../assets/img/pastel_02.jpg'),
      'pastel_03': require('../assets/img/pastel_03.jpg'),
      'pastel_04': require('../assets/img/pastel_04.jpg'),
      'pastel_05': require('../assets/img/pastel_05.jpg'),
      'pastel_06': require('../assets/img/pastel_06.jpg'),
  
      // Si no encuentra la imagen, retorna una imagen por defecto
      'default': require('../assets/img/default.jpg'),
    };
  
    return imageMap[imageName] || imageMap['default'];
  };
  