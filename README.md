# EcoReto
El juego con el que ganas premios mientras usas ecobici.


Descripción:
                Sistema de juegos colaborativos que permite que los propios usuarios ayuden a dar solución a los problemas del                  sistema ecobici a través de retos inteligentes.
                
Dependencias:
                XCODE  6.1        https://developer.apple.com/xcode/downloads/
                Android SDK        http://developer.android.com/sdk/index.html
                phonegap           http://phonegap.com/
                push               cordova plugin add https://github.com/phonegap-build/PushPlugin.git
                geolocalizacion    cordova plugin add org.apache.cordova.geolocation
                inappbrowser        cordova plugin add https://github.com/apache/cordova-plugin-inappbrowser.git
                
Configuración: 
                1.-Instalar las versiones  de android SDK 19 
                2.-Instalar Xcode  version para ios 8
                3.-Instalar  vesion de phone gap
                                Guia  de Instalacion :  http://phonegap.com/install/
                NOTA: Los  plugins  se instalan  unicamente   si se  crea un projecto nuevo  y quierens  anadir  ECORETOS a tu  nuevo proyecto.                                
               
Configuración de desarrollo local: 
                Agregar las variables de entorno   para que phonegap encuentre el SDK de android
                
                export PATH=${PATH}:/Users/-nombre de usurario-/Library/Android/sdk/tools:/Users/-nombre de usurario-/Library/Android/sdk/platform-tools
                
                export PATH=$PATH:$ANT_HOME/bin

                
Despliegue:     

