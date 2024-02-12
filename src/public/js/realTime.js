const socketClient = io();
const productList = document.getElementById("produclist");
const productForm = document.getElementById("creatProductForm");

document.addEventListener("DOMContentLoaded", () => {
  const createProductForm = document.getElementById("creatProductForm");

  createProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(createProductForm);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData, // Utilizar FormData directamente como cuerpo de la solicitud
      });

      if (!response.ok) {
        throw new Error(`¡Error HTTP! Estado: ${response.status}`);
      }
      socketClient.emit("addProduct", formData);
      // Limpiar el formulario después de enviar los datos
      createProductForm.reset();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  });
});

socketClient.on("productsArray", (data) => {
  let productsElements = "";
  data.forEach((element) => {
    productsElements += `<ul>
    <li> Nombre del producto: ${element.title}</li>
    <li> Descripción: ${element.description}</li>
    <button onclick="deleteProduct('${element._id}')">Eliminar Producto</button>
    </ul>`;
  });
  productList.innerHTML = productsElements;
});

const deleteProduct = async (productID) => {
  try {
    const response = await fetch(`/api/products/${productID}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    alert(data.message);
    if (!response.ok) {
      throw new Error(`¡Error HTTP! Estado: ${response.status}`);
    }
    socketClient.emit("addProduct");
  } catch (error) {
    console.error('Error al enviar el id:', error);
  }
  
};
