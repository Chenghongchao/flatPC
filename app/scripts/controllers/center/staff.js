'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:formCtrl
 * @description
 * # formCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('staffCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '用户中心','教职工认证列表'
    ];
    //跳转到什么地方去
    $scope.parent = "center";
    $rootScope.loading = false;
    var a = document.createElement('a');
    a.href = AppConfig.FRAME + "index.php?m=Ucenter&c=Teach&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);