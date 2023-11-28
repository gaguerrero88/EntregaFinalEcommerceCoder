
const addToCart = async (productId,cartID)=>{
    await fetch (`/api/carts/${cartID}/product/${productId}`
    ,{method:'POST'})
}

const purchaseFromCart = async (cartID)=>{
    await fetch (`/api/carts/${cartID}/purchase`
    ,{method:'POST'})
}
