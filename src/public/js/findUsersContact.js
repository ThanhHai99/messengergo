$(document).ready(() => {
  let callFindUsers = function() {
    let keyword = $("#input-find-users-contact").val();
    $.get(`/contact/find-users/${keyword}`, function(data){
      $(".contactList", "div#find-user").html("");
      $(".contactList", "div#find-user").html(data);
      addContact(); // js/addContact.js
      removeRequestContactSent(); // js/removeRequestContactSent.js
    });
  };
  
  $("#input-find-users-contact").unbind("keyup").on("keyup", function() {
    if($("#input-find-users-contact").val()){
      callFindUsers();
    }
    else {
      $(".contactList", "div#find-user").html("");
    }
  });
  
  $("#btn-find-users-contact").unbind("click").on("click", function() {
    if($("#input-find-users-contact").val()){
      callFindUsers();
    }
    else{
      $(".contactList", "div#find-user").html("");
      alertify.notify("Nhập vào tên người dùng để tìm kiếm!", "error", 5);
    }
  });
});
