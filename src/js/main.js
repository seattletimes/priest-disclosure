// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
require("angular");

var app = angular.module("priest-table", []);

app.controller("PriestController", ["$scope", function($scope) {
  $scope.all = priestData.sort(function(a,b) {
    if (a.Name > b.Name) {
      return 1
    } else {
      return -1
    };
  });

  $scope.expanded = false;
  $scope.searched = false;

  $scope.shown = $scope.all.slice(0,10);

  $scope.expand = function() {
    $scope.shown = $scope.all;
    $scope.expanded = true;
  };
  $scope.hide = function() {
    $scope.shown = $scope.all.slice(0,10);
    $scope.expanded = false;
    $scope.searched = false;
    $scope.searchText = "";
  };

  $scope.search = debounce(function() {
    var value = $scope.searchText;
    if (!value) {
      $scope.shown = $scope.all.slice(0,10);
      $scope.expanded = false;
      $scope.searched = false;
    } else {
      value = value.toLowerCase();
      var filtered = $scope.all.filter(function(item) {
        return item.Assignments.toLowerCase().indexOf(value) > -1;
      });
      $scope.shown = filtered.slice(0,50);
      $scope.searched = true;
    }
    $scope.$apply();
  });
}]);

var debounce = function(f, interval) {
  var timeout = null;
  return function() {
    if (timeout) return;
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    timeout = setTimeout(function() {
      f.apply(null, args);
      timeout = null;
    }, interval || 400);
  };
}
