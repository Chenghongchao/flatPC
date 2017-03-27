'use strict';

angular.module('flatpcApp')
.controller('reportdirectoryCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '预报到管理','预报到管理','预报到名录'
    ];
    //跳转到什么地方去
    $scope.parent = "report";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.REPORT + "index.php?m=Admin&c=Freshman&a=search&schoolid="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.REPORT + "index.php?m=Admin&c=Freshman&a=search&schoolid="+AppConfig.schoolCode) 
    a.target="page-frame";
    a.click();
}]);