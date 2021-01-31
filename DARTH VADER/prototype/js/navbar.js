$(document).ready(function() {
 
    $("#sign").on('click', function(){
       document.querySelector("#bg-modal").style.display='flex';
   });
   
   $("#close").on('click', function(){
       document.querySelector("#bg-modal").style.display='none';
   });
 
   $('#prizes').tabs();
 
 });