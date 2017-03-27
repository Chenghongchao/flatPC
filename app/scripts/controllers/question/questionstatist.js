'use strict';

angular.module('flatpcApp')
.controller('questionStatistCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '问卷系统','统计管理'
    ];
    //跳转到什么地方去
    $scope.parent = "questionnaire";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.QUESTION + "index.php?m=Admin&c=Tongji&a=selPaper&schoolcode="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.QUESTION + "index.php?m=Admin&c=Tongji&a=selPaper&schoolcode="+AppConfig.schoolCode)
    a.target="page-frame";
    a.click();
}]);