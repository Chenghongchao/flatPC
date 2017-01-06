'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('CounselorCtrl', ['$scope','$rootScope','CollegeService','$filter','RoleService','AppConfig',
  function ($scope,$rootScope,CollegeService,$filter,RoleService,AppConfig) {
    $scope.form = {
        status:0,
        username:'',
        password:'',
        password1:'',
        useraccount:'',
        newpassword:'',
        renewpassword:'',
        phone:'',
        collegeid:'',
        jobnumber:'',
        roleid:'',
        adminid:'',
        isshow:false,
        selectClassList:[],
        selectCollegeId:'',
        flag:0,
        classes:[],  //选择的班级数据
        classnames: null,
        removeClass:function(index){
            this.classes.splice(index,1);
            if(this.classes.length < 1){
                this.addClass();
            }
        },
        addClass:function () { //selectClassList = [], selectCollegeId = '', flag = 0
            
            //关闭其他下拉框
            this.classes.forEach(function (data, index, array) {
                if(data.showClassMenu) data.showClassMenu = false;
            })
            //新增一条记录
            var cla = {
                // collegeId:$scope.media.collegeid || '',
                collegeId:$scope.form.selectCollegeId,
                collegeList:$rootScope.treeCollege,
                classId:$scope.media.classid || '',
                classList:[],
                selectClassList:$scope.form.selectClassList,
                checkedAll: false,  //是否全选
                showClassMenu: false     //是否显示班级下拉
            }
            $scope.selecter.classSelecter(cla);
            if($scope.form.flag != 1)
                $scope.form.classCheckEvent(cla);
            this.classes.push(cla);
            $scope.form.flag = 1;
            $scope.form.selectClassList = [];
            $scope.form.selectCollegeId = '';
        },
        // getClass:function(){
        //     var ids = [];
        //     if(this.classes && this.classes.length==1 && "0"==this.classes[0].classId){
        //         $scope.form.flag = 1;
        //     }else{
        //         var check = function(id){
        //             for(var i=0;i < ids.length;i++){
        //                 if(id.length < 1 || ids[i] == id)return false;
        //             }
        //             return true;
        //         };
        //         this.classes.forEach(function (cla) {
        //             if(check(cla.classId))
        //                 ids.push(cla.classId);
        //         })
        //         ids = ids.length>0?ids.toString():"";
        //         $scope.form.flag = 0;
        //     }
        //     return ids;
        // }
        getClass:function(){
            var ids = {
                collegeids:[], //学院ID集合
                classids:[] //班级ID集合
            };
            var arr = [];
            this.classes.forEach(function (cla) { 
                for(var i = 0; i < cla.classList.length; i++){ 
                    if(cla.classList[i].checked == true){
                        arr.push( cla.classList[i].classId ); 
                    } 
                    
                }
                
                // if(cla.checkedAll){ //选择了全部班级，则记录该学院ID
                //     if(ids.collegeids.indexOf(cla.collegeId)==-1){
                //         ids.collegeids.push(cla.collegeId);
                //     }
                // }else{ //记录该班级ID
                //     cla.classList.forEach(function (data, index, array) {
                //         if(data.checked && ids.classids.indexOf(data.classId)==-1){
                //             ids.classids.push(data.classId);
                //         }
                //     })
                // }
                
                // else if(ids.collegeids.indexOf(cla.collegeId)==-1 //记录该班级ID
                //       && ids.classids.indexOf(cla.classId)==-1){
                //     ids.classids.push(cla.classId);
                // }
            })
            ids.classids[0] = arr.join(",");
            console.log(ids);
            return ids;
        },
        classCheckAll : function(cla){
            var names = [];
            cla.classList.forEach(function (data, index, array) {
                data.checked = cla.checkedAll;
                if(cla.checkedAll){
                    names[names.length] = data.className;
                }
            })
            if(names.length>2){
                cla.text = names[0]+","+names[1]+"…";
            }else if(names.length==2){
                cla.text = names[0]+","+names[1];
            }else if(names.length==1){
                cla.text = names[0];
            }else{
                cla.text = null;
            }
        },
        classCheckEvent : function(cla){
            var names = [];
            cla.classList.forEach(function (data, index, array) {
                if(data.checked){
                    names[names.length] = data.className;
                }else if(cla.checkedAll){
                    cla.checkedAll = false;
                }
            })
            if(names.length==cla.classList.length){
                cla.checkedAll = true;
            }
            if(names.length>2){
                cla.text = names[0]+","+names[1]+"…";
            }else if(names.length==2){
                cla.text = names[0]+","+names[1];
            }else if(names.length==1){
                cla.text = names[0];
            }else{
                cla.text = null;
            }
        }
    }
    //搜索姓名/账号
    $scope.searchBtn = function(fun){
        $rootScope.loading = true;
         console.log($scope.media);
        CollegeService.getManagerList($scope.media).success(function (data){
            console.log(data);
           if(data.code == 0){
                $scope.list = data.list.dataList;
                $scope.media.recordCount = data.list?data.list.recordCount:0;
                $scope.media.pageCount = data.list?data.list.pageCount:0;
                //班级名称处理成数组
                angular.forEach($scope.list, function(data,index,array){
                    angular.forEach(data.classList, function(data_class,index_class,array_class){
                        var name_array = [];
                        if(data_class.classname){
                            name_array = data_class.classname.split(",");
                        }
                        data_class.classname = name_array;                        
                    });
                });
            }else if(data.code == 4037){
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                location.href="#login";$rootScope.loading = false;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
            
            $rootScope.loading = false;
        })
        

    }

    // 重置密码
    $scope.resetSave = function(fun){
        $rootScope.loading = true;
        CollegeService.resetPwd({
            useraccount:$scope.form.useraccount,
            newpassword:$scope.form.newpassword,
            renewpassword:$scope.form.renewpassword
        }).success(function(data){
            console.log(data)

            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "保存成功！", "success"); 
                refresh();
                if(fun && typeof fun == 'function') fun();
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
        })
    }

    $scope.adddataInit = function (user) {
        
        $scope.form.status= user.adminId ? 1 : 0;
        $scope.form.username= user.userName || '';
        $scope.form.password= '';
        $scope.form.password1= '';
        $scope.form.useraccount=user.userAccount || '';
        $scope.form.phone=user.phone || '';
        $scope.form.jobnumber=user.jobNumber || '';
        $scope.form.roleid= '' + (user.roleId || '');
        $scope.form.classes = [];
        if(user.classIds && user.classIds.length>0){
            user.classIds.forEach(function (cla) {
                var item = {
                    classId:cla.classId,
                    checkedAllClass: false,  //是否全选
                    showClassMenu: false     //是否显示班级下拉
                }
                $scope.selecter.classSelecter(item);
                $scope.form.classes.push(item);
            })
        }else{
            $scope.form.addClass();
        }
        $scope.form.adminid=user.adminId || '';
        
       
    }
      
    $scope.dataInit = function (user) {
        $scope.form.status= user.adminId ? 1 : 0;
        $scope.form.username= user.userName || '';
        $scope.form.password= '';
        $scope.form.password1= '';
        $scope.form.useraccount=user.userAccount || '';
        $scope.form.phone=user.phone || '';
        $scope.form.jobnumber=user.jobNumber || '';
        $scope.form.roleid= '' + (user.roleId || '');
        $scope.form.classes = [];
        $scope.form.isshow = user.isshow?true:false;
        if(user.classIds && user.classIds.length>0){
            user.classIds.forEach(function (cla) {
                var item = {
                    classId:cla.classId,
                    checkedAllClass: false,  //是否全选
                    showClassMenu: false     //是否显示班级下拉
                }
                $scope.selecter.classSelecter(item);
                $scope.form.classes.push(item);
            })
        }else{
            $scope.form.addClass();
        }
        $scope.form.adminid=user.adminId || '';

        CollegeService.getAdminclasslist({
            adminid:$scope.form.adminid,
            schoolcode:AppConfig.schoolCode
        }).success(function (data) {
            $rootScope.loading = false;
            if(data.code == 0){
                for(var i = 0; i < data.list.collegelist.length; i++){
                    var info =  data.list.collegelist[i];
                    // var cla = {
                    //     // collegeId:$scope.media.collegeid || '',
                    //     collegeId:selectCollegeId,
                    //     collegeList:$rootScope.treeCollege,
                    //     classId:$scope.media.classid || '',
                    //     classList:[],
                    //     selectClassList:selectClassList,
                    //     checkedAll: false,  //是否全选
                    //     showClassMenu: false     //是否显示班级下拉
                    // }
                    // $scope.selecter.classSelecter(cla);
                    $scope.form.selectClassList = info.classList;
                    $scope.form.selectCollegeId = ''+info.collegeid+'';
                    $scope.form.flag            = 0;
                    $scope.form.addClass();
                }
                $(".clearfix:eq(0)").hide();
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
        })
         

    }
    //二级连选的select
    $scope.selecter = {    
        collegeSelecter : function(cla){
            //用collegeId获取classList
            var college = cla.collegeId?$filter('filter')($rootScope.treeCollege[0].collegeList,{collegeId:cla.collegeId}):[];
            if(college.length>0 && college[0].classList){
                for(var i = 0; i < college[0].classList.length; i++){
                    for(var j = 0; j < cla.selectClassList.length; j++){
                        if(cla.selectClassList[j].classid == college[0].classList[i].classId){
                            college[0].classList[i].checked = true;
                        }
                    }
                }
                
                // $scope.form.classCheckAll(cla);
                cla.classList = angular.copy(college[0].classList);
            }
        },
        classSelecter : function(cla){
            //用classId反向获取collegeId和classList
            if(cla.classId && "1"!=cla.classId){
                var college = $rootScope.treeCollege[0].collegeList;
                for(var i=0 ; i < college.length;i++){
                    var list = cla.classId?$filter('filter')(college[i].classList,{classId:cla.classId}):[];
                    if(list.length > 0 && list[0].classId==cla.classId){
                        cla.collegeId = college[i].collegeId + "";
                        cla.classList = angular.copy( college[i].classList);
                        cla.classId = cla.classId + "";
                        break;
                    }
                }
            }else if(cla.collegeId){
                this.collegeSelecter(cla);
            }
        }
    }
    $scope.addSave = function (fun) {
        var arrayIds = $scope.form.getClass();
        if($scope.form.password.length < 1 || $scope.form.username.length < 1 || $scope.form.jobnumber.length < 1 || $scope.form.phone.length < 1 || $scope.form.roleid.length < 1 || $scope.form.useraccount.length < 1)return;
		if($scope.form.password != $scope.form.password1){
            swal("提示", "两次密码输入不一致", "warning"); 
            return;
        }else if(arrayIds.collegeids.length < 1 && arrayIds.classids.length < 1){
            swal("提示", "请选择班级", "warning"); 
            return;
        }
        $rootScope.loading = true;
        CollegeService.addManager({
            username:$scope.form.username,
            password:$scope.form.password,
            useraccount:$scope.form.useraccount,
            phone:$scope.form.phone,
            jobnumber:$scope.form.jobnumber,
            collegeid: arrayIds.collegeids.length>0 ? arrayIds.collegeids.toString() : null,
            classids: arrayIds.classids.length>0 ? arrayIds.classids.toString() : null,
            roleid:$scope.form.roleid,
            isshow: $scope.form.isshow? 1 : 0
        }).success(function (data) {
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "添加成功！", "success"); 
                refresh();
                if(fun && typeof fun == 'function') fun();
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
        })
    }
    $scope.editSave = function (fun) {
        var arrayIds = $scope.form.getClass();
        if($scope.form.username.length < 1 || $scope.form.jobnumber.length < 1 || $scope.form.phone.length < 1 || $scope.form.roleid.length < 1 || $scope.form.useraccount.length < 1) return;
        if(arrayIds.collegeids.length < 1 && arrayIds.classids.length < 1){
            swal("提示", "请选择班级", "warning"); 
            return;
        }
        $rootScope.loading = true;
        CollegeService.editManager({
            adminid:$scope.form.adminid,
            username:$scope.form.username,
            phone:$scope.form.phone,
            jobnumber:$scope.form.jobnumber,
            collegeid: arrayIds.collegeids.length>0 ? arrayIds.collegeids.toString() : null,
            classids: arrayIds.classids.length>0 ? arrayIds.classids.toString() : null,
            roleid:$scope.form.roleid,
            isshow: $scope.form.isshow ? 1 : 0
        }).success(function (data) {
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "保存成功！", "success"); 
                refresh();
                if(fun && typeof fun == 'function') fun();
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
        })
    }
    $scope.deletess = function (fun) {
        swal({   
            title: "确认删除",   
            text: "真的要删除吗？",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "删除",   
            cancelButtonText: "取消",   
            closeOnConfirm: false 
        }, 
        function(){   
            $rootScope.loading = true;
            return CollegeService.delManager({
                adminid:$scope.form.adminid
            }).success(function (data) {
                $rootScope.loading = false;
                if(data.code == 0){
                    swal("提示", "删除成功！", "success"); 
                    refresh();
                    if(fun && typeof fun == 'function') fun();
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
            })
        });
        
    }
    //基础的页码、排序等等选项
    $scope.media = {
        epage:1,
        pageCount:1,
        recordCount:1,
        pagesize:10,
        collegeid:'',
        classid:'',
        orderfield:'',
        ordertype:'',
        title:'',
        keyword:''
    }
    //换页
    $scope.setPage = function(n){
        if($scope.media.epage + n >0 && $scope.media.epage + n <= $scope.media.pageCount){
            $scope.media.epage += n;
            refresh(1);
        } 
    };
    //调整每页显示量
    $scope.setPageSize = function(n){
        $scope.media.pagesize = n;
        refresh();
    }
    //排序
    $scope.setOrder = function(name){
        if($scope.media.orderfield == name)
        {
            $scope.media.ordertype = $scope.media.ordertype=="asc"?"desc":"asc";
        }else{
            $scope.media.orderfield = name;
            $scope.media.ordertype = "asc";
        }
        refresh();
    }
    //调整查询规则，按学院或者班级查询
    $scope.show = function(type,item){
        $scope.media.classid = item.classId || '';
        $scope.media.collegeid = item.collegeId || '';
        refresh();
    };
    
    
    //初始化树+列表
    if(!$rootScope.treeCollege){
        CollegeService.getList(AppConfig.schoolCode).success(function(data){
            if(data.code == 0){
                $rootScope.treeCollege = data.data;
                getRole();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
            
            
        });
    }else getRole();
    function getRole() {
        RoleService.getList({
            token:AppConfig.token,
            type:1,
            schoolcode:AppConfig.schoolCode
        }).success(function (data) {
            $rootScope.loading = false;
            if(data.code == 0){
                $scope.roles = data.data.list;
                refresh();
            }else if(data.code == 4037){
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                location.href="#login";
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
        })
    }
    function refresh(n) {
        if(!n)$scope.media.epage =1;
        $rootScope.loading = true;
        CollegeService.getManagerList($scope.media).success(function (data) {
            if(data.code == 0){
                $scope.list = data.list.dataList;
                $scope.media.recordCount = data.list?data.list.recordCount:0;
                $scope.media.pageCount = data.list?data.list.pageCount:0;
                //班级名称处理成数组
                angular.forEach($scope.list, function(data,index,array){
                    angular.forEach(data.classList, function(data_class,index_class,array_class){
                        var name_array = [];
                        if(data_class.classname){
                            name_array = data_class.classname.split(",");
                        }
                        data_class.classname = name_array;                        
                    });
                });
            }else if(data.code == 4037){
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                location.href="#login";$rootScope.loading = false;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
            
            $rootScope.loading = false;
        })
    }
    
    //iframe 账号批量导入
    var a = document.createElement('a');
    a.href = AppConfig.FRAME+"index.php?m=Apartment&c=Account&a=import&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();

  }]);
