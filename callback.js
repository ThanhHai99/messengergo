let sum = (a, b, callback) => {
  setTimeout(() => {
    let error, result;
    if (typeof a != "number" || typeof b != "number") {
      error = "Gia tir truyen vap phai la number";
      return callback(error, null);
    }
    result = a + b;
    return callback(null, result);
  }, 2000);
};

sum(1, 2, (error, total1) => {
  if (error) {
    console.log(error);
    return;
  }
  sum(total1, 10, (error, total2) => {
    if (error) {
      console.log(error);
      return;
    }
    sum(total2, 10, (error, total3) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(total3);
    });
  });
});
