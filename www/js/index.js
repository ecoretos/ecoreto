/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function paginaMapa(long,lat){
    mostrarMapa(long,lat);
    $(':mobile-pagecontainer').pagecontainer('change', '#p1', {transition: 'fade'} );
}
function onDeviceReady() {
    var pushNotification = window.plugins.pushNotification; 
         pushNotification.register(successPush, errorPush,{"senderID":"976110997302","ecb":"onNotificationGCM"});
    loadRetos();
        $(document).on("swiperight", "#inicio", function() {
            $(':mobile-pagecontainer').pagecontainer('change', '#retos', {transition: 'fade',reverse:'true'} );
        });
        $(document).on("swiperight", "#perfil", function() {
            $(':mobile-pagecontainer').pagecontainer('change', '#inicio', {transition: 'fade',reverse:'true'} );
        });

        $(document).on("swipeleft", "#retos", function() {
            $(':mobile-pagecontainer').pagecontainer('change', '#inicio', {transition: 'fade'} );
        });
        $(document).on("swipeleft", "#inicio", function() {
            loadRetosUsuario();
            $(':mobile-pagecontainer').pagecontainer('change', '#perfil', {transition: 'fade'} );
        });
    if (window.localStorage.getItem("datosUser")) {

         datos_usuario=JSON.parse(window.localStorage.getItem("datosUser"));
         console.log(JSON.stringify(datos_usuario));
          $(':mobile-pagecontainer').pagecontainer('change', '#inicio', {transition: 'fade'} );
            $('#namee').html(datos_usuario.name);
            $('#cpuntos').html(datos_usuario.puntos);
          $('#img-profile').attr('src',datos_usuario.urlFoto);
          
    }
    else{
         console.log("No hay registro");
         window.localStorage.clear();
         $(':mobile-pagecontainer').pagecontainer('change', '#p2', {transition: 'fade'} );//Poner p2 final
         datosUsuario =  new datosUser();
         

    }
}

