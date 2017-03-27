'use strict';

angular.module('flatpcApp')
.controller('newStudentOrderCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '迎新系统','迎新系统','新生名单'
    ];
    //跳转到什么地方去
    $scope.parent = "reportSecond";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.REPORT + "index.php?m=Admin&c=Freshman&a=search&schoolid="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.REPORTNEW + "index.php?m=Admin&c=NewStudentList&a=index&schoolcode="+AppConfig.schoolCode) 
    a.target="page-frame";
    a.click();
}]);