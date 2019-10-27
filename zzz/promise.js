let sum = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != "number" || typeof b != "number") {
        return reject("Gia tri truyen vap phai la number");
      }
      resolve(a + b);
    }, 100);
  });
};


sum(1, 2)
  .then(total1 => sum(total1, 10))
  .then(total2 => sum(total2, 10))
  .then(total3 => sum(total3, 10))
  .then(total => console.log(total))
  .catch(err => console.log(err));
