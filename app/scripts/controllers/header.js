'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('HeaderCtrl', ['$scope','$rootScope','PublicService','AppConfig',
  function($scope,$rootScope,PublicService,AppConfig) {
        $rootScope.headerSwitch = function(t,name){
            $rootScope.frame = t?true:false;
            var a = document.createElement('a');
            a.target="page-tab";
            
            switch(name){
                case 'wechat':
                    if(!$rootScope.menuCheck(318)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    
                    a.href = "/index.php?s=/addon/HomePage/HomePage/lists.html";
                    a.click();
                    break;
                case 'food':
                    if(!$rootScope.menuCheck(317)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    a.href="/index.php?s=/addon/Dingcan/Dingcan/lists.html";
                    a.click();
                    break;
                case 'water':
                    if(!$rootScope.menuCheck(370)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    a.href="/index.php?s=/addon/WechatWater/WechatWater/lists.html";
                    a.click();
                    break;
                case 'mall':
                    if(!$rootScope.menuCheck(459)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    a.href="/index.php?s=/addon/WechatMall/WechatMall/sc.html";
                    a.click();
                    break;
                case 'flat':
                    if(!$rootScope.menuCheck(1)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    break;
                case 'repair':
                    if(!$rootScope.menuCheck(4)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    a.href="/index.php?s=/addon/RepairSystem/RepairSystem/lists.html";
                    a.click();
                    break;
                case 'pay':
                    if(!$rootScope.menuCheck(5)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    
                    swal("提示","敬请期待", "info"); 
                    return;
                    
                case 'center':
                    if(!$rootScope.menuCheck(2)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    break;
                case 'admin':
                    if(!$rootScope.menuCheck(3)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    break;
                case 'message':
                    if(!$rootScope.menuCheck(319)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    // location.href="/messageadmin";
                    a.href="/messageadmin";
                    a.click();
                    break;
                case 'graduate':
                    if(!$rootScope.menuCheck(371)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    break;
                case 'order':
                    if(!$rootScope.menuCheck(367)){
                        
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    break;
                case 'report':
                    if(!$rootScope.menuCheck(401)){
                        
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    break;
                case 'exammessage':
                    if(!$rootScope.menuCheck(416)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    break;
                case 'entry':
                    if(!$rootScope.menuCheck(421)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    break;
            }
            $rootScope.sysMenu[0] = name;
            $rootScope.sysMenu[1] = name;
        }
        
        $scope.tipShow = function(str){
            swal("提示","请联系客服电话0571-"+str+" 开通权限", "info"); 
        }
        $scope.logout = function () {
            PublicService.logout().success(function (data) {
                $rootScope.loading = false;
                    if(data.code == 0){
                        function delcookie(name){ 
                            var date=new Date(); 
                            date.setTime(date.getTime()-10000); 
                            document.cookie=name+"=v; expires="+date.toGMTString(); 
                        }
                        delcookie('adminId');
                        delcookie('token');
                        delcookie('nodeIds');
                        delcookie('schoolCode');
                        delcookie('userName');
                        delcookie('roleName');
                        delcookie('roleId');
                        delcookie('userAccount');
                        delcookie('isOpenBed');
                        delcookie('week');
                        delcookie('month');
                        delcookie('day');
                        delcookie('bed');
                        delcookie('pass');
                        delcookie('photo');
                        delcookie('role');
                        delcookie('takephoto');
                        delcookie('tokenMessage');
                        delcookie('schoolname');
                        delcookie('check');
                        
                        sessionStorage.removeItem('adminId');
                        sessionStorage.removeItem('token');
                        sessionStorage.removeItem('nodeIds');
                        sessionStorage.removeItem('schoolCode');
                        sessionStorage.removeItem('userName');
                        sessionStorage.removeItem('roleName');
                        sessionStorage.removeItem('roleId');
                        sessionStorage.removeItem('userAccount');
                        sessionStorage.removeItem('isOpenBed');
                        sessionStorage.removeItem('week');
                        sessionStorage.removeItem('month');
                        sessionStorage.removeItem('day');
                        sessionStorage.removeItem('bed');
                        sessionStorage.removeItem('pass');
                        sessionStorage.removeItem('photo');
                        sessionStorage.removeItem('role');
                        sessionStorage.removeItem('takephoto');
                        sessionStorage.removeItem('check');
                        sessionStorage.removeItem('tokenMessage');
                        sessionStorage.removeItem('schoolname');
                        var form = document.createElement("form");
                        form.target = "test";
                        form.method = "post";
                        if("GY"==localStorage.logoutTag){
                            form.action = "http://www.houqinbao.com/login/#/login";
                        }else{
                            form.action = "/index.php?s=/Home/User/logout.html";

                        }
                        
                        form.submit();
                        location.href = '/';
                        
                    }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            })
        }
        var toggles = localStorage.toggles || "";
        $scope.media = {
            old:'',
            newPassword:'',
            confirm:'',
            name:AppConfig.userName,
            wechat:!new RegExp(",wechat,").test(","+toggles+","),
            flat:!new RegExp(",flat,").test(","+toggles+","),
            repair:!new RegExp(",repair,").test(","+toggles+","),
            food:!new RegExp(",food,").test(","+toggles+","),
            water:!new RegExp(",water,").test(","+toggles+","),
            mall:!new RegExp(",mall,").test(","+toggles+","),
            pay:!new RegExp(",pay,").test(","+toggles+","),
            center:!new RegExp(",center,").test(","+toggles+","),
            admin:!new RegExp(",admin,").test(","+toggles+","),
            message:!new RegExp(",message,").test(","+toggles+","),
            graduate:!new RegExp(",graduate,").test(","+toggles+","),
            order:!new RegExp(",order,").test(","+toggles+","),
            report:!new RegExp(",report,").test(","+toggles+","),
            exammessage:!new RegExp(",exammessage,").test(","+toggles+","),
            entry:!new RegExp(",entry,").test(","+toggles+",")
        }
        $scope.change = function name(params) {
            swal("提示","请联系客服电话0571-28256212 修改密码", "info"); 
        }
        $scope.editSave = function (fun) {
            if($scope.media.old.length > 0 && $scope.media.newPassword.length > 0 && $scope.media.confirm.length > 0)
            {
                if($scope.media.old == $scope.media.newPassword){
                    swal("提示","新密码和旧密码不可以相同！", "error"); 
                    return;
                }else if($scope.media.confirm != $scope.media.newPassword){
                    swal("提示","两次输入的密码不相同！", "error"); 
                    return;
                }else{
                    $rootScope.loading = true;
                    PublicService.password({
                        token:AppConfig.token,
                        adminid:AppConfig.adminId,
                        password:$scope.media.old,
                        newpassword:$scope.media.newPassword,
                        renewpassword:$scope.media.confirm
                    }).success(function (data) {
                        $rootScope.loading = false;
                            if(data.code == 0){
                                swal("提示","修改成功！", "success"); 
                                if(fun && typeof fun == 'function') fun();
                            }
                            else
                                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    })
                }
            }
        }
        $scope.toggleSave = function () {
            var str = "";
            if(!$scope.media.wechat)str += "wechat,";
            if(!$scope.media.flat)str += "flat,";
            if(!$scope.media.repair)str += "repair,";
            if(!$scope.media.food)str += "food,";
            if(!$scope.media.water)str += "water,";
            if(!$scope.media.mall)str += "mall,";
            if(!$scope.media.pay)str += "pay,";
            if(!$scope.media.center)str += "center,";
            if(!$scope.media.admin)str += "admin,";
            if(!$scope.media.message)str += "message,";
            if(!$scope.media.graduate)str += "graduate,";
            if(!$scope.media.order)str += "order,";
            if(!$scope.media.report)str += "report,";
            if(!$scope.media.exammessage)str += "exammessage,";
            if(!$scope.media.entry)str += "entry,";

            if(str.length>0){
                localStorage.toggles = str.substring(0,str.length-1);
            }else localStorage.toggles ="";
            if($scope.topResize)$scope.topResize();
        }
        
        $scope.headerMenu = function (n) {
            $scope.topResize();
            return $rootScope.menuCheck(n);
        }
        $scope.showqq = function () {
            var a = document.createElement('a');
            a.target="_blank";
            a.href="http://crm2.qq.com/page/portalpage/wpa.php?uin=800039519&ref=&f=1&ty=1&ap=&as=";
            a.click();
        }
    }]);