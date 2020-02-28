let keyword = null;
let callFindUsers = () => {
  $.get(`/contact/find-users/${keyword}`, function(data){
    $(".contactList").html("");
		// $(".contactList").prepend(data);
    $(".contactList").html(data);
    addContact(); // js/addContact.js
    removeRequestContact(); // js/removeRequestContact.js
  });
};

$(document).ready(() => {
  $("#input-find-users-contact").bind("keyup", () => {
    keyword = $("#input-find-users-contact").val();
    if(keyword){
      callFindUsers();
    }
    else {
      $(".contactList").html("");
    }
  });
  
  $("#btn-find-users-contact").bind("click", () => {
    keyword = $("#input-find-users-contact").val();
    if(keyword){
      callFindUsers();
    }
    else{
      $(".contactList").html("");
      alertify.notify("Nhập vào tên người dùng để tìm kiếm!", "error", 5);
    }
  });
});
