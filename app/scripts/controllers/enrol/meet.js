'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:formCtrl
 * @description
 * # formCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('meetCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '报名系统','报名项目'
    ];
    //跳转到什么地方去
    $scope.parent = "meet";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    //a.href = AppConfig.MEET + "public/?s=admin/activity/lists&schoolcode="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.MEET + "public/?s=admin/activity/lists&schoolcode="+AppConfig.schoolCode)
    a.target="page-frame";
    a.click();
}]);