'use strict';

angular.module('flatpcApp')
.controller('formNoticeCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '采供系统','公告通知'
    ];
    //跳转到什么地方去
    $scope.parent = "formNotice";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.FORMINING + "index.php?m=Admin&c=Notice&a=index&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);