angular.module('flatpcApp')
.controller('baseSetupCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '系统设置','账号管理','基础设置'
    ];
    //跳转到什么地方去
    $scope.parent = "flat";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    
    // var a = document.createElement('a');
    // a.href = AppConfig.FRAME + "index.php?m=Stmessage&c=CollegeAccount&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode+"&adminid="+AppConfig.adminId;
    // a.target="page-frame";
    // a.click();

    var a = document.createElement('a');
    $("#mainframe",parent.document.body).attr("src", AppConfig.FRAME + "index.php?m=SystemSetup&c=BaseSetup&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode+"&adminid="+AppConfig.adminId) 
    a.target="page-frame";
    a.click();

}])