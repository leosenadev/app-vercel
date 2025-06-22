if ("geolocation" in navigator) {

    var link_frame = document.querySelector('#map_frames');
    function getMap() {
        const links = document.querySelector('#txt_mylocal');

        // link_frame.src="";
        links.href = "";
        links.innerHTML = "";
        const options = {
            enableHighAccuracy: true, // enable high accuracy
            maximumAge: 30000,
            timeout: 27000
        };

        const success = (position) => {
            const { coords } = position;
            links.innerHTML = 'Map';
            links.href = `https://www.openstreetmap.org/?mlat=${coords.latitude}&mlon=${coords.longitude}#map=18/${coords.latitude}/${coords.longitude}&layers=G`;
            $.post('https://10.10.10.6:8181/api/maps', { lat: coords.latitude, long: coords.longitude })
                .done((res) => {
                    const endereco = res.address;

                    console.log(endereco);


                })

        }
        const error = (error) => {
            alert(error);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);

    }

    const options = {
        enableHighAccuracy: true, // enable high accuracy
        maximumAge: 30000,
        timeout: 27000
    };

    var map = document.querySelector('#content-map');
    const watcherID = navigator.geolocation.watchPosition((position) => {
        var { coords } = position;
        var x = coords.latitude;
        var y = coords.longitude;
        //var str = `Latitude${y} Longitude${x}`;
        fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + x + '&lon=' + y + '%20&addressdetails=1')
            .then(async (res) => { return await res.json() })
            .then((data) => {
                var endereco = data.address;
                if(endereco){
                    var html = "";
                    let { city_district, country, country_code, county, municipality, postcode, region, road, state, state_district, town } = endereco;

                    html += "<ul class='list-group list-group-flush pl-0'>";
                    html += "<li class='list-group-item'>" + city_district +' '+country+' '+country_code+' '+town+"</li>";
                
                    html += "<li class='list-group-item'>" + county + "</li>";
                    html += "<li class='list-group-item'>" + municipality + "</li>";
                    html += "<li class='list-group-item'>" + postcode +' '+region+' '+road+' '+state+"</li>";
                    html += "<li class='list-group-item'>" + state_district + "</li>";
    

                    html += "</ul>";
                
                
                    map.innerHTML = html;
                  }

                // city_district + ' - ' + country + ' - ' + country_code + '-' + county + '-' + municipality+'- '+postcode+' - '+region+'- '+road+' - '+state+'- '+state_district+'- '+town;
            });
        // map.innerHTML = str;
        // var str = `https://www.openstreetmap.org/export/embed.html?bbox=${x}%2C${y}%2C${y}%2C${x}&layer=mapnik&marker=${x}%2C${y}?z=28`;
        //link_frame.src = str;

    }, (error) => { console.log(error) }, options);

    // navigator.geolocation.clearWatch(watcherID);
} else {
    /* geolocation IS NOT available */
    alert("Sem suporte a geolocation!")
}