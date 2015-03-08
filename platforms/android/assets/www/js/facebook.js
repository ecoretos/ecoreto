function loginFacebook(){
   if (!window.cordova) {
    var appId = prompt("835446809841163", "");
    facebookConnectPlugin.browserInit(appId);
   }
    facebookConnectPlugin.login( ["email","offline_access"], 
        function (response) { 
        	if (response.authResponse) {
        		facebookConnectPlugin.api('/me', null,
                     function(response) {
							 console.log('Respuetsa facebook :'+ JSON.stringify(response)) ;
                             var imgsource = 'https://graph.facebook.com/'
                                            +response.id+
                                            '/picture?type=small';
                            $("#block-a").append("<p>"+response.name+"</p>");
                             $("#block-img").append("<img class='imgmodel' src='"+imgsource+"''/>");
                             $("#block-twiter").append("<img class='pequena' src='img/fb_logo.png'/>");
                             $("#btn-twiter").hide();
                             $("#btn-fb").hide();
                             datosUsuario.name =  response.name
                             datosUsuario.idSocial = response.id;
                             datosUsuario.email = response.email;
                             datosUsuario.urlFoto = imgsource;

                     });

             }


        },
        function (response) { alert(JSON.stringify(response)) });

}