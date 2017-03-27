'use strict';

angular.module('flatpcApp')
.controller('formPriceGradeCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '采供系统','报价管理'
    ];
    //跳转到什么地方去
    $scope.parent = "formPriceGrade";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.FORMINING + "index.php?m=Admin&c=Quotation&a=index&schoolcode="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.FORMINING + "index.php?m=Admin&c=Quotation&a=index&schoolcode="+AppConfig.schoolCode)
    a.target="page-frame";
    a.click();
}]);