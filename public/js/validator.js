$(document).ready(function(){ 
    $("#btnLogin").click(function() {
        var email = $("#email").val();
        var password = $("#password").val();

        if(email.trim() == "")
        {
            alert("Please enter email!");
            $("#email").focus();
            return false;
        }

        if(password.trim() == "")
        {
            alert("Please enter password!");
            $("#password").focus();
            return false;
        }

        $("#frmLogin").submit();
    });
});