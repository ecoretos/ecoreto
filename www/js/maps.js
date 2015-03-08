
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var pointReto;
var pointUser;
var marker;
var infowindow2;
var infowindow;
var watchID;
var marker2;
var longitud;
var latitud;




function mostrarMapa(){
    longitud=-99.154622;
    latitud=19.4226115;

    pointUser = new google.maps.LatLng(19.4404259,-99.1805779);
        
        if (navigator.geolocation) {
            //maximumAge- Guarda la posicion por 5 minutos 
          //enableHighAccuracy: Se tratan de obtener los mejores resultados posible del GPS
          //timeout: el tiempo maximo que se espera para obtener la posicion en este caso 5 segundos
            alert('Comienza Reto');
            var options = {maximumAge: 500000, enableHighAccuracy:true, timeout: 5000};
            navigator.geolocation.getCurrentPosition(exito, falla, options );

                    function exito(pos) {
                        pointUser =new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
                        MuestraMapa(pointUser);
             
                      }
            function falla(error) {
            //si falla mostrar para en posicion por defecto
              alert('Comienza Reto2');
              MuestraMapa(pointUser); 
            }
            
        
          }//FIN IF
          else {
                    MuestraMapa(defaultPos);  // No soporta geolocalizacion y dibuja el mapa en posicion Default
                   }
           
           //FUNCION DIBUJAR MAPa
           function MuestraMapa(latlng) {
            pointReto = new google.maps.LatLng(19.4226115,-99.154622);
              var marker3 = new google.maps.Marker({
                          icon:'http://cibercom.ddns.net:8181/img/2015-03-07221238_b.png'
                           });
            directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
            //Dibuja  punto del  reto en  el mapa
            var myOptions = {
                        zoom: 16,
                        center: pointReto,
            disableDefaultUI: true,
                        mapTypeId: google.maps.MapTypeId.ROADMAP};
            
            map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
            directionsDisplay.setMap(map);

            var contentString ='<a>Reto</a>';

             infowindow = new google.maps.InfoWindow({
                                  position: pointReto,
                                  content: contentString
                                  
                  });
            
             marker = new google.maps.Marker({
              position: pointReto,
              map: map,
              title: "Mi posición",
              animation: google.maps.Animation.DROP
     
                      });
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map,marker);
          
            
            });
              
            
            

             
           }// Fin muestra mapa
}


//Retos

function calcRoute() {
  console.log("Calcula ruta del reto");
  var request = {
    origin:pointUser,
    destination:pointReto,
    travelMode: google.maps.TravelMode.DRIVING,
    region: "MX"
  };
   directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      console.log("Muestra rutas en MAPA");
      directionsDisplay.setDirections(result);
      console.log(JSON.stringify(result));
      watchID = navigator.geolocation.watchPosition(geo_success, onError, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
    }
  });
}

function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

function geo_success(position) {
  console.log("Inicia poleo de posicion");
     
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    map.setZoom(15);

    var info = '<div>Distancia del reto : 6 km</div>';

    var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    if(!marker2){
        //create marker
        marker2 = new google.maps.Marker({
            position: point,
            map: map,
            icon:'http://cibercom.ddns.net:8181/img/2015-03-07221238_b.png'
        });
    }else{
        //move marker to new position
        console.log("Actualizacion marker2");
        marker2.setPosition(point);
    }
     if(!infowindow2){
        infowindow2 = new google.maps.InfoWindow({
            content: info
        });
    }else{
        infowindow2.setContent(info);
    }
   google.maps.event.addListener(marker2, 'click', function() {
      infowindow2.open(map,marker2);
    }); 
}


function aceptarRetoMapa(){
    $("#aceptar-m").hide();
    $("#declinar-m").hide();
calcRoute();



}





