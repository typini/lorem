$(function(){

	"use strict";

	var topoffset = 55;
	var slideqty = $('#featured .item').length;
	var wheight = $(window).height();
	var randSlide = Math.floor(Math.random()*slideqty);

	$('#featured .item').eq(randSlide).addClass('active');

	$('.fullheight').css('height', wheight);

	//$('#OracleTitle').css('top', (wheight / 2) + "px");

	//replace IMG to background containers
	$('#featured .item img').each(function(){
		var imgSrc = $(this).attr('src');
		$(this).parent().css({'background-image': 'url('+imgSrc+')'});
		$(this).remove();
	});

	//adjust height of .fullheight elements upon resize
	$(window).resize(function() {
		$('.fullheight').css('height', $(window).height());
		$('#OracleTitle').css('margin:', "auto");
	});

	$('.carousel').carousel({
		pause: false,
		interval: 10000
	});

	//Activate Scrollspy
	$('body').scrollspy({
		target: 'header .navbar',
		offset: topoffset
	})

	/*var hash = $(this).find('li.active a').attr('href');
	if(hash !== '#featured') {
		$('header nav').addClass('inbody');
	} else {
		$('header nav').removeClass('inbody');
	}*/

	//Add Inbody Class to navbar when INBODY
	$('.navbar-fixed-top').on('activate.bs.scrollspy', function() {
		var hash = $(this).find('li.active a').attr('href');
		if(hash !== '#home') {
			$('header nav').addClass('inbody');
		} else {
			$('header nav').removeClass('inbody');
		}
	});


//SCROLLING
	$('a[href*="#"]')
	  // Remove links that don't actually link to anything
	  .not('[href="#"]')
	  .not('[href="#0"]')
	  .click(function(event) {
	    // On-page links
	    if (
	      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
	      && 
	      location.hostname == this.hostname
	    ) {
	      // Figure out element to scroll to
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	      // Does a scroll target exist?
	      if (target.length) {
	        // Only prevent default if animation is actually gonna happen
	        event.preventDefault();
	        $('html, body').animate({
	          scrollTop: target.offset().top-topoffset+8
	        }, 800, function() {
	          // Callback after animation
	          // Must change focus!
	          var $target = $(target);
	          $target.focus();
	          if ($target.is(":focus")) { // Checking if the target was focused
	            return false;
	          } else {
	            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
	            $target.focus(); // Set focus again
	          };
	        });
	      }
	    }
	  });

  //Automate Slide Indicators
  for (var i=0; i<slideqty; i++){
  	var insertText = '<li data-target="#featured" data-slide-to="' + i + '"';
  		if (i === randSlide) { insertText += ' class="active"';} 
  		insertText+='></li>';
  	$('#featured ol').append(insertText);
  }

});