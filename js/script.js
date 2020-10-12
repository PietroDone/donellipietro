$(window).on("load", function () {
	$(".loading")
		.fadeOut()
		.delay(200)
		.dequeue(function () {
			$(".loading").fadeOut().remove();
		});
});

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
		menu: "#menu .inline-menu",
		autoScrolling: true,
		scrollHorizontally: true,
		scrollOverflow: true,
		scrollOverflowReset: true,
		paddingTop: "80px",
		fixedElements: ".main-menu, #form-message",
		anchors: ["home", "chi-sono", "competenze", "portfolio", "contattami"],

		responsiveWidth: 768,

		onLeave: function (origin, destination, direction) {
			if (origin.index == 0 && direction == "down") {
				$(".main-menu").addClass("fixed");
			}
		},
		afterLoad: function (origin, destination, direction) {
			if (destination.index == 0) {
				$(".main-menu").removeClass("fixed");
			}
		},
	});

	/* ------ Gestione slider Chi Sono -------- */

	const breakpoint = window.matchMedia("(max-width:768px)");

	let swiperChiSono;

	const breakpointChecker = function () {
		if (breakpoint.matches === true) {
			if (swiperChiSono !== undefined) swiperChiSono.destroy(true, true);
			return;
		} else if (breakpoint.matches === false) {
			return enableSwiper();
		}
	};

	const enableSwiper = function () {
		swiperChiSono = new Swiper("#chiSono-slider", {
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
	};

	breakpoint.addListener(breakpointChecker);

	breakpointChecker();

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
			$(this).removeClass("open").find(".blocco-icone").hide();
		} else {
			$(".competenza.open").not(this).removeClass("open").find(".blocco-icone").hide();
			$(this).addClass("open").find(".blocco-icone").slideDown();
		}
	});
	$(".competenza").on("mouseleave", function () {
		if ($(window).width() >= 768) {
			$(this).removeClass("open").find(".blocco-icone").hide();
		}
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
		$("#menu").slideDown();
	}
	function chiudiMenu() {
		removeShadow();
		$(".hamburger").removeClass("is-active");
		$(".barra-menu").removeClass("menu-open");
		if ($(window).width() < 768) {
			$("#menu").fadeOut();
		}
	}
	$("#menu li, #menu .btn").on("click", function () {
		chiudiMenu();
	});

	$(window).on("load resize scroll", function () {
		/* Chiusura menu al resize */
		chiudiMenu();

		/* Gestione apparizione menu */
		if ($(window).width() >= 768) {
			$("#menu").slideDown();
		} else {
			$("#menu").fadeOut();
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

	/* Gestione mail */

	var form = $("#form-contattami");
	var formMessages = $("#form-messages");

	function message(type, msgText) {
		formMessages
			.removeClass()
			.addClass("alert " + type)
			.slideDown()
			.delay(5000)
			.fadeOut();
		$(formMessages).text(msgText);
	}

	function checkPrivacy() {
		if ($("#privacy").is(":checked")) {
			return true;
		} else {
			message("alert-danger", "Per inviare è necessario acconsentire al trattamento dei dati.");
			return false;
		}
	}

	$(form).submit(function (event) {
		// Blocco la chiamata diretta alla pagina mailer.php
		event.preventDefault();
		// Controllo che la privacy sia ok
		if (!checkPrivacy()) return false;
		// Raccolgo i dati
		var formData = $(form).serialize();
		// Chiamata ajax
		$.ajax({
			type: "POST",
			url: $(form).attr("action"),
			data: formData,
		})
			.done(function (response) {
				message("alert-success", response);

				$("#name").val("");
				$("#email").val("");
				$("#message").val("");
			})
			.fail(function (data) {
				if (data.responseText !== "") {
					msgText = data.responseText;
				} else {
					msgText = "Oops! C'è stato un errore, il messaggio non può essere inviato.";
				}
				message("alert-danger", msgText);
			});
	});
});
