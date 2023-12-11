export const OrderRingCounter = (ordersUser) => {
  let inoxOrder: [][] = [[], []];
  let uniqueInoxOrder = [[], []];
  let indexArrayInox = [];
  let colorOrder: [][] = [[], []];
  let uniqueColorOrder = [[], []];
  let indexArrayColor = [];

  ordersUser.forEach((order) => {
    order.attributes.color_ring.forEach((color) => {
      colorOrder[0].push(color.size);
      colorOrder[1].push(color.amount);
    });
  });

  ordersUser.forEach((order) => {
    order.attributes.inox_ring.forEach((inox) => {
      inoxOrder[0].push(inox.size);
      inoxOrder[1].push(inox.amount);
    });
  });

  inoxOrder[0].forEach((inox, index) => {
    if (uniqueInoxOrder[0].includes(inox)) {
      const i = uniqueInoxOrder[0].indexOf(inox);
      indexArrayInox.push(i, index);
    }
    if (!uniqueInoxOrder[0].includes(inox)) {
      uniqueInoxOrder[0].push(inox);
    }
  });

  colorOrder[0].forEach((color, index) => {
    if (uniqueColorOrder[0].includes(color)) {
      const i = uniqueColorOrder[0].indexOf(color);
      indexArrayColor.push(i, index);
    }
    if (!uniqueColorOrder[0].includes(color)) {
      uniqueColorOrder[0].push(color);
    }
  });

  indexArrayInox.forEach((element, index) => {
    if (index % 2 !== 0) {
      return;
    }
    const amount =
      inoxOrder[1][element] + inoxOrder[1][indexArrayInox[index + 1]];
    inoxOrder[1][indexArrayInox[index + 1]] = amount;
    inoxOrder[1][element] = 0;
    inoxOrder[0][element] = 0;
  });

  indexArrayColor.forEach((element, index) => {
    if (index % 2 !== 0) {
      return;
    }
    const amount =
      colorOrder[1][element] + colorOrder[1][indexArrayColor[index + 1]];
    colorOrder[1][indexArrayColor[index + 1]] = amount;
    colorOrder[1][element] = 0;
    colorOrder[0][element] = 0;
  });

  colorOrder = colorOrder.map((row) => row.filter((element) => element !== 0));
  inoxOrder = inoxOrder.map((row) => row.filter((element) => element !== 0));
  return { colorOrder, inoxOrder };
};
