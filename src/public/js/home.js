const addToCart = async (productId, cartID) => {
  await fetch(`/api/carts/${cartID}/product/${productId}`, { method: "POST" });
};

const purchaseFromCart = async (cartID) => {
  try{
 const response =  await fetch(`/api/carts/${cartID}/purchase`, { method: "POST" });
 const data = await response.json();
 alert(data.message);
 window.location.reload();
} catch (error) {
 console.error('Hubo un error:', error);
 alert('Hubo un error en la compra del carrito');
}
};

const modifyRole = async (userID) => {
  try {
    const response = await fetch(`/api/users/premium/${userID}`, { method: "PUT" });
    const data = await response.json();
    alert(data.message);
    window.location.reload();
  } catch (error) {
    console.error('Hubo un error:', error);
    alert('Hubo un error al modificar el rol del usuario');
  }
};

const deleteUser = async (userID) => {
  try {
  const response = await fetch(`/api/users/premium/${userID}`, { method: "DELETE" });
  const data = await response.json();
  alert(data.message);
  window.location.reload()
  }
  catch (error) {
    console.error('Hubo un error:', error);
    alert('Hubo un error al eliminar el usuario');
  }
};

const deleteFromCart = async (button) => {
  const prodID = button.getAttribute('data-product-id');
  const cartID = button.getAttribute('data-cart-id');
  await fetch(`/api/carts/${cartID}/product/${prodID}`, { method: "DELETE" });
  window.location.reload();
};

const EmptyCart = async (cartID) => {
  try{
 const response =  await fetch(`/api/carts/${cartID}`, { method: "DELETE" });
 const data = await response.json();
 alert(data.message);
 window.location.reload();
} catch (error) {
 console.error('Hubo un error:', error);
 alert('Hubo un error al querer vaciar su carrito');
}
};