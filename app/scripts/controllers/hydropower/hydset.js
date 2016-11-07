'use strict';

angular.module('flatpcApp')
.controller('hydSetCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '水电缴费','设置缴费单价'
    ];
    //跳转到什么地方去
    $scope.parent = "hydropower";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.HYDROPOWER + "index.php?m=Pay&c=Price&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);