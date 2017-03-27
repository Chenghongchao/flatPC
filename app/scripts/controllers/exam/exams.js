'use strict';

angular.module('flatpcApp')
.controller('examsCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '考试系统','试卷设置'
    ];
    //跳转到什么地方去
    $scope.parent = "exam";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.EXAM + "index.php?m=Home&c=Exams&a=index&schoolcode="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.EXAM + "index.php?m=Home&c=Exams&a=index&schoolcode="+AppConfig.schoolCode)
    a.target="page-frame";
    a.click();
}]);