let callFindUsers = () => {
  let keyword = $("#input-find-users-contact").val();

  // if(!regexKeyword.test(keyword)) {
  //   alertify.notify("Loi tu khoa tim kiem, chi cho phep ky tu chu cai va so, cho phep khoang trong", "error", 5);
  //   return false;
  // }

  
  $.get(`/contact/find-users/${keyword}`, function (data) {
    $("#find-user ul").html(data);
    addContact();
    removeRequestContact();
  });
  
};

$(document).ready(function () {
  $("#input-find-users-contact").bind("keypress", callFindUsers);
  $("#btn-find-users-contact").bind("click", callFindUsers);
})
