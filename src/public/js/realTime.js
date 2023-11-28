const socketClient = io();

const proudctlist = document.getElementById("produclist");
const proudctForm = document.getElementById("creatProductForm");

proudctForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(proudctForm);
  const jsonData = {};
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }
  jsonData.price = parseInt(jsonData.price);
  jsonData.stock = parseInt(jsonData.stock);
  jsonData.thumbnails = jsonData.thumbnails.name;
  socketClient.emit("addProduct", jsonData);
  proudctForm.reset();
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
  proudctlist.innerHTML = productsElements;
});

const deleteProduct = (productID) => {
  socketClient.emit("productID", productID);
};
