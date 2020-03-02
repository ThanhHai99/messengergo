let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;
let originUserInfo = {};
let userUpdatePassword = {};

function callLogout() {
	let timerInterval;
	Swal.fire({
		position: 'top-end',
		title: 'Tự động đăng xuất sau 5 giây.',
		html:"Thời gian <strong></strong>",
		showConfirmButton: false,
		timer: 5000,
		onBeforeOpen: () => {
			Swal.showLoading();
			timerInterval = setInterval(() => {
				Swal.getContent().querySelector("strong").textContent = Math.ceil( Swal.getTimerLeft() / 1000 );
			}, 1000);
		},
		onClose: () => {
			clearInterval(timerInterval);
		} 
	}).then((result) => {
		$.get("/logout" , function () {
			location.reload();
		});
	});
};

function updateUserInfo() {
  $("#input-change-avatar").bind("change", function() {
    let fileData = $(this).prop("files")[0];
    let math = ["image/png", "image/jpg", "image/jpeg"];
    let limit = 1048576; //byte = 1MB

    if ($.inArray(fileData.type, math) === -1) { //Khong khop voi bat ki phan tu nao trong mang math[]
      alertify.notify("Kieu file khong hop le, chi cho phep file jpg & png.", "error", 7);
      $(this).val(null);
      return false;
    }
    if (fileData.size > limit) {
      alertify.notify("Chi cho phep anh duoi 1MB.", "error", 7);
      $(this).val(null);
      return false;
    }

    if (typeof (FileReader) != "undefined"){
      let imagePreview = $("#image-edit-profile");
      imagePreview.empty();

      let fileReader = new FileReader();
      fileReader.onload = function(element) {
        $("<img>", {
          "src": element.target.result,
          "class": "avatar img-circle",
          "id": "user-modal-avatar",
          "alt": "avatar"
        }).appendTo(imagePreview);
      }
      imagePreview.show();
      fileReader.readAsDataURL(fileData);

      let formData = new FormData();
      formData.append("avatar", fileData);

      userAvatar = formData;
    } else {
      alertify.notify("Trinh duyet cua ban khong ho tro fileReader", "error", 7);
    }
  });

  $("#input-change-username").bind("change", function() {
		let username = $(this).val();
		let regexUsername = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);
		
		if(!regexUsername.test(username) || username.length<3 || username.length>17){
			alertify.notify("Username gioi han trong khoang 3-17 ky tu khong chua ky tu dac biet.", "error", 7);
			$(this).val(originUserInfo.username);
			delete userInfo.username;
			return false;
		}
		
		userInfo.username = username;
  });

  $("#input-change-gender-male").bind("click", function() {
		let gender = $(this).val();

		if(gender !== "male") {
			alertify.notify("Oops! Wow bạn là hacker à!!!", "error", 7);
			$(this).val(originUserInfo.gender);
			delete userInfo.gender;
			return false;
		}

		userInfo.gender = gender;
  });

  $("#input-change-gender-female").bind("click", function() {
		let gender = $(this).val();

		if(gender !== "female") {
			alertify.notify("Oops! Wow bạn là hacker à!!!", "error", 7);
			$(this).val(originUserInfo.gender);
			delete userInfo.gender;
			return false;
		}
		userInfo.gender = $(this).val();
  });

  $("#input-change-address").bind("change", function() {
		let address = $(this).val();

		if(address.length <3 || address.length >30) {
			alertify.notify("Địa chỉ giới hạn 3-30 ký tự.", "error", 7);
			$(this).val(originUserInfo.address);
			delete userInfo.address;
			return false;
		}

		userInfo.address = address;
  });

  $("#input-change-phone").bind("change", function() {
		let phone = $(this).val();
		let regexPhone = new RegExp(/^(0)[0-9]{9,10}$/);
		if(!regexPhone.test(phone)){
			alertify.notify("Số điện thoại bắt đầu bằng số 0, giới hạn khoảng 10-11 ký tự.", "error", 7);
			$(this).val(originUserInfo.phone);
			delete userInfo.phone;
			return false;
		}

		userInfo.phone = phone;
	});
	
	$("#input-change-current-password").bind("change", function() {
		let currentPassword = $(this).val();
		let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);
		if(!regexPassword.test(currentPassword)){
			alertify.notify("Mật khẩu không hợp lệ.", "error", 7);
			$(this).val(null);
			delete userUpdatePassword.currentPassword;
			return false;
		}

		userUpdatePassword.currentPassword = currentPassword;
	});

	$("#input-change-new-password").bind("change", function() {
		let newPassword = $(this).val();
		let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);
		if(!regexPassword.test(newPassword)){
			alertify.notify("Mật khẩu mớikhông hợp lệ.", "error", 7);
			$(this).val(null);
			delete userUpdatePassword.newPassword;
			return false;
		}

		userUpdatePassword.newPassword = newPassword;
	});

	$("#input-change-confirm-new-password").bind("change", function() {
		let confirmNewPassword = $(this).val();
		
		if(!userUpdatePassword.newPassword){
			alertify.notify("Chưa nhập mật khẩu mới.", "error", 7);
			$(this).val(null);
			delete userUpdatePassword.confirmNewPassword;
			return false;
		}
		if(confirmNewPassword !== userUpdatePassword.newPassword){
			alertify.notify("Nhập lại mật khẩu mới không đúng.", "error", 7);
			$(this).val(null);
			delete userUpdatePassword.confirmNewPassword;
			return false;
		}

		userUpdatePassword.confirmNewPassword = confirmNewPassword;
	});
}

