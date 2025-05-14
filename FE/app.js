let cart = [];

function addToCart(id, name, price) {
  const item = cart.find(product => product.id === id);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
}
