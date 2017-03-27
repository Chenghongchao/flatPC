'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:verifyCtrl
 * @description
 * # verifyCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('verifyCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '数据中心','用户中心','实名审核'
    ];
    //跳转到什么地方去
    $scope.parent = "center";
    $rootScope.loading = false;
    var a = document.createElement('a');
    //a.href = AppConfig.UCENTER+"index.php?m=Admin&c=Index&a=checklist&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.UCENTER+"index.php?m=Admin&c=Index&a=checklist&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode) 
    a.target="page-frame";
    a.click();
}]);