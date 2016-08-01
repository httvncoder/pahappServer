angular.module('starter.controllers', [])

.controller('EvictionsCtrl', function($scope, Evictions) {
    $scope.evictions = Evictions.all();
})
.controller('EvictionDetailCtrl', function($scope, $stateParams, Evictions) {
  $scope.eviction = Evictions.get($stateParams.evictionId);
})

.controller('AssembliesCtrl', function($scope, Assemblies) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.assemblies = Assemblies.all();
  $scope.remove = function(assembly) {
    Assemblies.remove(assembly);
  };
})

.controller('AssemblyDetailCtrl', function($scope, $stateParams, Assemblies) {
  $scope.assembly = Assemblies.get($stateParams.assemblyId);
})

.controller('OptionsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
