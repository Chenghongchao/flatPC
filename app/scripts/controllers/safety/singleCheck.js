'use strict';

angular.module('flatpcApp')
.controller('singleCheckCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '公寓管理','安全检查','单项检查统计'
    ];
    //跳转到什么地方去
    $scope.parent = "flat";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.FRAME+"index.php?m=SafetyCheck&c=SingleCheck&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.FRAME+"index.php?m=SafetyCheck&c=SingleCheck&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode)
    a.target="page-frame";
    a.click();
}]);