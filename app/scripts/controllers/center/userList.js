'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('UserListCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '数据中心','用户中心','用户列表'
    ];
    //跳转到什么地方去
    $scope.parent = "center";
    $rootScope.loading = false;
    var a = document.createElement('a');
    //a.href =AppConfig.FRAME+"index.php?m=Ucenter&c=User&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    $("#mainframe",parent.document.body).attr("src", AppConfig.FRAME+"index.php?m=Ucenter&c=User&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode) 
    a.target="page-frame";
    a.click();
}]);