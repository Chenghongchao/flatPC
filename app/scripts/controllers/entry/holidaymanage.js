'use strict';

angular.module('flatpcApp')
.controller('holidaymanageCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '出入管理','日常操作','假日管理'
    ];
    //跳转到什么地方去
    $scope.parent = "entry";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.FRAME+"index.php?m=ExitManagement&c=Holiday&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);