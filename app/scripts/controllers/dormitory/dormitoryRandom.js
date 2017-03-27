'use strict';

angular.module('flatpcApp')
.controller('dormitoryRandomCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '公寓管理','宿舍检查','抽查评分'
    ];
    //跳转到什么地方去
    $scope.parent = "flat";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.FRAME+"index.php?m=EvaluationMining&c=GradeForSpot&a=index&schoolcode=11481&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.FRAME+"index.php?m=EvaluationMining&c=GradeForSpot&a=index&schoolcode=11481&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode)
    a.target="page-frame";
    a.click();
}]);