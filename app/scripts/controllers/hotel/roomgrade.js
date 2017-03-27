'use strict';

angular.module('flatpcApp')
.controller('roomGradeCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '宾馆预约','房间管理'
    ];
    //跳转到什么地方去
    $scope.parent = "bookinggrade";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.HOTEL + "index.php?m=Admin&c=Hourse&a=lists&schoolcode="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.HOTEL + "index.php?m=Admin&c=Hourse&a=lists&schoolcode="+AppConfig.schoolCode)
    a.target="page-frame";
    a.click();
}]);