$(document).ready(function () {
	/* ------ Gestione scorrimento sezioni -------- */

	const appHeight = () => {
		const doc = document.documentElement;
		doc.style.setProperty("--app-height", `${window.innerHeight}px`);
	};
	window.addEventListener("resize", appHeight);
	appHeight();

	$("#fullpage").fullpage({
		//options here
		menu: "#menu",
		autoScrolling: true,
		scrollHorizontally: true,
		scrollOverflow: true,
		scrollOverflowReset: true,
		paddingTop: "80px",
		fixedElements: ".main-menu",
		anchors: ["home", "chi-sono", "competenze", "portfolio", "contattami"],
	});

	/* ------ Gestione slider Chi Sono -------- */

	var swiperChiSono = new Swiper("#chiSono-slider", {
		keyboard: true,
		pagination: {
			el: ".swiper-pagination-chiSono",
			clickable: true,
		},

		breakpoints: {
			0: {
				autoHeight: true,
				slidesPerView: 1,
			},
			768: {
				slidesPerView: "auto",
				spaceBetween: 50,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			},
		},
	});

	function goToPageCS(numberPage) {
		swiperChiSono.slideTo(numberPage, 1000, false);
	}

	var buttonPrevCS = $("#chiSono-slider .swiper-button-prev");
	var buttonNextCS = $("#chiSono-slider .swiper-button-next");
	buttonNextCS.on("click", function () {
		if (buttonNextCS.hasClass("swiper-button-disabled")) {
			buttonNextCS
				.queue(function (next) {
					buttonNextCS.addClass("rotate").dequeue();
				})
				.delay(400)
				.queue(function (next) {
					buttonNextCS.hide().removeClass("rotate");
					buttonPrevCS.show().dequeue();
				});
		}
	});
	buttonPrevCS.on("click", function () {
		goToPageCS(0);
		buttonPrevCS
			.queue(function (next) {
				buttonPrevCS.addClass("rotate").dequeue();
			})
			.delay(400)
			.queue(function (next) {
				buttonPrevCS.hide().removeClass("rotate");
				buttonNextCS.show().dequeue();
			});
	});

	$(document).ready(function () {
		$("#lightgallery-passioni").lightGallery();
	});

	/* ------ Gestione slider portfolio -------- */

	var swiperPortfolio = new Swiper("#portfolio-slider", {
		keyboard: true,
		preloadImages: false,
		lazy: true,
		watchSlidesVisibility: true,
		pagination: {
			el: ".swiper-pagination-portfolio",
			clickable: true,
		},

		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: "auto",
				spaceBetween: 20,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			},
		},
	});

	function goToPageP(numberPage) {
		swiperPortfolio.slideTo(numberPage, 1000, false);
	}

	var buttonPrevP = $("#portfolio-slider .swiper-button-prev");
	var buttonNextP = $("#portfolio-slider .swiper-button-next");
	buttonNextP.on("click", function () {
		if (buttonNextP.hasClass("swiper-button-disabled")) {
			buttonNextP
				.queue(function (next) {
					buttonNextP.addClass("rotate").dequeue();
				})
				.delay(400)
				.queue(function (next) {
					buttonNextP.hide().removeClass("rotate");
					buttonPrevP.show().dequeue();
				});
		}
	});
	buttonPrevP.on("click", function () {
		goToPageP(0);
		buttonPrevP
			.queue(function (next) {
				buttonPrevP.addClass("rotate").dequeue();
			})
			.delay(400)
			.queue(function (next) {
				buttonPrevP.hide().removeClass("rotate");
				buttonNextP.show().dequeue();
			});
	});

	/* ------ Gestione immagine visore -------- */

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

	/* ------ Gestione blocchi competenze -------- */
	$(".competenza").on("click", function () {
		if ($(this).hasClass("open")) {
			$(this)
				.find(".blocco-icone")
				.fadeOut()
				.delay(100)
				.queue(function (next) {
					$(".competenza").removeClass("open");
					next();
				});
		} else {
			$(this).toggleClass("open");
			$(this).find(".blocco-icone").slideToggle();
		}
	});
	$(".competenza").on("mouseleave", function () {
		$(this)
			.find(".blocco-icone")
			.fadeOut()
			.delay(100)
			.queue(function (next) {
				$(".competenza").removeClass("open");
				next();
			});
	});

	/* ------ Gestione menu -------- */

	// Gestione shadow menu
	function addShadow() {
		var bodyShadow = document.createElement("div");
		bodyShadow.setAttribute("class", "body-shadow");
		$("body").append(bodyShadow);
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
	$(".main-menu .inline-menu li").on("click", function () {
		chiudiMenu();
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
	});

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
