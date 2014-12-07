$( document ).ready(function() {

    var lat,lon;

    getLocation();

    var urlParis = 'https://api.paris.fr/api/data/1.1/Equipements/get_geo_equipements/';
    var token= "";
    var cid = "27,29";
    var offset = 0;
    var limit= 10;
    var radius= 1000;

    /*$.ajax({
        type: "GET",
        url: urlParis,
        data: { token: token, cid: cid, offset: offset, limit: limit, lat: lat, lon: lon, radius:radius }
    })
    .done(function( data ) {
        console.log(data);
    });*/

});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        $('body').append("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
}