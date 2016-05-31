var app = angular.module('starter.controllers', [])

app.controller('DashCtrl', function($scope,Articulos) {
    $scope.articulos = Articulos.all();
});




app.controller('ChatsCtrl', function($scope, Chats ,$http,$sce) 
{   
    $scope.res =  [];
    $scope.nota =  {id: '', mensaje:''};
    $scope.respuesta = {id:'' , mensaje: ''};
    var link = 'http://www.birdev.mx/message_app/public/messages';


    $scope.actualiza = function(){
      linkGet = link +'/'+ $scope.respuesta.id;
      console.log(link +'/'+ $scope.respuesta.id);
        
        $http.get( linkGet).then(function(res){
          console.log(res);
          console.log(res.data.data.mensaje);
          
          $scope.respuesta.mensaje = res.data.data.mensaje;

          console.log($scope.respuesta.mensaje);
          //funcion para recorreo el array 
          angular.forEach(res.data.children,function(res){
            $scope.res.push(res.data);
            console.log(res.data);
          });

           console.log($scope.res);

           $scope.$broadcast('scroll.refreshComplete');

        }, function(res){
          console.log(res);
        }); 
    }

    $scope.enviar =  function(){  
        console.log($scope.nota);
        //creamos el ide unico
        $scope.nota.id =  new Date().getTime().toString();

        $http.post(link, { mensaje : $scope.nota.mensaje, identificador: $scope.nota.id }).then(function (res){
            $scope.response = res.data;
            $scope.respuesta.id =  $scope.nota.id;

            $scope.nota.id = '';
            $scope.nota.mensaje = '';
            console.log($scope.nota);
        });

    };  

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
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
