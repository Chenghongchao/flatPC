'use strict';

angular.module('flatpcApp')
.controller('padManageCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '系统设置','PAD管理','功能管理'
    ];
    //跳转到什么地方去
    $scope.parent = "admin";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.FRAME+"index.php?m=SystemSetup&c=PADSetup&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);