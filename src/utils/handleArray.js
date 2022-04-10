function groupBy({ data, fieldAgrup }) {
  let list = [];
  for (let index in data) {
    const item = data[index];
    const resul = item[fieldAgrup];
    if (list.indexOf(resul) === -1) {
      list.push(resul);
    }
  }
  return list;
}

module.exports = { groupBy };
