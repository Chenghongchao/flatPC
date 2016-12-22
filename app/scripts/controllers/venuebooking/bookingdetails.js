'use strict';

angular.module('flatpcApp')
.controller('bookingDetailsCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '会场预定','预约详情'
    ];
    //跳转到什么地方去
    $scope.parent = "bookingdetails";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.HUICHANG + "public/?s=admin/order/lists&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);