'use strict';

angular.module('flatpcApp')
.controller('questionSettingCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '服务测评','问卷设置'
    ];
    //跳转到什么地方去
    $scope.parent = "questionsetting";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.WENJUAN + "index.php?m=Admin&c=Paper&a=lists&schoolcode="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.WENJUAN + "index.php?m=Admin&c=Paper&a=lists&schoolcode="+AppConfig.schoolCode)
    a.target="page-frame";
    a.click();
}]);