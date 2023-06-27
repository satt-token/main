/**
 * Search results
 */
function fetchResults(){
	let keyword = jQuery('#searchInput').val();
	let noresult = jQuery('#docy-search-result').attr('data-noresult');
	if ( keyword == "" ) {
		jQuery('#docy-search-result').removeClass('ajax-search').html("")
	} else {
		jQuery.ajax({
			url: docy_local_object.ajaxurl,
			type: 'post',
			data: { action: 'docy_search_data_fetch', keyword: keyword  },
			beforeSend: function() {
				jQuery(".spinner").css('display','block');
			},
			success: function(data) {
				if (data.length > 0) {
					jQuery('#docy-search-result').addClass('ajax-search').html( data );
					jQuery(".spinner").hide();
				} else {
					var data_error = '<h5>' + noresult + '</h5>';
					jQuery('#docy-search-result').removeClass('ajax-search').html( data_error );
				}
			}
		})
	}
}

function searchForumTab() {
	let keyword = jQuery('#searchInput').val();
	let noresult = jQuery('#docy-search-result').attr('data-noresult');
	jQuery('#doc-search-results').hide();
	jQuery('#blog-search-results').hide();
	jQuery('#forum-search-results').show();

	jQuery.ajax({
		url: docy_local_object.ajaxurl,
		type: 'post',
		data: { action: 'docy_forum_search_results', keyword: keyword  },
		success: function(data) {
			if (data.length > 0) {
				jQuery('#forum-search-results').html( data );
			} else {
				var data_error = '<h5>' + noresult + '</h5>';
				jQuery('#forum-search-results').addClass('ajax-search').html( data_error );
			}
		}
	})
}

function searchDocTab() {
	jQuery('#doc-search-results').show()
	jQuery('#forum-search-results').hide()
	jQuery('#blog-search-results').hide()
}

function searchBlogTab() {
	let keyword = jQuery('#searchInput').val()
	let noresult = jQuery('#docy-search-result').attr('data-noresult')

	jQuery('#blog-search-results').show()
	jQuery('#doc-search-results').hide()
	jQuery('#forum-search-results').hide()

	jQuery.ajax({
		url: docy_local_object.ajaxurl,
		type: 'post',
		data: { action: 'docy_blog_search_results', keyword: keyword  },
		success: function(data) {
			if (data.length > 0) {
				jQuery('#blog-search-results').html( data )
			} else {
				var data_error = '<h5>' + noresult + '</h5>'
				jQuery('#blog-search-results').addClass('ajax-search').html( data_error )
			}
		}
	})
}

