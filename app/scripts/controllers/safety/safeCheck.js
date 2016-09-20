'use strict';

angular.module('flatpcApp')
.controller('safeCheckCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '公寓管理','安全检查','安全检查'
    ];
    //跳转到什么地方去
    $scope.parent = "flat";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.FRAME+"index.php?m=SafetyCheck&c=Index&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode+"#3";
    a.target="page-frame";
    a.click();
}]);