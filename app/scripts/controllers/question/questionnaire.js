'use strict';

angular.module('flatpcApp')
.controller('questionNaireCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '问卷系统','问卷设置'
    ];
    //跳转到什么地方去
    $scope.parent = "questionnaire";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.QUESTION + "index.php?m=Admin&c=Paper&a=lists&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);