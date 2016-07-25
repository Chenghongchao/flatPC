'use strict';

angular.module('flatpcApp')
.controller('exampeopleCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
         '考试系统','人员管理','人员管理'
    ];
    //跳转到什么地方去
    $scope.parent = "exam";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.EXAM + "index.php?m=Home&c=people&a=index&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);