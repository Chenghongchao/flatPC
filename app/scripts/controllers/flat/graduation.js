angular.module('flatpcApp')
.controller('GraduationCtrl', ['$scope','AppConfig','$rootScope', 'FlatService','GraduationService','$filter','CollegeService','RoomService',"StudentService",
function($scope,AppConfig,$rootScope,FlatService,GraduationService,$filter,CollegeService,RoomService,StudentService) {
   

    //基础的页码、排序等等选项
    $scope.media = {
        epage:1,
        pageCount:1,
        recordCount:'',
        pagesize:10,
        name:'',
        studentnumber:'',
        campusid:'',
        liveareaid:'',
        flatid:'',
        collegeid:'',
        classid:'',
        search:0,
        orderfield:'',
        ordertype:'',
        status:-1,
        multi:false,
        getSum:function (lst) {
            var sum = 0;
            lst.forEach(function (item) {
                try{
                    sum += (parseFloat(item.cost)||0);
                }catch(e){
                    
                }
            })
            return sum || 0;
        }
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
    //调整查询规则，按学区、生活区或者楼栋查询
    $scope.show = function(type,item,campus,liveArea){
        $scope.media.campusid = item.campusId || "";
        $scope.media.liveareaid = item.liveAreaId || "";
        $scope.media.flatid = item.flatId || "";
        $scope.media.collegeid=item.collegeId || "";
        $scope.media.classid=item.classId || "";
        
        switch(type){
            case -1:
                $scope.media.campusId = "";
                $scope.media.liveAreaId = "";
                $scope.media.flatId = "";
                
                $scope.media.collegeId = "";
                $scope.media.classId = "";
                break;
            case 0:
                $scope.media.campusId = "";
                $scope.media.liveAreaId = "";
                $scope.media.flatId = "";
                
                $scope.media.collegeId = "";
                $scope.media.classId = "";
                break;
            case 1:
                $scope.media.collegeId = item.collegeId || "";
                $scope.media.classId = "";
                break;
            case 2:
                $scope.media.collegeId = campus.collegeId || "";
                $scope.media.classId = item.classId || "";
                break;
            case 3:
                $scope.media.campusId = campus.campusId || "";
                $scope.media.liveAreaId = liveArea.liveAreaId || "";
                $scope.media.flatId = item.flatId || "";
                
                $scope.media.collegeId = "";
                $scope.media.classId = "";
                break;
        }
        
        refresh();
    };
    //调整查询规则，计划中、已审批、已取消、已驳回
    $scope.setStatus = function(status){
        $scope.media.status = status;
        refresh();
    }
    //检索功能
    $scope.search = function(search){
        $scope.media.name = $scope.media.search?'':search;
        $scope.media.studentnumber = $scope.media.search?search:'';
        refresh();
    };
    
    //初始化树+列表
    CollegeService.getListByGrade(AppConfig.schoolCode).success(function(data){
        if(data.code == 0){
            $scope.college = data.list;
            if(!$rootScope.treeFlat){
                FlatService.getList(AppConfig.schoolCode).success(function(data){
                    if(data.code == 0){
                        $rootScope.treeFlat = data.data;
                        getCollege();
                    }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    
                    $rootScope.loading = false;
                    
                });
            }
            else {
                getCollege();
            }
        }else if(data.code == 4037){
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                location.href="#login";$rootScope.loading = false;
            }
        else
            swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
    });
    
    function getCollege() {
        if(!$rootScope.treeCollege){
            CollegeService.getList(AppConfig.schoolCode).success(function(data){
                if(data.code == 0){
                    $rootScope.treeCollege = data.data;
                    refresh();
                }else if(data.code == 4037){
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                        location.href="#login";$rootScope.loading = false;
                    }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
            });
        }else refresh();
    }
    //渲染list
    function refresh(n){
        if(!n)$scope.media.epage = 1;
        $rootScope.loading = true;
        GraduationService.getList($scope.media).success(function(data){
            if(data.code == 0){
                $scope.list = data.data.dataList;
                $scope.media.recordCount = data.data.recordCount;
                $scope.media.pageCount = data.data.pageCount;
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
            
            
            //console.log(data.data);
            $rootScope.loading = false;
        })
    }
    
    //查看详情
    $scope.work = {};
    $scope.detail = function(work){
        $scope.work = work;
        return null;
    }
    $scope.multiCheck = function () {
        $scope.list.forEach(function (item) {
            if(item.status==2)
                item.checked = $scope.media.multi;
        })
    }
    $scope.multiChecked = function (status) {
        for(var i=0;i <$scope.list.length;i++){
            if($scope.list[i].status==2 && $scope.list[i].checked != status)
                return;
        }
        $scope.media.multi = status;
    }
    $scope.warning = function () {
        swal("提示","本功能正在开发中，敬请期待", "warning");
    }
    //数据导出
    $scope.downloadgraduation = function(){
        if($scope.media.status==-1){
            var a = document.createElement('a');
            a.href = AppConfig.WEB_ROOT + 'apartment/checkout/export/?schoolcode=' + AppConfig.schoolCode
            +'&token='+AppConfig.token+'&collegeid='+$scope.media.collegeid+'&classid='+$scope.media.classid
            +'&campusid='+$scope.media.campusid+'&areaname='+$scope.media.liveareaid+'&flatid='+$scope.media.flatid;
           a.click();
        }else{
            var a = document.createElement('a');
            a.href = AppConfig.WEB_ROOT + 'apartment/checkout/export/?schoolcode=' + AppConfig.schoolCode
            +'&token='+AppConfig.token+'&status='+$scope.media.status+'&collegeid='+$scope.media.collegeid+'&classid='+$scope.media.classid
            +'&campusid='+$scope.media.campusid+'&areaname='+$scope.media.liveareaid+'&flatid='+$scope.media.flatid;
           a.click();
           }
    }
     //批量审批
    $scope.multiPass = function(){
        var radis =[];
        var radios=document.getElementsByName("check");
        for(var a=0;a<radios.length;a++){
           if(radios[a].checked==true)
				radis.push(radios[a].value);	
        }
         radis = radis.length>0?radis.toString():"";
        if(radis.length==0){
            swal("提示","没有选中的数据", "warning")
        }else if(radis.length!=0){
        swal({   
            title: "确认",   
            text: "确定要审批这些申请吗？",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#2772ee",   
            confirmButtonText: "确定",   
            cancelButtonText: "取消",   
            closeOnConfirm: false 
        }, 
        function(){   
            $rootScope.loading = true;
            GraduationService.check({
                exitids:radis || '',
                adminid:AppConfig.adminId
            }).success(function(data){
                if(data.code == 0){
                    swal("提示", "审批成功！", "success"); 
                    refresh();
                    if(fun && typeof fun == 'function')fun();
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                
                $rootScope.loading = false;
            });
        });
    }
        
    }
    //审批
    $scope.passWork = function(fun){
        
        if(fun && typeof fun == 'string')$scope.work.exitId=fun;
        swal({   
            title: "确认",   
            text: "确定要审批这些申请吗？",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#2772ee",   
            confirmButtonText: "确定",   
            cancelButtonText: "取消",   
            closeOnConfirm: false 
        }, 
        function(){   
            $rootScope.loading = true;
            GraduationService.check({
                exitids:$scope.work.exitId || '',
                adminid:AppConfig.adminId
            }).success(function(data){
                if(data.code == 0){
                    swal("提示", "审批成功！", "success"); 
                    refresh();
                    if(fun && typeof fun == 'function')fun();
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                
                $rootScope.loading = false;
            });
        });
        
    }
    

    $scope.dataInit = function(){
        $scope.form.classList = [];
        $scope.form.student = null;
        $scope.form.studentName = '';
        $scope.form.studentList = null;
        $scope.form.collegeClassList = null;
    }
    $scope.form = {
        classList:[],
        student:null,
        studentName:'',
        studentList:null,
        year: null,
        selectYear: null,
        checkedAllGrade: false,
        collegeClassList: null,
        initSelectYearsData: function(){
            this.year = new Date().getFullYear();
            this.selectYear = [];
            for(var i=this.year-5; i<=this.year+5; i++){
                this.selectYear[this.selectYear.length] = {
                    id: i,
                    text: i+'年'
                }
            }
        },
        yearChangeEvent:function(){
            this.collegeClassList = [];
        },
        studentSearch:function () {
            if($scope.selecter.classId.length < 0 ||$scope.selecter.collegeId.length < 0 || this.studentName.length < 0)return;
            var that = this;
            $rootScope.loading = true;
            StudentService.getListWithBed({
                keyword:this.studentName,
                collegeid:$scope.selecter.collegeId,
                classid:$scope.selecter.classId
            }).success(function (data) {
                //console.log(data);
                $rootScope.loading = false;
                
                if(data.code == 0){
                    that.studentList = data.list;
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
            })
        },
        collegeClassSearch:function () {
            var that = this;
            this.getGradeCheckedIds();
            this.classList = []; //重置数据
            $rootScope.loading = true;
            StudentService.getCollegeclassByYear({
                schoolCode:AppConfig.schoolCode,
                year:this.year
            }).success(function (result) {
                //console.log(data);
                $rootScope.loading = false;
                if(result.code == 0){
                    that.collegeClassList = result.data;
                    angular.forEach(result.data, function(data,index,array){
                        angular.forEach(data.listClass, function(data_class,index_class,array_class){
                            that.classList[that.classList.length] ={
                                classId: data_class.classId,
                                className: data_class.className,
                                collegeName: data_class.collegeName,
                                Grades: data.Grades,
                                degreeYears: data.degreeYears
                            }
                        }); 
                    });
                }else if(result.code == 4037){
                    swal("提示","错误代码："+ result.code + '，' + result.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else
                    swal("提示","错误代码："+ result.code + '，' + result.msg, "warning"); 
            })
        },
        studentChoose:function (student) {
            this.student = student;
            console.log(student);
        },
        sub:function (fun) {
            $rootScope.loading = true;
            GraduationService.add({
                studentkey:this.student.studentKey,
                adminid:AppConfig.adminId,
                bedid:this.student.bedId
            }).success(function (data) {
                $rootScope.loading = false;
                if(data.code == 0){
                    swal("提示", "提交成功！", "success"); 
                    refresh();
                    if(fun && typeof fun == 'function')fun();
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                console.log(data);
                
            })
        },
        multiSub:function (fun) {
            if(this.classList.length < 1)return;
            var ids = "";
            this.classList.forEach(function (cla) {
                ids += cla.classId + ',';
            })
            ids = ids.substring(0,ids.length-1);
            $rootScope.loading = true;
            GraduationService.add({
                type:1,
                adminid:AppConfig.adminId,
                classids:ids
            }).success(function (data) {
                $rootScope.loading = false;
                if(data.code == 0){
                    swal("提示", "提交成功！", "success"); 
                    refresh();
                    if(fun && typeof fun == 'function')fun();
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                console.log(data);
                
            })
        },
        checkedAllGradeEvent:function(){
            $scope.form.collegeClassList.forEach(function (data, index, array) {
                data.checked = $scope.form.checkedAllGrade;
            })
        },
        checkedGradeEvent:function(cla){
            if(cla.checked){
                var isCheckedAll = true;
                for(var i=0; i<$scope.form.collegeClassList.length; i++){
                    if(!$scope.form.collegeClassList[i].checked){
                        isCheckedAll = false;
                        break;
                    }
                }
                $scope.form.checkedAllGrade = isCheckedAll;
            }else{
                $scope.form.checkedAllGrade = false;
            }
        },
        getGradeCheckedIds: function(){
            //接口没有传学年制ID，暂时
            //console.log(JSON.stringify($scope.form.collegeClassList));
            //alert(JSON.stringify($scope.form.collegeClassList));
        },
        checkedAllClassEvent:function(){
            $scope.form.classList.forEach(function (data, index, array) {
                data.checked = $scope.form.checkedAllClass;
            })
        },
        checkedClassEvent:function(cla){
            if(cla.checked){
                var isCheckedAll = true;
                for(var i=0; i<$scope.form.classList.length; i++){
                    if(!$scope.form.classList[i].checked){
                        isCheckedAll = false;
                        break;
                    }
                }
                $scope.form.checkedAllClass = isCheckedAll;
            }else{
                $scope.form.checkedAllClass = false;
            }
        }
        
    }

    //批量退宿舍时，初始化“请选择毕业年”范围
    $scope.form.initSelectYearsData();


    //  iframe 毕业退宿床位分布
    var a = document.createElement('a');
    a.href = AppConfig.FRAME+"index.php?m=Apartment&c=ExitRoom&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();


    // var h = 0;
    //   window.onload = function(){

    //    h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    //    document.getElementById("frame-height").style.height = h+"px";
    //   }
}]);
