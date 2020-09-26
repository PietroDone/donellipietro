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
		var scroll = $(window).scrollTop();
		if (screen && screen.width > 200) {
			if (scroll >= 20) {
				barraMenu.addClass("dark");
			} else {
				barraMenu.removeClass("dark");
			}
		}
	});

	// Gestione shadow menu
	function addShadow() {
		var bodyShadow = document.createElement("div");
		bodyShadow.setAttribute("class", "body-shadow");
		console.log(bodyShadow);
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
		$(".main-menu .inline-menu").slideUp();
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
