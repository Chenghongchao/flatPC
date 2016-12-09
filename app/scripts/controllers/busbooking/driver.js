'use strict';

angular.module('flatpcApp')
.controller('DriverCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '公车预约','司机管理'
    ];
    //跳转到什么地方去
    $scope.parent = "driver";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.BUS + "public/?s=admin/driver/lists&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);