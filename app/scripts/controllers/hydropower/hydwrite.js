'use strict';

angular.module('flatpcApp')
.controller('hydWriteCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '水电缴费','水电录入'
    ];
    //跳转到什么地方去
    $scope.parent = "hydropower";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.HYDROPOWER + "index.php?m=Pay&c=Entry&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);