$(document).on ('turbolinks:load', function(){
	var beforePos = 0;

	function ScrollAnime() {
		var elemTop = $('.header-body').offset().top;
		var scroll = $(window).scrollTop();
		if(elemTop > scroll || 0 > scroll - beforePos){
			$('#header').removeClass('UpMove');
			$('#header').addClass('DownMove');
		}else {
			$('#header').removeClass('DownMove');
			$('#header').addClass('UpMove');
		}
		beforePos = scroll;
	}

	$(window).scroll(function () {
		ScrollAnime();
	});
});
