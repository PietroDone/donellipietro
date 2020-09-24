$(document).ready(function () {
	var swiper = new Swiper("#vertical-slider", {
		direction: "vertical",
		//mousewheel: true,
		keyboard: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});
});
