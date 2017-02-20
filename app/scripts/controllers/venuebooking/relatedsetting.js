'use strict';

angular.module('flatpcApp')
.controller('relatedSettingCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
       '会场预约','相关设置'
    ];
    //跳转到什么地方去
    $scope.parent = "relatedsetting";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.HUICHANG + "public/?s=admin/room/lists&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);