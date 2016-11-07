angular.module('flatpcApp')
.controller('SchoolCtrl', ['$scope','AppConfig','$rootScope','CollegeService',function($scope,AppConfig,$rootScope,CollegeService) {
    $scope.parent = "flat";
    $rootScope.loading = false;
    
    $scope.media = {
        status:1,
        type:1,
        name:'',
        collegeName:'',
        className:'',
        listOrder:1,
        grade:'',
        degree:'',
        degreeYear:'',
        classId:'',
        shortName:'',
        history:0,
        menuCheck : function () {
            switch (this.type){
                case 0:
                    //return this.status?$rootScope.menuCheck():$rootScope.menuCheck();
                    break;
                case 1:
                    
                    return this.status?$rootScope.menuCheck(167):$rootScope.menuCheck(170);
                case 2:
                    return this.status?$rootScope.menuCheck(168):$rootScope.menuCheck(170);
                case 3:
                    //return this.status?$rootScope.menuCheck(227):$rootScope.menuCheck(228);
                    break;
            }
            return false;
        }
    };
    $scope.grades = CollegeService.getGrade();
    $scope.show = function(type,item){
        $scope.media.status = 0;
        $scope.media.type = type;
        $scope.media.shortName= item.shortName || '';
        $scope.media.name= item.name || '';
        $scope.media.collegeName=item.collegeName || '';
        $scope.media.collegeId = item.collegeId || '';
        $scope.media.className=item.className || '';
        $scope.media.classId=item.classId || '';
        $scope.media.grade=item.grade || '';
        $scope.media.degree=item.degree || '';
        $scope.media.degreeyear=item.degreeYear+'' || '';
        $scope.media.history = item.history?true:false || false;
        $scope.media.listOrder=item.listOrder || 1;
    }
    
    $scope.degreeChangeEvent = function () {
        switch ($scope.media.degree){
            case '专科':
            case '研究生':
            case '硕士研究生':
                $scope.media.degreeyear = '3';
                break;
            case '专升本':
            case '博士研究生':
                $scope.media.degreeyear = '2';
                break;
            case '本科':
            case '本科（一、二本）':
            case '本科（三本）':
                $scope.media.degreeyear = '4';
                break;
            case '语言生':
            case '交换生':
                $scope.media.degreeyear = '-1';
                break;
            default:
                $scope.media.degreeyear = '';
                break;
        }
        return false;
    }
    //添加班级和学院时清空缓存
    $scope.add = function(type,item){
        $scope.media.status = 1;
        $scope.media.type = type;
        $scope.media.collegeName= '';
        $scope.media.shortName='';
        $scope.media.className= '';
        $scope.media.grade= '';
        $scope.media.degree='';
        $scope.media.degreeyear='';
        $scope.media.listOrder= 1;
		if(item){
			$scope.media.collegeId = item.collegeId || '';
		}
        $scope.media.history = false;
        
    }
    $scope.addSave = function(){
        $rootScope.loading = true;
        (function(){
            if($scope.media.type == 1){
                return CollegeService.addCollege({
                    token:AppConfig.token,
                    schoolcode:AppConfig.schoolCode,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.collegeName,
                    shortname:$scope.media.shortName
                })
            }else if($scope.media.type == 2){
                return CollegeService.addClass({
                    token:AppConfig.token,
                    schoolcode:AppConfig.schoolCode,
                    collegeid:$scope.media.collegeId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.className,
                    grade:$scope.media.grade,
                    degree:$scope.media.degree,
                    degreeyear:$scope.media.degreeyear,
                    status:$scope.media.history?1:0
                })
            }
        })().success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "添加成功！", "success"); 
                refresh();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
        })
    }
    $scope.editSave = function(){
        $rootScope.loading = true;
        (function(){
            if($scope.media.type == 1){
                return CollegeService.editCollege({
                    token:AppConfig.token,
                    collegeid:$scope.media.collegeId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.collegeName,
                    shortname:$scope.media.shortName
                }).success(function(){
                    $rootScope.loading = false;
                })
            }else if($scope.media.type == 2){
                return CollegeService.editClass({
                    token:AppConfig.token,
                    classid:$scope.media.classId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.className,
                    status:$scope.media.history?1:0,
                    grade:$scope.media.grade,
                    degree:$scope.media.degree,
                    degreeyear:$scope.media.degreeyear,
                }).success(function(){
                    $rootScope.loading = false;
                })
            }
        })().success(function(data){
             $rootScope.loading = false;
             if(data.code == 0){
                swal("提示", "修改成功！", "success"); 
                refresh();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
        })
    }
    $scope.delete = function(){
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
                (function(){
                    if($scope.media.type == 1){
                        return CollegeService.delCollege({
                            token:AppConfig.token,
                            collegeid:$scope.media.collegeId
                        })
                    }else if($scope.media.type == 2){
                        return CollegeService.delClass({
                            token:AppConfig.token,
                            classid:$scope.media.classId
                        })
                    }
                })().success(function(data){
                    $rootScope.loading = false;
                    
                    if(data.code == 0){
                        swal("提示", "删除成功！", "success"); 
                        $scope.media.type=0;
                        refresh();
                    }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                })
                
        });
        
    }
    
	//批量导入班级
	$scope.batImportClassHandler = function(){
		$scope.add(-1);
        var a = document.createElement('a');
		a.href = AppConfig.FRAME + "index.php?m=Stmessage&c=ImportClass&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
		a.target="page-frame";
		a.click();
    }
	//批量导入学院
	// $scope.batImportCollegeHandler = function(){
	// 	$scope.add(-1);
    //     var a = document.createElement('a');
	// 	a.href = AppConfig.FRAME + "index.php?m=Stmessage&c=ImportClass&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
	// 	a.target="page-frame";
	// 	a.click();
    // }
    
    if(!$rootScope.treeCollege)
        refresh().then(function(){
            if($rootScope.treeCollege.length > 0 && $rootScope.treeCollege[0].collegeList.length > 0)
            $scope.show(1,$rootScope.treeCollege[0].collegeList[0]);
        });
    else{
        if($rootScope.treeCollege.length > 0 && $rootScope.treeCollege[0].collegeList.length > 0)
            $scope.show(1,$rootScope.treeCollege[0].collegeList[0]);
        $rootScope.loading = false;
    }
        
    function refresh(){
        $rootScope.loading = true;
        return CollegeService.getList(AppConfig.schoolCode).success(function(data){
            console.log(data);
            if(data.code == 0){
				if(null!=$rootScope.treeCollege){
					//-------------添加或修改-------------------
					for(var m=0; m<data.data.length; m++){
						var data_child = data.data[m];
						for(var n=0; n < $rootScope.treeCollege.length; n++){
							var tree_child = $rootScope.treeCollege[n];
							if(data_child.status == tree_child.status){
								var add_college_array = [];
								for(var i=0; i<data_child.collegeList.length; i++){
									var exist_college = false;
									for(var j=0; j < tree_child.collegeList.length; j++){
										if(data_child.collegeList[i].collegeId == tree_child.collegeList[j].collegeId){
											exist_college = true;
											tree_child.collegeList[j].collegeName = data_child.collegeList[i].collegeName;  //更新已存在的学院名称
											tree_child.collegeList[j].shortName = data_child.collegeList[i].shortName;      //更新已存在的学院简称
											tree_child.collegeList[j].listOrder = data_child.collegeList[i].listOrder;      //更新已存在的学院排序
											tree_child.collegeList[j].classList = data_child.collegeList[i].classList;      //更新已存在的班级节点
											break;
										}
									}
									if(false==exist_college){ //记录新增的学院
										add_college_array[add_college_array.length] = data_child.collegeList[i];
									}
								}
								//添加新的学院
								for(var a=0; a<add_college_array.length; a++){
									var nodeLength = tree_child.collegeList.length;
									tree_child.collegeList[nodeLength] = add_college_array[a] ;
								}
							}
						}
					}
					
					//----------------------删除-------------------
					for(var n=0; n < $rootScope.treeCollege.length; n++){
						for(var m=0; m<data.data.length; m++){
							if($rootScope.treeCollege[n].status == data.data[m].status){
								for(var j=0; j < $rootScope.treeCollege[n].collegeList.length; j++){
									var exist_college = false;
									for(var i=0; i<data.data[m].collegeList.length; i++){
										if(data.data[m].collegeList[i].collegeId == $rootScope.treeCollege[n].collegeList[j].collegeId){
											exist_college = true;
											break;
										}
									}
									if(false==exist_college){
										$rootScope.treeCollege[n].collegeList.splice(j,1);
									}
								}
							}
						}
					}
				}else{
					$rootScope.treeCollege = data.data;
				}
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            $rootScope.loading = false;
        });
    }
}]);