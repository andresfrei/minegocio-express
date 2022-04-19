const types = [
  { id: 1, description: "Compra", payment: -1, stock: 1 },
  { id: 2, description: "Venta", payment: 1, stock: -1 },
  { id: 3, description: "Transferencia", payment: 1, stock: 1 },
  { id: 4, description: "Transferencia", payment: -1, stock: -1 },
  { id: 5, description: "Ajuste", payment: 1, stock: 1 },
  { id: 6, description: "Gasto", payment: -1, stock: -1 },
];

function getTypes() {
  return types;
}
function getTypeById(id) {
  return types.find((i) => i.id === id);
}

module.exports = { getTypes, getTypeById };
