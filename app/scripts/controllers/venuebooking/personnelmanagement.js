'use strict';

angular.module('flatpcApp')
.controller('personnelManagementCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '会场预约','人员管理'
    ];
    //跳转到什么地方去
    $scope.parent = "personnelmanagement";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.HUICHANG + "public/?s=admin/auditor/lists&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);