function callUpdateUserAvatar() {
	$.ajax({
		url: "/user/update-avatar",
		type: "put", //method when use ajax
		cache: false,
		contentType: false,
		processData: false,
		data: userAvatar,
		success: function(result) {
			// Display success
			$(".user-modal-alert-success").find("span").text(result.message);
			$(".user-modal-alert-success").css("display", "block");

			// Update avatar at navbar
			$("#navbar-avatar").attr("src", result.imageSrc);

			// update origin avatar src
			originAvatarSrc = result.imageSrc;

			// Reset all
			$("#input-btn-cancel-update-user").click();
		 },
		error: function(error) { 
			// Display error
			$(".user-modal-alert-error").find("span").text(error.responseText);
			$(".user-modal-alert-error").css("display", "block");

			// Reset all
			$("#input-btn-cancel-update-user").click();      
		}
	});
};

function callUpdateUserInfo() {
	$.ajax({
		url: "/user/update-info",
		type: "put", //khi update data
		data: userInfo,
		success: function(result) {
			// Display success
			$(".user-modal-alert-success").find("span").text(result.message);
			$(".user-modal-alert-success").css("display", "block");

			//upadte origin user info
			originUserInfo = Object.assign(originUserInfo, userInfo);

			//update username at navbar
			$("#navbar-username").text(originUserInfo.username);

			// Reset all
			$("#input-btn-cancel-update-user").click();
		 },
		error: function(error) { 
			// Display error
			$(".user-modal-alert-error").find("span").text(error.responseText);
			$(".user-modal-alert-error").css("display", "block");

			// Reset all
			$("#input-btn-cancel-update-user").click();      
		}
	});
};

function callUpdateUserPassword() {
	$.ajax({
		url: "/user/update-password",
		type: "put", //khi update data
		data: userUpdatePassword,
		success: function(result) {
			// Display success
			$(".user-modal-password-alert-success").find("span").text(result.message);
			$(".user-modal-password-alert-success").css("display", "block");

			// Reset all
			$("#input-btn-cancel-update-user").click();

			//Logout after change password success
			callLogout();
			
		 },
		error: function(error) { 
			// Display error
			$(".user-modal-password-alert-error").find("span").text(error.responseText);
			$(".user-modal-password-alert-error").css("display", "block");

			// Reset all
			$("#input-btn-cancel-update-user").click();

		}
	});
};

$(document).ready(function () {
	//get values origin to set for that input when appear error
	originAvatarSrc = $("#user-modal-avatar").attr("src");
	originUserInfo = {
		username: $("#input-change-username").val(),
		gender: ($("#input-change-gender-male").is(":checked")) ? $("#input-change-gender-male").val() : $("#input-change-gender-female").val() ,
		address: $("#input-change-address").val(),
		phone: $("#input-change-phone").val()
	};
	
	//update user info after change value to update
	updateUserInfo();

  $("#input-btn-update-user").bind("click", function() {
    if ($.isEmptyObject(userInfo) && !userAvatar){
      alertify.notify("Ban phai thay doi thong tin truoc khi cap nhat du lieu", "error", 7);
      return false;
		}
		if(userAvatar){
			callUpdateUserAvatar();
		}
		if(!$.isEmptyObject(userInfo)){
			callUpdateUserInfo();
		}
  });

  $("#input-btn-cancel-update-user").bind("click", function() {
    userAvatar = null;
		userInfo = {};
		
    $("#input-change-avatar").val(null);
		$("#user-modal-avatar").attr("src", originAvatarSrc);
		
		$("#input-change-username").val(originUserInfo.username);
		(originUserInfo.gender === "male") ? $("#input-change-gender-male").click() : $("#input-change-gender-female").click();
		$("#input-change-address").val(originUserInfo.address);
		$("#input-change-phone").val(originUserInfo.phone);
  });

  $("#input-btn-update-user-password").bind("click", function() {
		if(!userUpdatePassword.currentPassword || !userUpdatePassword.newPassword || !userUpdatePassword.confirmNewPassword){
			alertify.notify("Ban phai thay doi day du thong tin", "error", 7);
			return false;
		}
		Swal.fire({
			title: "Bạn có chắc chắn thay đổi mật khẩu không?",
			text: "Bạn không thể hoàn tác lại quá trình này!",
			icon: "info",
			showCancelButton: true,
			confirmButtonColor: "#2ECC71",
			cancelButtonColor: "#ff7675",
			confirmButtonText: "Xác nhận",
			cancelButtonText: "Hủy"
		}).then((result) => {
			if (!result.value) {
				$("#input-btn-cancel-update-user-password").click();
				return false;
			}
			callUpdateUserPassword();
		});
	});

  $("#input-btn-cancel-update-user-password").bind("click", function() {
		userUpdatePassword = {};
		$("#input-change-current-password").val(null);
		$("#input-change-new-password").val(null);
		$("#input-change-confirm-new-password").val(null);
	});
});
