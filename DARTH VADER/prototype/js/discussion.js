$(document).ready(function() {
   var $questionForm = $('.askQuestion');
   $questionForm.hide();

   $('.btn').on('click', function(){
        $questionForm.show();
        $('#ask').setAttribute('href' , '#ask-question');
   });

   $("#sign").on('click', function(){
      document.querySelector("#bg-modal").style.display='flex';
  });
  
  $("#close").on('click', function(){
      document.querySelector("#bg-modal").style.display='none';
  });

  $('#prizes').tabs();

});