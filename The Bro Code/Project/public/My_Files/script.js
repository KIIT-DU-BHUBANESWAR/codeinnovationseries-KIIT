$(document).ready(function(){
	$('.more').mouseover(function () {
			 $('.more').css({"cursor":"pointer"});
		 
	});
	$('.hide').mouseover(function () {
			 $('.hide').css({"cursor":"pointer"});
		 
	});
	$('.more').click(function () {
			 $('.Hiddensubjects').show("slow");
			$('.more').hide();
		 
	});
	$('.hide').click(function () {
			 $('.Hiddensubjects').hide("slow");
			$('.more').show();
		 
	});
	
	$('.home').click(function () {
		$('html, body').animate({scrollTop: $('.caro').offset().top},1000);
	});
	
	$('.abtus').click(function () {
		$('html, body').animate({scrollTop: $('.aboutus').offset().top},1000);
	});
	$('.sub').click(function () {
		$('html, body').animate({scrollTop: $('.subjects').offset().top},1000);
	});
	$('.leg').click(function () {
		$('html, body').animate({scrollTop: $('.legecy').offset().top},1000);
	});
	$('.cntus').click(function () {
		$('html, body').animate({scrollTop: $('footer').offset().top},1000);
	});
    $('.rtus').click(function () {
		$('html, body').animate({scrollTop: $('.rateus').offset().top},1000);
	});
	
});