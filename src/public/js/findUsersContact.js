let keyword = null;
let callFindUsers = () => {
  $.ajax({
		url: `/contact/find-users/${keyword}`,
    type: "get",
    data: {},
    dataType: 'json',
		success: function(result) {
      console.log("result = " + result.responseText);
			// Dislay success
			// $(".user-modal-alert-success").find("span").text(result.message);
			// $(".user-modal-alert-success").css("display", "block");

			//upadte origin user info
			// originUserInfo = Object.assign(originUserInfo, userInfo);

			//update username at navbar
			// $("#navbar-username").text(originUserInfo.username);
		 },
		error: function(error) { 
      $(".contactList").html("");
			$(".contactList").prepend(error.responseText);
      // $(".user-remove-request-contact").css("display", "block");
		}
	});
};

$(document).ready(() => {
  $("#input-find-users-contact").bind("keyup", () => {
    keyword = $("#input-find-users-contact").val();
    if(keyword){
      callFindUsers();
    }
  });
  
  $("#btn-find-users-contact").bind("click", () => {
    keyword = $("#input-find-users-contact").val();
    if(keyword){
      callFindUsers();
    }
    else{
      alertify.notify("Nhập vào tên người dùng để tìm kiếm!", "error", 5);
    }
  });
});
