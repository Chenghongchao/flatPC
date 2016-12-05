angular.module('flatpcApp')
.controller('FloorCtrl', ['$scope','AppConfig','$rootScope','FlatService',function($scope,AppConfig,$rootScope,FlatService) {
    $scope.media = {
        status:1,
        type:0,
        title:'',
        campusTitle:'',
        campusId:'',
        areaTitle:'',
        liveAreaId:'',
        flatTitle:'',
        sex:'',
        flatId:'',
        listOrder:1,
        menuCheck : function () {
            switch (this.type){
                case 0:
                    //return this.status?$rootScope.menuCheck():$rootScope.menuCheck();
                    break;
                case 1:
                    //新增和编辑校区
                    return this.status?$rootScope.menuCheck(137):$rootScope.menuCheck(138);
                     break;
                case 2:
                    //新增和编辑生活区
                    return this.status?$rootScope.menuCheck(224):$rootScope.menuCheck(225);
                     break;
                case 3:
                    //新增和编辑楼栋
                    return this.status?$rootScope.menuCheck(227):$rootScope.menuCheck(228);
                     break;
            }
            return false;
        }
    };
    $scope.add = function(type,item,college,campus,liveArea){
        $scope.media.status = status;
        $scope.media.type=type;
        $scope.media.title = college || item.title || '';
        
        $scope.media.campusTitle = campus || item.title || '';
        $scope.media.campusId = item.campusId || '';
        
        $scope.media.areaTitle = liveArea || item.title || '';
        $scope.media.liveAreaId = item.liveAreaId || '';
        
        $scope.media.flatTitle = item.title || '';
        $scope.media.flatId = item.flatId || '';
        $scope.media.sex =item.sex || '0';
        $scope.media.listOrder=item.listOrder || 1;
    }
    
    $scope.show = function(type,item,campus){
        $scope.media.status = 1;
        $scope.media.type = type;
        
        $scope.media.title = item.title || '';
        
        $scope.media.campusTitle = campus || (type > 1 ? item.title : '');
        $scope.media.campusId = item.campusId || '';
        
        $scope.media.areaTitle = type > 2 ? item.title : '';
        $scope.media.liveAreaId = item.liveAreaId || '';
        
        $scope.media.flatTitle = '';
        $scope.media.flatId = '';
        //默认选中为楼栋性别男
        $scope.media.sex='0';
        $scope.media.listOrder= 1;
    }
    $scope.addSave = function(){
        $rootScope.loading = true;
        (function(){
            
            if($scope.media.type == 1){
                return FlatService.addCampus({
                    token:AppConfig.token,
                    schoolcode:AppConfig.schoolCode,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.campusTitle
                })
            }else if($scope.media.type == 2){
                return FlatService.addArea({
                    token:AppConfig.token,
                    schoolcode:AppConfig.schoolCode,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.areaTitle,
                    campusid:$scope.media.campusId
                })
            }else if($scope.media.type == 3){
                return FlatService.addFlat({
                    token:AppConfig.token,
                    schoolcode:AppConfig.schoolCode,
                    campusid:$scope.media.campusId,
                    areaid:$scope.media.liveAreaId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.flatTitle,
                    sex:$scope.media.sex
        
                })
            }
        })().success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "添加成功！", "success"); 
                refresh();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
            }
        })
    }
    $scope.editSave = function(){
        $rootScope.loading = true;
        (function(){
            if($scope.media.type == 1){
                return FlatService.editCampus({
                    token:AppConfig.token,
                    campusid:$scope.media.campusId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.campusTitle
                })
            }else if($scope.media.type == 2){
                return FlatService.editArea({
                    token:AppConfig.token,
                    areaid:$scope.media.liveAreaId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.areaTitle
                })
            }else if($scope.media.type == 3){
               
                return FlatService.editFlat({
                    token:AppConfig.token,
                    flatid:$scope.media.flatId,
                    listorder:$scope.media.listOrder,
                    sex:$scope.media.sex,
                    title:$scope.media.flatTitle
                   
                }
               
                )
            }
        })().success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "修改成功！", "success"); 
                refresh();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
            }
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
                        return FlatService.delCampus({
                            token:AppConfig.token,
                            campusid:$scope.media.campusId
                        })
                    }else if($scope.media.type == 2){
                        return FlatService.delArea({
                            token:AppConfig.token,
                            areaid:$scope.media.liveAreaId
                        })
                    }else if($scope.media.type == 3){
                        return FlatService.delFlat({
                            token:AppConfig.token,
                            flatid:$scope.media.flatId
                        })
                    }
                })().success(function(data){
                    $rootScope.loading = false;
                    if(data.code == 0){
                        swal("提示", "删除成功！", "success"); 
                        refresh();
                    }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    }
                })
                
        });
        
    }
    
    
    if(!$rootScope.treeFlat){
        refresh().then(function(){$scope.show(1,$rootScope.treeFlat.cmpusList[0] || {})});
    }
    else {
        $scope.show(1,$rootScope.treeFlat.cmpusList[0] || {});
        $rootScope.loading = false;
    }
    function refresh(){
        return FlatService.getList(AppConfig.schoolCode).success(function(data){
            //console.log(data);
            if(data.code == 0){
                if(null!=$rootScope.treeFlat && $rootScope.treeFlat.cmpusList.length>0){
                    //-------------添加或修改-------------------
                    var add_cmpus_array = [];
                    for(var i=0; i<data.data.cmpusList.length; i++){
                        var exist_campus = false;
                        var data_cmpus = data.data.cmpusList[i];
                        for(var j=0; j<$rootScope.treeFlat.cmpusList.length; j++){
                            var tree_cmpus = $rootScope.treeFlat.cmpusList[j];
                            if(data_cmpus.campusId == tree_cmpus.campusId){
                                exist_campus = true;
                                tree_cmpus.title = data_cmpus.title;         //更新校区名称
                                tree_cmpus.listOrder = data_cmpus.listOrder; //更新校区排序
                                /*********************处理生活区 BEGIN***********************/
                                if(tree_cmpus.liveAreaList && tree_cmpus.liveAreaList.length>0){
                                    var add_area_array = [];
                                    for(var m=0; m<data_cmpus.liveAreaList.length; m++){
                                        var exist_area = false;
                                        var data_area = data_cmpus.liveAreaList[m];
                                        for(var n=0; n< tree_cmpus.liveAreaList.length; n++){
                                            var tree_area = tree_cmpus.liveAreaList[n];
                                            if(data_area.liveAreaId == tree_area.liveAreaId){
                                                exist_area = true;
                                                tree_area.title = data_area.title;         //更新生活区名称
                                                tree_area.listOrder = data_area.listOrder; //更新生活区排序
                                                /*********************处理楼栋 BEGIN***********************/
                                                if(tree_area.flatList && tree_area.flatList.length>0){ //处理楼栋
                                                    var add_flat_array = [];
                                                    for(var k=0; k<data_area.flatList.length; k++){
                                                        var exist_flat = false;
                                                        var data_flat = data_area.flatList[k];
                                                        for(var h=0; h< tree_area.flatList.length; h++){
                                                            var tree_flat = tree_area.flatList[h];
                                                            if(data_flat.flatId == tree_flat.flatId){
                                                                exist_flat = true;
                                                                tree_flat.title = data_flat.title;         //更新楼栋名称
                                                                tree_flat.listOrder = data_flat.listOrder; //更新楼栋排序
                                                                tree_flat.sex = data_flat.sex;             //更新楼栋性别
                                                                break;
                                                            }
                                                        }
                                                        if(false==exist_flat){ //记录新的楼栋
                                                            add_flat_array[add_flat_array.length] = data_flat;
                                                        }
                                                    }
                                                    //添加新的楼栋
                                                    for(var a=0; a<add_flat_array.length; a++){
                                                        var area_length = tree_area.flatList.length;
                                                        tree_area.flatList[area_length] = add_flat_array[a] ;
                                                    }
                                                }else{
                                                    tree_area.flatList = data_area.flatList;
                                                }
                                                /*********************处理楼栋 END***********************/
                                                break;
                                            }
                                        }
                                        if(false==exist_area){ //记录新的生活区
                                            add_area_array[add_area_array.length] = data_area;
                                        }
                                    }
                                    //添加新的生活区
                                    for(var a=0; a<add_area_array.length; a++){
                                        var area_length = tree_cmpus.liveAreaList.length;
                                        tree_cmpus.liveAreaList[area_length] = add_area_array[a] ;
                                    }
                                }else{
                                    tree_cmpus.liveAreaList = data_cmpus.liveAreaList;
                                }
                                /*********************处理生活区 END***********************/
                                break;
                            }
                        }
                        if(false == exist_campus){ //记录新增的校区
                            add_cmpus_array[add_cmpus_array.length] = data_cmpus;
                        }
                    }
                    //添加新的校区
                    for(var a=0; a<add_cmpus_array.length; a++){
                        var nodeLength = $rootScope.treeFlat.cmpusList.length;
                        $rootScope.treeFlat.cmpusList[nodeLength] = add_cmpus_array[a] ;
                    }

                    //----------------------删除-------------------
                    if($rootScope.treeFlat.cmpusList && $rootScope.treeFlat.cmpusList.length>0){
                        for(var j=0; j<$rootScope.treeFlat.cmpusList.length; j++){
                            var exist_campus = false; 
                            var tree_cmpus = $rootScope.treeFlat.cmpusList[j];
                            for(var i=0; i<data.data.cmpusList.length; i++){
                                var data_cmpus = data.data.cmpusList[i];
                                if(data_cmpus.campusId == tree_cmpus.campusId){
                                    exist_campus = true;
                                    /*********************处理生活区 BEGIN***********************/
                                    if(tree_cmpus.liveAreaList && tree_cmpus.liveAreaList.length>0){ //处理楼栋
                                        for(var n=0; n<tree_cmpus.liveAreaList.length; n++){
                                            var exist_area = false; 
                                            var tree_area = tree_cmpus.liveAreaList[n];
                                            for(var m=0; m<data_cmpus.liveAreaList.length; m++){
                                                var data_area = data_cmpus.liveAreaList[m];
                                                if(data_area.liveAreaId == tree_area.liveAreaId){
                                                    exist_area = true;
                                                    /*********************处理楼栋 BEGIN***********************/
                                                    if(tree_area.flatList && tree_area.flatList.length>0){ //处理楼栋
                                                        for(var h=0; h<tree_area.flatList.length; h++){
                                                            var exist_flat = false; 
                                                            var tree_flat = tree_area.flatList[h];
                                                            for(var k=0; k<data_area.flatList.length; k++){
                                                                var data_flat = data_area.flatList[k];
                                                                if(data_flat.flatId == tree_flat.flatId){
                                                                    exist_flat = true;
                                                                    break;
                                                                }
                                                            }
                                                            if(false==exist_flat){ //移除楼栋
                                                                tree_area.flatList.splice(h,1);
                                                            }
                                                        }
                                                    }
                                                    /*********************处理楼栋 END***********************/
                                                    break;
                                                }
                                            }
                                            if(false==exist_area){ //移除生活区
                                                tree_cmpus.liveAreaList.splice(n,1);
                                            }
                                        }
                                    }
                                    /*********************处理生活区 END***********************/
                                    break;
                                }
                            }
                            if(false==exist_campus){ //移除校区
                                $rootScope.treeFlat.cmpusList.splice(j,1);
                            }
                        }
                    }
                }else{
                    $rootScope.treeFlat = data.data;
                }
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
            $rootScope.loading = false;
        });
    }
}]);