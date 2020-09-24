var map;

// Inserire coordinate
var Lat = 0;
var Lng = 0;
// Sito per le coordinate: https://www.mapcoordinates.net/it

// Inserire stile
var stile = [];

function initMap() {
	map = new google.maps.Map(document.getElementById("mappa"), {
		zoom: 17,
		center: new google.maps.LatLng(Lat, Lng),
		mapTypeId: "roadmap",
		scrollwheel: false,
		//draggable: false,
		mapTypeControl: false,
		disableDefaultUI: true,
		styles: stile
	});

	var icons = {
		pin: {
			icon: {
				url: "/img/pin.svg"
				//anchor: new google.maps.Point(118, 10)
			}
		}
	};

	function addMarker(feature) {
		var marker = new google.maps.Marker({
			position: feature.position,
			icon: icons[feature.type].icon,
			map: map
		});
	}

	var features = [
		{
			position: new google.maps.LatLng(Lat, Lng),
			type: "pin"
		}
	];

	for (var i = 0, feature; (feature = features[i]); i++) {
		addMarker(feature);
	}
}
