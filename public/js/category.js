$(document).ready(function(){
    
    $("#parent_category").change(function() {
        var pcat = $(this).val();

        //var parameters = { parent_cat : pcat };       

        data = {};
        data.parent_cat = pcat; 
        console.log(data);


        $.ajax({
            type: 'GET',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:3000/admin/getsubcategory',
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