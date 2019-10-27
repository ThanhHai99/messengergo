let sum = (a, b) => {
  return new Promise((resolve, reject) => {
    if (typeof a != "number" || typeof b != "number") {
      return reject("Gia tri truyen vap phai la number");
    }
    resolve(a + b);
  });
};

(async () => {
  try {
    let total1 = await sum(1, 2);
    let total2 = await sum(total1, 10);
    let total3 = await sum(total2, 10);
    let total4 = await sum(total3, 10);
    console.log(total4);
  } catch (error) {
    console.log(error);
  }
})();

//getTotal();
