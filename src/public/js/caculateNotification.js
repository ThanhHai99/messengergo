function increaseNumberNotification(className) {
  let currentValue = +$(`.${className}`).text();
  currentValue += 1;

  if(currentValue ===0 ){
    $(`.${className}`).css("dislay", "none").html("");
  }else{
    $(`.${className}`).css("dislay", "block").html(currentValue);
  }
};

function decreaseNumberNotification(className) {
  let currentValue = +$(`.${className}`).text();
  currentValue -= 1;

  if(currentValue ===0 ){
    $(`.${className}`).css("dislay", "none").html("");
  }else{
    $(`.${className}`).css("dislay", "block").html(currentValue);
  }fin
};
