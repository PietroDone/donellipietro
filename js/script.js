$(document).ready(function () {
	$("#fullpage").fullpage({
		//options here
		autoScrolling: true,
		scrollHorizontally: true,
		scrollOverflow: true,
		scrollOverflowReset: true,
		anchors: ["home", "chi-sono", "competenze", "lavori", "contattami"],
	});
	//$.fn.fullpage.setAllowScrolling(false);

	var swiperChiSono = new Swiper("#chiSono-slider", {
		keyboard: true,
		//mousewheel: true,
		slidesPerView: "auto",
		spaceBetween: 50,
		pagination: {
			el: ".swiper-pagination-chiSono",
			clickable: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
		},
	});

	function goToPage(numberPage) {
		swiperChiSono.slideTo(numberPage, 1000, false);
	}

	var buttonPrev = $("#chiSono-slider .swiper-button-prev");
	var buttonNext = $("#chiSono-slider .swiper-button-next");
	buttonNext.on("click", function () {
		if (buttonNext.hasClass("swiper-button-disabled")) {
			buttonNext
				.queue(function (next) {
					buttonNext.addClass("rotate").dequeue();
				})
				.delay(400)
				.queue(function (next) {
					buttonNext.hide().removeClass("rotate");
					buttonPrev.show().dequeue();
				});
		}
	});
	buttonPrev.on("click", function () {
		goToPage(0);
		buttonPrev
			.queue(function (next) {
				buttonPrev.addClass("rotate").dequeue();
			})
			.delay(400)
			.queue(function (next) {
				buttonPrev.hide().removeClass("rotate");
				buttonNext.show().dequeue();
			});
	});

	$(document).ready(function () {
		$("#lightgallery-passioni").lightGallery();
	});

	var barraMenu = $(".main-menu");
	$(window).on("load resize scroll", function () {
		/* Chiusura menu al resize */
		chiudiMenu();

		/* Gestione apparizione menu */
		if (screen && screen.width >= 768) {
			$(".main-menu .inline-menu").slideDown();
		} else {
			$(".main-menu .inline-menu").slideUp();
		}

		/* Gestione fissaggio barra */
		var scroll = $(window).scrollTop();
		if (screen && screen.width > 200) {
			if (scroll >= 20) {
				barraMenu.addClass("dark");
			} else {
				barraMenu.removeClass("dark");
			}
		}
	});

	var pietro = $(".full-hero .image img");
	var w_p = pietro.width();
	var h_p = pietro.height();

	$(window).on("load resize scroll", function () {
		image = $(".full-hero .image");
		w_i = image.width();
		h_i = image.height();

		if ((h_p / w_p) * w_i < h_i) {
			pietro.css("width", w_i + "px").css("height", "auto");
			image.css("border-color", "green");
		} else {
			pietro.css("height", h_i + "px").css("width", "auto");
			image.css("border-color", "blue");
		}
	});

	// Gestione shadow menu
	function addShadow() {
		var bodyShadow = document.createElement("div");
		bodyShadow.setAttribute("class", "body-shadow");
		$("body header").append(bodyShadow);
		$(".body-shadow").fadeIn();
	}
	function removeShadow() {
		$(".body-shadow").fadeOut();
		$(".body-shadow").detach();
	}

	// Gestione apertura e chiusura
	function apriMenu() {
		addShadow();
		$(".hamburger").addClass("is-active");
		$(".barra-menu").addClass("menu-open");
		$(".main-menu .inline-menu").slideDown();
	}
	function chiudiMenu() {
		removeShadow();
		$(".hamburger").removeClass("is-active");
		$(".barra-menu").removeClass("menu-open");
		if (screen && screen.width < 768) {
			$(".main-menu .inline-menu").slideUp();
		}
	}

	// Trigger apertura e chiusura
	$(document).keyup(function (e) {
		if (e.keyCode == 27) {
			// escape key maps to keycode `27`
			chiudiMenu();
		}
	});
	var hamburger = $(".hamburger");
	hamburger.on("click", function () {
		if (hamburger.hasClass("is-active")) {
			chiudiMenu();
		} else {
			apriMenu();
		}
	});
});