/*var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        window.localStorage.clear();  //Para  pedir  logueo  siempre 
        if (window.localStorage.getItem("datosUser")) {

             var datos_usuario=JSON.parse(window.localStorage.getItem("datosUser"));
             console.log(JSON.stringify(datos_usuario));
              $(':mobile-pagecontainer').pagecontainer('change', '#inicio', {transition: 'flip'} );
             

        }
        else{
             console.log("No hay registro");
             window.localStorage.clear();
             $(':mobile-pagecontainer').pagecontainer('change', '#p2', {transition: 'flip'} );//Poner p2 final
             datosUsuario =  new datosUser();
             var pushNotification = window.plugins.pushNotification; 
             pushNotification.register(successPush, errorPush,{"senderID":"976110997302","ecb":"onNotificationGCM"});

        }


        loadRetos();
        $(document).on("swiperight", "#inicio", function() {
            $(':mobile-pagecontainer').pagecontainer('change', '#retos', {transition: 'slide',reverse:'true'} );
        });
        $(document).on("swiperight", "#perfil", function() {
            $(':mobile-pagecontainer').pagecontainer('change', '#inicio', {transition: 'slide',reverse:'true'} );
        });

        $(document).on("swipeleft", "#retos", function() {
            $(':mobile-pagecontainer').pagecontainer('change', '#inicio', {transition: 'slide'} );
        });
        $(document).on("swipeleft", "#inicio", function() {
            loadRetosUsuario();
            $(':mobile-pagecontainer').pagecontainer('change', '#perfil', {transition: 'slide'} );
        });
    }
};*/
function returnHome(){
    $(':mobile-pagecontainer').pagecontainer('change', '#inicio', {transition: 'fade',reverse:'true'} );
}
function cobrarPremio(){
    $(':mobile-pagecontainer').pagecontainer('change', '#premio3', {transition: 'fade',reverse:'true'} );
}
function returnRetos(){
    $(':mobile-pagecontainer').pagecontainer('change', '#retos', {transition: 'fade',reverse:'true'} );
}
function returnPerfil(){
    $(':mobile-pagecontainer').pagecontainer('change', '#perfil', {transition: 'fade',reverse:'true'} );
}
function loadRetosUsuario(){
    $('#retos-usuario').html('');
    var idUsuario = datos_usuario.idUsuario;
    $.getJSON('http://cibercom.ddns.net:8181/Ecobici/retoConsulta',{idUsuario:idUsuario}).done(function(data){
            console.log(JSON.stringify(data));
            $.each(data.retos, function(i,item){
                $('#retos-usuario').append('<div class="reto" id="'+item.idReto+'">'+
                    '<img src="http://cibercom.ddns.net:8181/img/'+item.img1+'" alt="" id="img-reto" >'+
                    '<div class="desc3">'+item.nombre.substring(0, 18)+'</div>'+
                    '<div class="desc4">Acompletado : 80%</div>'+
                    '<div class="arrow-left"></div>'+
                '</div>');
            });
            $("#retos-usuario .reto").click(function(){
                console.log('clicaste'+$(this).attr('id'));
                $(':mobile-pagecontainer').pagecontainer('change', '#nuevo-reto', {transition: 'fade',reverse:'true'} );
                loadReto($(this).attr('id'),1);
                return false;
            });
        });
    
}
function loadRetos(){
    $('#retos-existentes').html('');
    $.getJSON('http://cibercom.ddns.net:8181/Ecobici/retos').done(function(data){
            console.log(JSON.stringify(data));
            $.each(data.retos, function(i,item){
                $('#retos-existentes').append('<div class="reto" id="'+item.idReto+'">'+
                    '<img src="http://cibercom.ddns.net:8181/img/'+item.img1+'" alt="" id="img-reto" >'+
                    '<div class="desc3">'+item.nombre.substring(0, 18)+'</div>'+
                    '<div class="desc4">'+item.desc.substring(0, 60)+'...</div>'+
                    '<div class="arrow-left"></div>'+
                '</div>');
            });
            $("#retos-existentes .reto").click(function(){
                console.log('clicastere'+$(this).attr('id'));
                $(':mobile-pagecontainer').pagecontainer('change', '#nuevo-reto', {transition: 'fade',reverse:'true'} );
                loadReto($(this).attr('id'),0);
                return false;
            });
        });
    
}
function loadReto(idReto,tipo){
$.getJSON('http://cibercom.ddns.net:8181/Ecobici/retos',{id:idReto}).done(function(data){
        $('#desc-reto').html('');
        $.each(data.retos, function(i,item){
            if(tipo==0){
                if(item.unit=='CE'){
                    var longitud=item.lng;
                    var latitud=item.lat;
                    $('#desc-reto').append('<div class="nombre">'+item.nombre+'</div>'+
                    '<div class="descripcion">'+
                        item.desc+
                    '</div>'+
                    '<fieldset class="ui-grid-a">'+
                        '<div class="ui-block-a">'+
                            '<button class="ui-btn ui-btn-b ui-btn-corner-all" id="aceptar"  onClick="javascript:paginaMapa();">Ver Mapa</button>'+
                        '</div>'+
                        '<div class="ui-block-b">'+
                            '<button class="ui-btn ui-btn-a ui-btn-corner-all" id="declinar" onClick="javascript:returnRetos()">Declinar</button>'+
                        '</div>'+
                    '</fieldset>');
                }else{
                    $('#desc-reto').append('<div class="nombre">'+item.nombre+'</div>'+
                    '<div class="descripcion">'+
                        item.desc+
                    '</div>'+
                    '<fieldset class="ui-grid-a">'+
                        '<div class="ui-block-a">'+
                            '<button class="ui-btn ui-btn-b ui-btn-corner-all" id="aceptar"  onClick="javascript:aceptarReto(\''+item.idReto+'\');">Aceptar Reto</button>'+
                        '</div>'+
                        '<div class="ui-block-b">'+
                            '<button class="ui-btn ui-btn-a ui-btn-corner-all" id="declinar" onClick="javascript:returnRetos()">Declinar</button>'+
                        '</div>'+
                    '</fieldset>');
                }
                    /*$('#retos-existentes').append('<div class="reto" id="'+item.idReto+'">'+
                        '<img src="http://cibercom.ddns.net:8181/img/'+item.img1+'" alt="" id="img-reto" >'+
                        '<div class="desc3">'+item.nombre.substring(0, 18)+'</div>'+
                        '<div class="desc4">'+item.desc.substring(0, 60)+'...</div>'+
                        '<div class="arrow-left"></div>'+
                    '</div>');*/
            }else{
                $('#desc-reto').append('<div class="nombre">'+item.nombre+'</div>'+
                    '<div class="descripcion">'+
                        item.desc+
                    '</div>'+
                    '<fieldset class="ui-grid-a">'+
                        '<div class="ui-block-b">'+
                            '<button class="ui-btn ui-btn-a ui-btn-corner-all" id="declinar" onClick="javascript:returnPerfil()">Volver</button>'+
                        '</div>'+
                    '</fieldset>');



                    /*$('#retos-existentes').append('<div class="reto" id="'+item.idReto+'">'+
                        '<img src="http://cibercom.ddns.net:8181/img/'+item.img1+'" alt="" id="img-reto" >'+
                        '<div class="desc3">'+item.nombre.substring(0, 18)+'</div>'+
                        '<div class="desc4">'+item.desc.substring(0, 60)+'...</div>'+
                        '<div class="arrow-left"></div>'+
                    '</div>');*/
            }
            
        });
        /*$(".reto").click(function(){
            console.log('clicaste'+$(this).attr('id'));
            $(':mobile-pagecontainer').pagecontainer('change', '#nuevo-reto', {transition: 'flip',reverse:'true'} );
            return false;
        });*/
    });
}
function aceptarReto(id){
    var idUsuario = datos_usuario.idUsuario;
    
    $.getJSON('http://cibercom.ddns.net:8181/Ecobici/retoAlta',{idReto:id,idUsuario:idUsuario,operacion:'reto-aceptado'}).done(function(data){
            loadRetosUsuario();
            $(':mobile-pagecontainer').pagecontainer('change', '#perfil', {transition: 'flip',reverse:'true'} );
        });
}

