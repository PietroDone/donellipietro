$(document).ready(function () {
	var swiper = new Swiper("#vertical-slider", {
		direction: "vertical",
		mousewheel: true,
		keyboard: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
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
