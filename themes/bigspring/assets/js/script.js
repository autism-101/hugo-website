// Passive event listeners
jQuery.event.special.touchstart = {
	setup: function (_, ns, handle) {
		'use strict';
    this.addEventListener('touchstart', handle, {
      passive: !ns.includes('noPreventDefault')
    });
  }
};
jQuery.event.special.touchmove = {
	setup: function (_, ns, handle) {
		'use strict';
    this.addEventListener('touchmove', handle, {
      passive: !ns.includes('noPreventDefault')
    });
  }
};

// Preloader js
$(window).on('load', function () {
  'use strict';
  $('.preloader').fadeOut(0);
});

// on ready state
$(document).ready(function () {
	'use strict';

	// tab
	$('.tab-content').find('.tab-pane').each(function (idx, item) {
		var navTabs = $(this).closest('.code-tabs').find('.nav-tabs'),
			title = $(this).attr('title');
		navTabs.append('<li class="nav-item"><a class="nav-link" href="#">' + title + '</a></li>');
	});

	$('.code-tabs ul.nav-tabs').each(function () {
		$(this).find("li:first").addClass('active');
	})

	$('.code-tabs .tab-content').each(function () {
		$(this).find("div:first").addClass('active');
	});

	$('.nav-tabs a').click(function (e) {
		e.preventDefault();
		var tab = $(this).parent(),
			tabIndex = tab.index(),
			tabPanel = $(this).closest('.code-tabs'),
			tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
		tabPanel.find('.active').removeClass('active');
		tab.addClass('active');
		tabPane.addClass('active');
	});


	// video play button
	$('.video-play-btn').on('click', function () {
		var thumbWidth = $(this).siblings('.video-thumb').width();
		var video = '<div class="ratio ratio-16x9 mx-auto bg-dark rounded-2 overflow-hidden" style="max-width:'+ thumbWidth +'px"><iframe src="' + $(this).data('src') + '?autoplay=1&amp;modestbranding=1&amp;showinfo=0' + '" allowscriptaccess="always" allow="autoplay" allowfullscreen></iframe></div>';
		$(this).fadeOut(100);
		$(this).siblings('.video-thumb').replaceWith(video);
	});
	
	// counterUp
	if($('.counter').length !== 0) {
		var a = 0;
		$(window).scroll(function () {
			var oTop = $('.counter').offset().top - window.innerHeight;
			if (a == 0 && $(window).scrollTop() > oTop) {
				$('.counter').each(function () {
					var $this = $(this),
						countTo = $this.attr('data-count');
					$({
						countNum: $this.text()
					}).animate({
							countNum: countTo
						}, {
							duration: 850,
							easing: 'swing',
							step: function () {
								$this.text(
									Math.ceil(this.countNum).toLocaleString('en')
								);
							},
							complete: function () {
								$this.text(
									Math.ceil(this.countNum).toLocaleString('en')
								);
							}
						}
					);
				});
				a = 1;
			}
		});
	}


	//slider
	new Swiper('.swiper.single-slider', {
		loop: true,
		autoplay: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
	});

	// brandCarousel init
	new Swiper('.swiper.brand-carousel', {
		spaceBetween: 0,
		speed: 1000,
		loop: true,
		autoplay: {
			delay: 3000
		},
		breakpoints: {
			0: {
				slidesPerView: 2,
				spaceBetween: 0
			},
			640: {
				slidesPerView: 3,
				spaceBetween: 0
			},
			767: {
				slidesPerView: 4,
				spaceBetween: 0
			},
			991: {
				slidesPerView: 6,
				spaceBetween: 0
			}
		}
	});
	
	// testimonial-carousel init
	new Swiper('.swiper.testimonial-carousel', {
		spaceBetween: 70,
		speed: 600,
		loop: true,
		autoplay: true,
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 30
			},
			991: {
				slidesPerView: 2,
				spaceBetween: 70
			}
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		}
	});

});