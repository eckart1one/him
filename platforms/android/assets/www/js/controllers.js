var app = angular.module('starter.controllers', [])

app.controller('DashCtrl', function($scope,Articulos) {
    $scope.articulos = Articulos.all();
});

app.controller('ChatsCtrl', function($scope, Chats ,$http,$sce) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  // var defaultHTTPHeaders = {
  //     'Content-Type' :  'application/json',
  //     'Accept' : 'application/json'
  // };
    
  //$http.defaults.headers.post = defaultHTTPHeaders;
    
    $scope.nota =  {id: new Date().getTime().toString(), mensaje:''};
    console.log($scope.nota.descripcion);
  
    $scope.enviar =  function(){
      
//    var urlCompleta = 'http://www.birdev.mx/message_app/public/messages';
//    var postUrl = $sce.trustAsResourceUrl(urlCompleta);
//    $http.post(postUrl,$scope.nota).then(function(){
//        alert('Guardado');
//    },function(){
//        alert('error');
//    });  
      
      console.log($scope.nota.id);
      console.log($scope.nota.mensaje);
       var link = 'http://www.birdev.mx/message_app/public/messages';
        $http.post(link, {mensaje : $scope.nota.mensaje,identificador: $scope.nota.id}).then(function (res){
            $scope.response = res.data;
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