function DoRotate(d) {

    $("#cadena").css({
          '-moz-transform':'rotate('+d+'deg)',
          '-webkit-transform':'rotate('+d+'deg)',
          '-o-transform':'rotate('+d+'deg)',
          '-ms-transform':'rotate('+d+'deg)',
          'transform': 'rotate('+d+'deg)'
     });  
}

function AnimateRotate(d) {

        $("#cadena").animate({
          '-moz-transform':'rotate('+d+'deg)',
          '-webkit-transform':'rotate('+d+'deg)',
          '-o-transform':'rotate('+d+'deg)',
          '-ms-transform':'rotate('+d+'deg)',
          'transform':'rotate('+d+'deg)'
     }, 1000); 
}





//Datos de usuario
function datosUser(nombreUser,flagRegistro,numEcobici,regId,idSocial,idUsuario,urlFoto) {
this.name      = nombreUser;
this.flagRegistro  = flagRegistro;
this.tarjeta    = numEcobici;
this.regId         = regId;
this.idSocial    = idSocial;
this.idUsuario    = idUsuario;
this.urlFoto    = urlFoto;
}
var datosUsuario;
var datos_usuario;

function successPush(result) {
    console.log(result);
    
}
function errorPush(error) { 
    alert(error); 
}
onNotificationGCM = function(e) {
    
    switch( e.event ) 
    { 
        case 'registered': 
            if ( e.regid.length > 0 ) 
            { 
                console.log("Regid " + e.regid); 
                datosUsuario.regId = e.regid;
            } 
        break; 

        case 'message': 
          // NOTIFICACION!!! 
          if(e.payload.data.tipo==0){
            $(':mobile-pagecontainer').pagecontainer('change', '#nuevo-reto', {transition: 'fade',reverse:'true'} );
            loadReto(e.payload.data.idtipo,0);
          }
          if(e.payload.data.tipo==1){
            cargarPush('logro');
            $(':mobile-pagecontainer').pagecontainer('change', '#premio', {transition: 'fade',reverse:'true'} );
          }
          if(e.payload.data.tipo==2){
            cargarPush('logro');
            $(':mobile-pagecontainer').pagecontainer('change', '#premio2', {transition: 'fade',reverse:'true'} );
          }
          
        break; 

        case 'error': 
          alert('GCM error = '+e.msg); 
        break; 

        default: 
          alert('An unknown GCM event has occurred'); 
          break; 
    } 
}




function enviaRegistro(){
        datosUsuario.tarjeta = $("#NumEcoUsuario").val();
        this.flagRegistro = "true";
        console.log(JSON.stringify(datosUsuario));
        
    $.getJSON('http://cibercom.ddns.net:8181/Ecobici/usuarioAlta',datosUsuario).done(function(data){
            console.log(JSON.stringify(data));
            if(data.respuesta=='ok'){
                datosUsuario.idUsuario = data.idUsuario;
                window.localStorage.setItem("datosUser",JSON.stringify(datosUsuario));
                 $(':mobile-pagecontainer').pagecontainer('change', '#inicio', {transition: 'flip'} );
                //cambiar de pagina
            }else{
                alert('No se realizo registro')
            }
        });
} 

//INTERMITENTE

(function() {

setInterval(function(){
  var el = document.getElementById('blink');
  if(el.className == 'luz'){
      el.className = 'luz on';
  }else{
      el.className = 'luz';
  }
},500);

})();


function cargarPush(tipo){
  if (tipo=='logro'){
     $("#imgPush").append("<img class='mediana' src='img/logro.png'/>");

  }else{
    $("#imgPush").append("<img class='mediana' src='img/punto.png'/>");
  }



}

