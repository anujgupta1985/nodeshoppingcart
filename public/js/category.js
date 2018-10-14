$(document).ready(function(){
    
    $("#parent_category").change(function() {
        var pcat = $(this).val();

        var parameters = { parent_cat : pcat };

        $.ajax({
            type: 'POST',
            data: parameters,
            contentType: 'application/json',
            url: '/admin/getsubcategory',
            success: function(data) {
                console.log('success');
               // console.log(JSON.stringify(data));
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
            }
        });
    });

});