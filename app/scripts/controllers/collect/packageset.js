'use strict';

angular.module('flatpcApp')
.controller('packagesetCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '预报到管理','新生礼包','礼包设置'
    ];
    //跳转到什么地方去
    $scope.parent = "report";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.REPORT + "index.php?m=Admin&c=ReceiveConfig&a=index&schoolid="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.REPORT + "index.php?m=Admin&c=ReceiveConfig&a=index&schoolid="+AppConfig.schoolCode) 
    a.target="page-frame";
    a.click();
}]);