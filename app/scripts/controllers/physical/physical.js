'use strict';

angular.module('flatpcApp')
.controller('physicalCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '体检查询','体检查询'
    ];
    //跳转到什么地方去
    $scope.parent = "physical";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.PHYSICAL + "index.php?m=Physical&c=Physical&a=index&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);