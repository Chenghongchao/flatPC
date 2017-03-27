'use strict';

angular.module('flatpcApp')
.controller('relatedSetCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '公车预约','相关设置'
    ];
    //跳转到什么地方去
    $scope.parent = "relatedset";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.BUS + "public/?s=admin/forms/config&schoolcode="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.BUS + "public/?s=admin/forms/config&schoolcode="+AppConfig.schoolCode) 
    a.target="page-frame";
    a.click();
}]);