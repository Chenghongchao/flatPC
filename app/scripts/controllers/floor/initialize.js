'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:formCtrl
 * @description
 * # formCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('initializeCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    //跳转到什么地方去
    $scope.parent = "flat";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.FRAME+"index.php?m=Apartment&c=Init&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.FRAME+"index.php?m=Apartment&c=Init&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode)
    a.target="page-frame";
    a.click();
}]);