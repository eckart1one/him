var app = angular.module('starter.controllers', [])

app.controller('DashCtrl', function($scope,Articulos) {
    $scope.articulos = Articulos.all();
});

app.controller('ChatsCtrl', function($scope, Preguntas ,$http,$sce,$ionicPopup,$ionicLoading) 
{  
    //constantes y cosas que se tienen que inicializar para el modulo
    $scope.nota =  {id: '', mensaje:''};
    $scope.respuesta = {id:'' , mensaje: ''};
    var link = 'http://www.birdev.mx/message_app/public/messages';
    var linkRespuesta = 'http://www.birdev.mx/message_app/public/response';

    $scope.respuesta.id = Preguntas.list();

    console.log("local : " + $scope.respuesta.id);
    // posiblemnte sirva despues
    // $scope.remove = function(respuesta) {
    //   Preguntas.remove(respuesta);
    // };

    $scope.actualiza = function(){
      linkGet = linkRespuesta +'/'+ $scope.respuesta.id;
      console.log($scope.respuesta);
       $http.get(linkGet).then(function successCallback(response) {
           $scope.respuesta.mensaje = response.data.data.mensaje;
           angular.forEach(response.data.children,function(response){
                  $scope.response.push(response.data);
                });
            //tenemos que elimiara el id o ponerlo vacio
           $scope.respuesta.id = '';
           Preguntas.actualiza( $scope.respuesta);
          
          
           $scope.$broadcast('scroll.refreshComplete');
           
        },function errorCallback(response) {
           var alertPopup = $ionicPopup.alert({
             title: 'Oh no!!',
             template: 'Ahun no tenemos una respuesta para ti :('
           });

           //terminamos con la animacion del refresh
           $scope.$broadcast('scroll.refreshComplete');
        });
    }

    $scope.enviar =  function()
    {  
        //creamos el ide unico
        $scope.nota.id =  new Date().getTime().toString();

        $ionicLoading.show({
            template: 'Enviando...'
          }).then(function(){
             console.log("The loading indicator is now displayed");
          });

        $http.post(link, { mensaje : $scope.nota.mensaje, identificador: $scope.nota.id, metodo : 'POST' }).then(function successCallback(res){
            $scope.response = res.data;
            $scope.respuesta.id =  $scope.nota.id;
            $scope.respuesta.mensaje =  '';
            $scope.nota.id = '';
            $scope.nota.mensaje = '';
            
            console.log("primer consol : " + $scope.respuesta.id);

            Preguntas.actualiza($scope.respuesta);
            var temp = Preguntas.list();
            //console.log('lista : '+Preguntas.list());
            console.log(temp);
            $ionicLoading.hide().then(function(){
              console.log("The loading indicator is now hidden");
            });

        },function errorCallback(response) {
          $ionicLoading.hide().then(function(){
              console.log("The loading indicator is now hidden");
          });
            var alertPopup = $ionicPopup.alert({
             title: 'Oh no!!',
             template: 'Ahun no tenemos una respuesta para ti :('
           });
          alertPopup.then(function(res) {
             console.log('Thank you for not eating my delicious ice cream cone');
           });
        });
    };  
});


app.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

app.controller('DiaCtrl', function($scope,$state,$stateParams, $location,   $ionicPopover) {
    $scope.fecha = new Date($stateParams.fecha);
});

app.controller('AccountCtrl', function($scope,$state, $location) {
    
        //crea el objeto para el datepiker
//  $scope.onezoneDatepicker = {
//    date: date, // MANDATORY                     
//    mondayFirst: false,                
//    months: months,                    
//    daysOfTheWeek: daysOfTheWeek,     
//    startDate: startDate,             
//    endDate: endDate,                    
//    disablePastDays: false,
//    disableSwipe: false,
//    disableWeekend: false,
//    disableDates: disableDates,
//    disableDaysOfWeek: disableDaysOfWeek,
//    showDatepicker: false,
//    showTodayButton: true,
//    calendarMode: false,
//    hideCancelButton: false,
//    hideSetButton: false,
//    highlights: highlights
//    callback: function(value){
//        // your code
//    }
//};
    
    $scope.onezoneDatepicker = {
    date: new Date(),  
    mondayFirst: false,                   
    disablePastDays: false,
    disableSwipe: true,
    disableWeekend: false,
    showDatepicker: true,
    showTodayButton: true,
    calendarMode: true,
    hideCancelButton: false,
    hideSetButton: false,
    highlights:  [
    {
        date: new Date(2016, 4, 30),
        color: '#8FD4D9',
        textColor: '#fff'
    },
    {
        date: new Date(2016, 1, 18)
    },
    {
        date: new Date(2016, 1, 19)
    },
    {
        date: new Date(2016, 1, 20)
    }
],

    callback: function(value){
        console.log(value);
        pulsado(value);
    }
};
    
    function pulsado(fecha)
    {
        $scope.onezoneDatepicker.highlights = [{
            date: fecha,
            color: '#8FD4D9',
            textColor: '#fff'
            }];
        
        //  $location.path('/dia',{fecha : fecha}) 
        $state.go('tab.calendario-detalle',{fecha : fecha}); 
    }

});

app.controller('articuloCompletoCtrl', function($scope, $stateParams, Articulos) {
  $scope.articulo = Articulos.get($stateParams.articuloId);
});
