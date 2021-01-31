$(document).ready(function() {
    $('#search-input').on("keyup", function(){
        var text = $(this).val();

        $.ajax({
            url : "localhost/corruption/search.php",
            type : "GET",
            data : {search: text},
            success: function(data){
                $('#result').html(data);
            }
        });
    });
});