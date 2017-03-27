'use strict';

angular.module('flatpcApp')
.controller('actionwarncustomCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '出入管理','日常操作','行为预警自定义操作'
    ];
    //跳转到什么地方去
    $scope.parent = "entry";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.FRAME+"index.php?m=ExitManagement&c=AlarmSet&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.FRAME+"index.php?m=ExitManagement&c=AlarmSet&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode)
    a.target="page-frame";
    a.click();
}]);