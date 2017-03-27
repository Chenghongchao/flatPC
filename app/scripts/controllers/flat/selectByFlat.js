'use strict';

angular.module('flatpcApp')
.controller('FlatCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '数据中心','师生信息','住宿信息'
    ];
    //跳转到什么地方去
    $scope.parent = "center";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.FRAME + "index.php?m=Coredata&c=CollegeClass&a=stay&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.FRAME + "index.php?m=Coredata&c=CollegeClass&a=stay&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode)
    a.target="page-frame";
    a.click();
}]);