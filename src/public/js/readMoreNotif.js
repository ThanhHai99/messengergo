$(document).ready(function() {
  $("#link-read-more-notif").bind("click", function() {
    let skipNumber = $("ul.list-notifications").find("li").length;

    $("#link-read-more-notif").css("display", "none");
    $(".read-more-notif-loader").css("display", "inline-block");

    setTimeout(() => {
      $.get(`/notification/raed-more?skipNumber=${skipNumber}`, function(notifications) {
        if(!notifications.length) {
          alertify.notify("Không còn thông báo!", "error", 7);
          $("#link-read-more-notif").css("display", "none");
          $(".read-more-notif-loader").css("display", "none");
          return false;
        }
        notifications.forEach(function(notification) {
          $("ul.list-notifications").append(`<li>${notification}</li>`); // modal notification
        });
        $(".read-more-notif-loader").css("display", "none");
        $("#link-read-more-notif").css("display", "block");
      });
    }, 500);
  });
});
