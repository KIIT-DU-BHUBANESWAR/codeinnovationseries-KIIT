$(document).ready(function(){

    $('.like').on('mouseover',function(){
        $('.like').attr('src','./image/like-1.png')
    })

    $('.like').on('mouseout',function(){
        $('.like').attr('src','./image/like.png')
    })

    $('.dislike').on('mouseover',function(){
        $('.dislike').attr('src','./image/dislike-1.png')
    })

    $('.dislike').on('mouseout',function(){
        $('.dislike').attr('src','./image/dislike.png')
    })

    $("#sign").on('click', function(){
        document.querySelector("#bg-modal").style.display='flex';
    });
    
    $("#close").on('click', function(){
        document.querySelector("#bg-modal").style.display='none';
    });
  
    $('#prizes').tabs();
    
});