;(function ($) {
	"use strict";

	$('.right-nav .search-icon').on('click', function () {
		$('.search-input').toggle(300)
		$('.navbar .search-input input').focus()
		$(".right-nav .search-icon").toggleClass('show-close')
	})

	$(document).on('click', 'body:not(.search) .searchbar-tabs .tab-item', function (e) {
		$(".searchbar-tabs .tab-item").removeClass("active")
		$(this).addClass("active");
	})

	$(document).ready(function() {
		/**
		 * Search Keywords
		 */
		$(".header_search_keyword ul li a").on("click", function (e) {
			e.preventDefault()
			var content = $(this).text()
			$("#searchInput").val(content).focus()
			fetchResults()
		});

		/**
		 * Disable  enter key press on Forum Topics Filter search input field
		 */
		$('.post-header .category-menu .cate-search-form').keypress(
			function(event){
				if (event.which == '13') {
					event.preventDefault();
				}
			}
		)

		$('.onepage-doc .nav-sidebar .nav-item:first-child').addClass('active');

		$('#searchInput').on('input', function(e) {
			if ( '' == this.value ) {
				$('#docy-search-result').removeClass('ajax-search');
			}
		})

		/**
		 * Registration Form
		 */
		if ( jQuery('.registerform').length ) {
			jQuery('.registerform').on("submit", function (e) {
				e.preventDefault();
				let ajax_url = docy_local_object.ajaxurl;
				jQuery.post(
					ajax_url,
					{
						data: jQuery(this).serialize(),
						action: 'dt_custom_registration_form'
					},
					function (res) {
						jQuery('#reg-form-validation-messages').html(res.data.message);
					}
				);
				return false;
			})
		}

		//*=============menu sticky js =============*//
		var $window = $(window);
		var didScroll,
			lastScrollTop = 0,
			delta = 5,
			$mainNav = $("#sticky"),
			$mainNavHeight = $mainNav.outerHeight(),
			scrollTop;

		$window.on("scroll", function () {
			didScroll = true;
			scrollTop = $(this).scrollTop();
		});

		setInterval(function () {
			if (didScroll && $('.navbar button.navbar-toggler.collapsed').length ) {
				hasScrolled();
				didScroll = false;
			}
		}, 200)

		function hasScrolled() {
			if (Math.abs(lastScrollTop - scrollTop) <= delta) {
				return;
			}
			if (scrollTop > lastScrollTop && scrollTop > $mainNavHeight) {
				$mainNav.removeClass("fadeInDown").addClass("fadeInUp").css('top', -$mainNavHeight);
			} else {
				if (scrollTop + $(window).height() < $(document).height()) {
					$mainNav.removeClass("fadeInUp").addClass("fadeInDown").css('top', 0);
				}
			}
			lastScrollTop = scrollTop;
		}

		function navbarFixed() {
			if ($('#sticky').length) {
				$(window).scroll(function () {
					var scroll = $(window).scrollTop();
					if (scroll) {
						$("#sticky").addClass("navbar_fixed");
						$(".sticky-nav-doc .body_fixed").addClass("body_navbar_fixed");
					} else {
						$("#sticky").removeClass("navbar_fixed");
						$(".sticky-nav-doc .body_fixed").removeClass("body_navbar_fixed");
					}
				});
			}
		}
		navbarFixed()

		function navbarFixedTwo() {
			if ($('#stickyTwo').length) {
				$(window).scroll(function () {
					var scroll = $(window).scrollTop();
					if (scroll) {
						$("#stickyTwo").addClass("navbar_fixed");
					} else {
						$("#stickyTwo").removeClass("navbar_fixed");
					}
				});
			}
		}
		navbarFixedTwo()

		//*=============menu sticky js =============*//

		//  page scroll
		function bodyFixed() {
			var windowWidth = $(window).width();
			if ($('#sticky_doc').length) {
				if (windowWidth > 576) {
					var tops = $('#sticky_doc');
					var leftOffset = tops.offset().top;

					$(window).on('scroll', function () {
						var scroll = $(window).scrollTop();
						if (scroll >= leftOffset) {
							tops.addClass("body_fixed");
						} else {
							tops.removeClass("body_fixed");
						}
					});
				}
			}
		}
		bodyFixed()

		// TOC area
		function bodyFixed2() {
			var windowWidth = $(window).width();

			if ($("#sticky_doc2").length) {
				if (windowWidth > 576) {
					var tops = $("#sticky_doc2");
					var topOffset = tops.offset().top;
					var blogForm = $('.blog_comment_box');
					var blogFormTop = blogForm.offset().top -300;

					$(window).on("scroll", function () {
						var scrolls = $(window).scrollTop();
						if (scrolls >= topOffset && scrolls <= blogFormTop ) {
							tops.addClass("stick");
						} else {
							tops.removeClass("stick");
						}
					});


					$('a[href="#hackers"]').click(function() {
						$("#hackers").css("padding-top", "100px");

						$(window).on("scroll", function () {
							var hackersOffset = $("#hackers").offset().top;
							var scrolls = $(window).scrollTop();
							if (scrolls < hackersOffset) {
								$("#hackers").css("padding-top", "0px");
							}
						})
					});
				}
			}
		}

		bodyFixed2();


		/*  Menu Click js  */
		function Menu_js() {
			if ($('.submenu').length) {
				$('.submenu > .dropdown-toggle').click(function () {
					var location = $(this).attr('href');
					window.location.href = location;
					return false;
				});
			}
		}

		Menu_js()

		$(window).on("load", function () {
			if ($('.scroll').length) {
				$(".scroll").mCustomScrollbar({
					mouseWheelPixels: 50,
					scrollInertia: 0,
				});
			}
		});

		if ($(".mobile_menu").length > 0) {
			var switchs = true;
			$(".mobile_btn").on("click", function (e) {
				if (switchs) {
					$(".mobile_menu").addClass("open");
				}
			})
		}

		/*--------------- parallaxie js--------*/
		function parallax() {
			if ($(".parallaxie").length) {
				$('.parallaxie').parallaxie({
					speed: 0.5,
				});
			}
		}

		parallax()

		/*--------------- tooltip js--------*/
		function tooltip() {
			if ( $('.tooltips').length ) {
				$('.tooltips').tooltipster({
					interactive: true,
					arrow: true,
					animation: 'grow',
					delay: 200,
				});
			}
		}

		tooltip();

		$('.tooltips_one').data('tooltip-custom-class', 'tooltip_blue').tooltip();
		$('.tooltips_two').data('tooltip-custom-class', 'tooltip_danger').tooltip();

		$(document).on('inserted.bs.tooltip', function (e) {
			var tooltip = $(e.target).data('bs.tooltip');
			$(tooltip.tip).addClass($(e.target).data('tooltip-custom-class'));
		});

		/*--------------- wavify js--------*/
		if ($('.animated-waves').length) {
			$('#animated-wave-three').wavify({
				height: 40,
				bones: 4,
				amplitude: 70,
				color: "rgba(188, 214, 234, 0.14)",
				speed: .3
			});

			$('#animated-wave-four').wavify({
				height: 60,
				bones: 5,
				amplitude: 90,
				color: "rgba(188, 214, 234, 0.14)",
				speed: .2
			});
		}

		/*--------------- nav-sidebar js--------*/
		if ($('.nav-sidebar > li').hasClass('active')) {
			$(".nav-sidebar > li.active").find('ul').slideDown(700);
		}

		function active_dropdown() {
			$('.nav-sidebar > li .icon').on('click', function (e) {
				$(this).parent().find('ul').first().toggle(300);
				$(this).parent().siblings().find('ul').hide(300);
			});
		}

		active_dropdown();

		$('.nav-sidebar > li .icon').each(function () {
			var $this = $(this);
			$this.on('click', function (e) {
				var has = $this.parent().hasClass('active');
				$('.nav-sidebar li').removeClass('active');
				if (has) {
					$this.parent().removeClass('active');
				} else {
					$this.parent().addClass('active');
				}
			});
		});

		/*--------------- mobile dropdown js--------*/
		function active_dropdown2() {
			$('.menu > li .mobile_dropdown_icon').on('click', function (e) {
				$(this).parent().find('ul').first().slideToggle(300);
				$(this).parent().siblings().find('ul').hide(300);
			});
		}

		active_dropdown2();

		/*--------------- niceSelect js--------*/
		function select() {
			if ($(".custom-select, .nice_select").length) {
				$(".custom-select, .nice_select").niceSelect();
			}
			if ($("#mySelect").length) {
				$("#mySelect").selectpicker();
			}
		}
		select();

		/*--------------- counterUp js--------*/
		function counterUp() {
			if ($('.counter').length) {
				$('.counter').counterUp({
					delay: 1,
					time: 250
				})
			}
		}

		counterUp();

		/*--------------- popup-js--------*/
		function popupGallery() {
			if ($(".img_popup").length) {
				$(".img_popup").each(function () {
					$(".img_popup").magnificPopup({
						type: 'image',
						closeOnContentClick: true,
						closeBtnInside: false,
						fixedContentPos: true,
						removalDelay: 300,
						mainClass: 'mfp-no-margins mfp-with-zoom',
						image: {
							enabled: true,
							navigateByImgClick: true,
							preload: [0, 1] // Will preload 0 - before current, and 1 after the current image,
						}
					});
				})
			}
		}

		popupGallery();

		/*--------------- video js--------*/
		function video() {
			if ($("#inline-popups").length) {
				$('#inline-popups').magnificPopup({
					delegate: 'a',
					removalDelay: 500, //delay removal by X to allow out-animation
					mainClass: 'mfp-no-margins mfp-with-zoom',
					preloader: false,
					midClick: true
				});
			}
		}

		video();


		/*--------- WOW js-----------*/
		function bodyScrollAnimation() {
			var scrollAnimate = $('body').data('scroll-animation');
			if (scrollAnimate === true) {
				new WOW({}).init()
			}
		}

		bodyScrollAnimation();



		// Global mobile menu
		$('body:not(.single-docs) .mobile_menu_btn').on('click', function () {
			$('body').removeClass('menu-is-closed').addClass('menu-is-opened');
			$('.side_menu').addClass('menu-opened');
		});

		$('body:not(.single-docs) .close_nav').on("click", function (e) {
			if ($('.side_menu').hasClass('menu-opened')) {
				$('.side_menu').removeClass('menu-opened');
				$('body').removeClass('menu-is-opened')
			}
		});

		$('.click_capture').on('click', function () {
			$('body').removeClass('menu-is-opened').addClass('menu-is-closed');
			$('.side_menu').removeClass('menu-opened');
		});


		/*--------------- Tab button js--------*/
		$('.next').on('click', function () {
			$('.v_menu .nav-item > .active').parent().next('li').find('a').trigger('click');
		});

		$('.previous').on('click', function () {
			$('.v_menu .nav-item > .active').parent().prev('li').find('a').trigger('click');
		});

		function Click_menu_hover() {
			if ($('.tab-demo').length) {
				$.fn.tab = function (options) {
					var opts = $.extend({}, $.fn.tab.defaults, options);
					return this.each(function () {
						var obj = $(this);

						$(obj).find('.tabHeader li').on(opts.trigger_event_type, function () {
							$(obj).find('.tabHeader li').removeClass('active');
							$(this).addClass('active');

							$(obj).find('.tabContent .tab-pane').removeClass('active show');
							$(obj).find('.tabContent .tab-pane').eq($(this).index()).addClass('active show');

						})
					});
				}
				$.fn.tab.defaults = {
					trigger_event_type: 'click', //mouseover | click é»˜è®¤æ˜¯click
				};
			}
		}

		Click_menu_hover();

		function Tab_menu_activator() {
			if ($('.tab-demo').length) {
				$('.tab-demo').tab({
					trigger_event_type: 'mouseover'
				});
			}
		}

		Tab_menu_activator();

		function fAqactive() {
			$(".doc_faq_info .card").on('click', function () {
				$(".doc_faq_info .card").removeClass("active");
				$(this).addClass('active');
			});
		}

		fAqactive();

		function general() {
			$('.collapse-btn').on('click', function (e) {
				e.preventDefault();
				$(this).toggleClass('active')
				$(".collapse-wrap").slideToggle(500);

			});

			$('.short-by a').click(function () {
				$(this).toggleClass('active-short').siblings().removeClass('active-short');
			});
		}

		general()

		/*-------------------------------------
        Intersection Observer
        -------------------------------------*/
		if (!!window.IntersectionObserver) {
			let observer = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add("active-animation");
						//entry.target.src = entry.target.dataset.src;
						observer.unobserve(entry.target);
					}
				});
			}, {
				rootMargin: "0px 0px -100px 0px"
			});
			document.querySelectorAll('.has-animation').forEach(block => {
				observer.observe(block)
			});
		} else {
			document.querySelectorAll('.has-animation').forEach(block => {
				block.classList.remove('has-animation')
			});
		}

		// === Image Magnify
		if ($('.zoom').length) {
			$('.zoom').magnify({
				afterLoad: function () {
					console.log('Magnification powers activated!');
				}
			});
		}

		// === Focus Search Form
		$( document ).on( 'keydown', function ( e ) {
			if ( e.keyCode === 191 ) {
				e.preventDefault();
				$('.focused-form input[type=search]').focus();
				return;
			}
		});

		$('.focused-form input[type=search]').focus(function() {
			$('body').addClass('search-focused')
			$('.banner_search_form .input-wrapper').css('z-index', '999')
			$('.header_search_form .input-wrapper').css('z-index', '999')
			$('.header_search_form .input-group').css('z-index', '999')
		})

		$('.focused-form input[type=search]').focusout(function() {
			$('body').removeClass('search-focused');
			$('.banner_search_form .input-wrapper').removeAttr('style')
			$('.header_search_form .input-wrapper').removeAttr('style')
			$('.header_search_form .input-group').removeAttr('style')
		})

		// === YouTube Channel Videos Playlist
		if ($('#ycp').length) {
			$("#ycp").ycp({
				apikey: 'AIzaSyBS5J1A7o-M8X78JuiqF5h103XLmSQiReE',
				playlist: 6,
				autoplay: true,
				related: true
			});
		}

		// === Back to Top Button
		var back_top_btn = $('#back-to-top');

		$(window).scroll(function () {
			if ($(window).scrollTop() > 300) {
				back_top_btn.addClass('show');
			} else {
				back_top_btn.removeClass('show');
			}
		});

		back_top_btn.on('click', function (e) {
			e.preventDefault();
			$('html, body').animate({scrollTop: 0}, '300');
		});

		$( ".shadow-sm" ).hover(
			function() {
				$(this).addClass('shadow-lg');
			}, function() {
				$(this).removeClass('shadow-lg');
			})

		if ( $('popup-youtube').length ) {
			$('.popup-youtube').magnificPopup({
				type: 'iframe'
			});
		}
	})
})(jQuery);