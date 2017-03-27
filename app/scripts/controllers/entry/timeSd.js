'use strict';

angular.module('flatpcApp')
.controller('timeSdCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '出入管理','统计管理','出入统计','出入时段统计'
    ];
    //跳转到什么地方去
    $scope.parent = "entry";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.FRAME+"index.php?m=ExitManagement&c=ExitCount&a=slot&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.FRAME+"index.php?m=ExitManagement&c=ExitCount&a=slot&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode)
    a.target="page-frame";
    a.click();
}]);