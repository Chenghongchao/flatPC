angular.module('flatpcApp')
.controller('RoomCtrl', ['$scope', 'AppConfig','$rootScope','RoomService','CollegeService','FlatService','$filter',
function($scope,AppConfig,$rootScope,RoomService,CollegeService,FlatService,$filter) {
    $scope.media = {
        flatid:'',
        title:'',
        showCollegeMenu:false, //是否显示学院下拉
        collegeSelectText:'',  //选择学院后显示的文字
        collegeList: null,     //学院数据
        floor:{
            type:0,
            floorid:'',
            floorname:'',
            typeid:"",
            floortype:"",
            memo:'',
            floornumber:0,
            roomnumber:0,
            startfloor:1,
			isFour:0,
            line:0,
            isletter:''
        },
        room:{
            type:0,
            roomid:'',
            roomname:'',
            startnum:'',
            status:0,
            roomstyle:'',
            typeid:'',
            roomnum:'',
            memo:'',
            line:0,
            isletter:''
        },
        //楼层和寝室公用学院选择逻辑
        collegeCheckEvent: function(){
            var icount = 0, college = null;
            $scope.media.collegeSelectText = "";
            for(var i=0; i<$scope.media.collegeList.length; i++){
                college = $scope.media.collegeList[i];
                if(college.checked){
                    icount++;
                    if(icount==1){
                        $scope.media.collegeSelectText = college.collegeName;
                    }else if(icount==2){
                        $scope.media.collegeSelectText += ","+college.collegeName;
                    }else{
                        $scope.media.collegeSelectText += "...";
                        break;
                    }
                } 
            }
        },
        getCollegeCheckedIds: function(){
            var ids = "";
            $scope.media.collegeList.forEach(function(data, index, array){
                if(data.checked){
                    if(""!=ids) ids += ",";
                    ids += data.collegeId;
                }
            });
            return ids;
        },
        getCollegeIdsByFloor: function(floor){ //获取楼层中所有的学院ID
            var ids = [floor];
            if(floor && floor.roomList){
                var row = null, room = null, arry = null;
                for(var i=0; i<floor.roomList.length; i++){ //循环房间列表
                    row = floor.roomList[i];
                    for(var j=0; j<row.length; j++){   //循环每一行房间
                        room = row[j];
                        if(room.collegeids){ //分割学院ID
                            arry = room.collegeids.split(",");
                            for(var k=0; k<arry.length; k++){
                                if(ids.indexOf(arry[k])==-1){
                                    ids[ids.length] = arry[k];
                                }
                            }
                        }
                        
                    }
                }
            }
            return ids;
        },
        getCollegeIdsByRoom: function(room){ //获取房间的学院ID
            var ids = [];
            if(room.collegeids){ //分割学院ID
                arry = room.collegeids.split(",");
                for(var k=0; k<arry.length; k++){
                    if(ids.indexOf(arry[k])==-1){
                        ids[ids.length] = arry[k];
                    }
                }
            }
            return ids;
        }
    }
    
    $scope.show = function (flat,liveArea,campus) {
        $scope.media.flatid = flat.flatId;
        var sex;
        if(flat.sex==0){
            sex='男'
        }else if(flat.sex==1){
            sex='女'
        }else{
            sex='混住'
        }
        $scope.flatsex=flat.sex;
        $scope.sex=sex;
        $scope.media.title = campus.title + '-' + liveArea.title + '-' + flat.title;
        refresh(flat.flatId);
    }
    
    if(!$rootScope.treeFlat){
        FlatService.getList(AppConfig.schoolCode).success(function(data){
            console.log(data.data);
            if(data.code == 0){
                $rootScope.treeFlat = data.data;
                refresh();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning");
        });
    }
    else {
        refresh();
    }
    
    $scope.floorInit = function (n,floor) {
        $scope.media.floor.type = n;
        if(floor){
            $scope.media.floor.floorid = floor.floorId || "";
            $scope.media.floor.floorname = floor.floorName || "";
            $scope.media.floor.listorder = floor.listOrder || "";
            $scope.media.floor.typeid = floor.typeId || "";
            $scope.media.floor.floortype = floor.floorType || '男';
            $scope.media.floor.memo = floor.memo || "";
        }else{
            $scope.media.floor.floorid = "";
            $scope.media.floor.floorname = "";
            $scope.media.floor.listorder = "";
            $scope.media.floor.typeid = "";
            $scope.media.floor.floortype = '男';
            $scope.media.floor.memo = "";
            $scope.media.floor.floornumber=1;
            $scope.media.floor.roomnumber=1;
            $scope.media.floor.startfloor=1;
        }
        typeInit();
        //加载学院
        $scope.media.showCollegeMenu = false;
        $scope.media.collegeSelectText = '';
        var checkedIds= $scope.media.getCollegeIdsByFloor(floor);
        $scope.getCollegeList(checkedIds);
    }
    $scope.floor = {
        addSave:function (fun) {
            if($scope.media.floor.type == 0){
                var collegeIds = "";
                $rootScope.loading = true;
                RoomService.addFloor({
                    token:AppConfig.token,
                    universityid:AppConfig.schoolCode,
                    flatid:$scope.media.flatid,
                    floornumber:$scope.media.floornumber,
                    roomnumber:$scope.media.roomnumber,
                    typeid:$scope.media.floor.typeid,
                    roomstyle:$scope.media.floor.roomstyle,
                    startfloor:$scope.media.floor.startfloor,
					isFour: $scope.media.floor.isFour,
                    line: $scope.media.floor.line,
                    prefix:$scope.media.floor.prefix,
                    suite:$scope.media.floor.suite,
                    floortype:$scope.media.floor.floortype,
                    floorname:$scope.media.floor.floorname,
                    memo:$scope.media.floor.memo,
                    isletter:$scope.media.floor.isletter,
                    collegeids: $scope.media.getCollegeCheckedIds()
                }).success(function(data){
                    // console.log(data);
                    if(data.code == 0 ){
                        swal("提示", "添加成功！", "success"); 
                        if(fun && typeof fun == 'function') fun();
                         refresh($scope.media.flatid);
                    }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "warning");
                        $rootScope.loading = false;
                    }
                });
            }else if($scope.media.floor.type == 2){
                $rootScope.loading = true;
                var param={
                    token:AppConfig.token,
                    flatid:$scope.media.flatid,
                    floornumber:$scope.media.floor.floornumber,
                    roomnumber:$scope.media.floor.roomnumber,
                    typeid:$scope.media.floor.typeid,
                    roomstyle:$scope.media.floor.floortype,
                    startfloor:$scope.media.floor.startfloor,
					isFour: $scope.media.floor.isFour,
                    line: $scope.media.floor.line,
                    prefix:$scope.media.floor.prefix,
                    suite:$scope.media.floor.suite,
                    isletter:$scope.media.floor.isletter,
                    collegeids: $scope.media.getCollegeCheckedIds()
                };
                RoomService.multiAdd(param).success(function(data){
                    $rootScope.loading = false;
                    if($scope.media.floor.typeid==null){
                        swal("提示","请选择户型","warning");
                    }else
                     if($scope.media.flatid==null){
                        swal("提示","请添加楼栋信息","warning");
                    }else if($scope.media.floor.floortype != $scope.sex && "混住" !=$scope.sex){
                        swal("提示","与当前楼栋性别不符合","warning"); 
                    }else if(data.code == 0){
                        //swal("提示", "添加成功！", "success");
					swal({
						title: "提示",   
						text: "添加成功",
						type: "success",
						showCancelButton: false,
						closeOnConfirm: true,
						showLoaderOnConfirm: false,
					}, 
					function(fun){ 
						if(fun && typeof fun == 'function') fun();
                         refresh($scope.media.flatid);
						$('#floorAdd').removeClass('show');
					});
                    }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }
                    else{
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    }
                });
            }
        },
        editSave:function () {
             if($scope.sex == '混住'){
                
            //     swal({
			// 			title: "提示",   
			// 			text: "修改成功",
			// 			type: "success",
			// 			showCancelButton: false,
			// 			closeOnConfirm: true,
			// 			showLoaderOnConfirm: false,
			// 		},
            //         function(fun){ 
			// 			if(fun && typeof fun == 'function') fun();
            //             refresh($scope.media.flatid);
			// 			$('#floorAdd').removeClass('show');
			// 		});
            //     return false;
            }else 
            if( $scope.media.floor.floortype != $scope.sex ){
                swal("提示","与当前楼栋性别不符合","warning");
                return false;
            }
            $rootScope.loading = true;
            var newtypeid ;
            if($scope.media.floor.typeid==""){
                newtypeid = 0;
            }else{
                newtypeid=$scope.media.floor.typeid;
            }
            var collegeIds = "";
            var param={
                token:AppConfig.token,
                floorid:$scope.media.floor.floorid,
                listorder:$scope.media.floor.listorder,
                typeid:newtypeid,
                floortype:$scope.media.floor.floortype,
                floorname:$scope.media.floor.floorname,
                memo:$scope.media.floor.memo,
                collegeids: $scope.media.getCollegeCheckedIds()
            };
            RoomService.editFloor(param).success(function(data){
                $rootScope.loading = false;
                // if($scope.media.typeid==null){
                //     swal("提示","请选择户型","warning");
                // }else 
                if($scope.media.flatid==null){
                    swal("提示","请添加楼栋信息","warning");
                }else if(data.code == 0){
                    //swal("提示", "修改成功！", "success");
                    swal({
						title: "提示",   
						text: "修改成功",
						type: "success",
						showCancelButton: false,
						closeOnConfirm: true,
						showLoaderOnConfirm: false,
					}, 
					function(fun){ 
						if(fun && typeof fun == 'function') fun();
                        refresh($scope.media.flatid);
						$('#floorAdd').removeClass('show');
					});

                         
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                }
            });
        },
        delete:function (fun) {
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
                RoomService.delFloor({
                    token:AppConfig.token,
                    floorid:$scope.media.floor.floorid
                }).success(function(data){
                    $rootScope.loading = false;
                    if(data.code == 0){
                        swal("提示", "删除成功！", "success");
                         if(fun && typeof fun == 'function') fun();
                         refresh($scope.media.flatid);
                       
                    }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }
                    else{
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    }
                });
            });
        }
    }
    
    $scope.roomInit = function (room,floor) {
        typeInit();
        $scope.media.floor.floorid = floor.floorId || "";
        $scope.media.floor.floorname = floor.floorName || "";
        if(room.status < 0){
            $scope.media.room.type = 0;
            $scope.media.room.roomid = '';
            $scope.media.room.roomname = '';
            $scope.media.room.startnum = '';
            $scope.media.room.floornum = 0;
            $scope.media.room.listorder = 0;
            $scope.media.room.status = 0;
            $scope.media.room.roomstyle = floor.floorType || '男';
            $scope.media.room.typeid = floor.typeId;
            $scope.media.room.memo = '';
            $scope.media.room.listtype  = "" + 2;
            $scope.media.room.listroom  = '';
        }else{
            $scope.media.room.type = 1;
            $scope.media.room.roomid = room.roomId;
            $scope.media.room.roomname = room.roomName;
            $scope.media.room.startnum = room.startnum;
            $scope.media.room.floornum = room.listOrder;
            $scope.media.room.listorder = room.listOrder;
            $scope.media.room.status = room.status;
            $scope.media.room.roomstyle = room.roomStyle || '男';
            $scope.media.room.typeid = room.typeId;
            $scope.media.room.memo = room.memo;
            $scope.media.room.listtype  = "" + 2;
            $scope.media.room.listroom  = '';
        }
        //加载学院
        $scope.media.showCollegeMenu = false;
        $scope.media.collegeSelectText = '';
        var checkedIds= $scope.media.getCollegeIdsByRoom(room);
        $scope.getCollegeList(checkedIds);
    }
    $scope.room = {
        addSave:function (fun) {
            if($scope.sex == '混住'){
                swal("提示", "添加成功！", "success");
            }else if($scope.media.room.roomstyle != $scope.sex && "混住" !=$scope.sex){
                swal("提示","与当前楼栋性别不符合","warning");
                return false;
            }
            var collegeIds = "";
            var param = {
                token:AppConfig.token,
                floorid:$scope.media.floor.floorid,
                listtype:$scope.media.room.listtype,
                status:$scope.media.room.status,
                roomstyle:$scope.media.room.roomstyle,
                typeid:$scope.media.room.typeid,
                startnum:$scope.media.room.startnum,
                roomnum:$scope.media.room.roomnum,
                prefix:$scope.media.room.prefix,
                suite:$scope.media.room.suite,
                memo:$scope.media.room.memo,
                line:$scope.media.room.line,
                isletter:$scope.media.room.isletter,
                collegeids: $scope.media.getCollegeCheckedIds()
            };
            if($scope.media.room.listtype < 2){
                if($scope.media.room.listroom.length > 0)
                    param.listroom = $scope.media.room.listroom;
                else return;
            }
           
            $rootScope.loading = true;
            RoomService.addRoom(param).success(function(data){
                $rootScope.loading = false;
                
                if($scope.media.flatid==null){
                         swal("提示","请添加楼栋信息","warning");
                }else if($scope.media.room.roomstyle != $scope.sex && "混住" !=$scope.sex){
                     swal("提示","与当前楼栋性别不符合","warning"); 
                }else if(data.code == 0){
                    swal("提示", "添加成功！", "success");
                    if(fun && typeof fun == 'function') fun();
                         refresh($scope.media.flatid);
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                }
            });
            
        },
        editSave:function (fun) {
             if($scope.media.room.roomstyle != $scope.sex && "混住" !=$scope.sex){
                swal("提示","与当前楼栋性别不符合","warning");
                return false;
            }
            var param = {
                token:AppConfig.token,
                roomid:$scope.media.room.roomid,
                status:$scope.media.room.status,
                listtype:$scope.media.room.listtype,
                roomstyle:$scope.media.room.roomstyle,
                typeid:$scope.media.room.typeid,
                roomname:$scope.media.room.roomname,
                memo:$scope.media.room.memo,
                line:$scope.media.room.line,
                collegeids: $scope.media.getCollegeCheckedIds()
            };
            if($scope.media.room.listtype < 2){
                if($scope.media.room.listroom.length > 0)
                    param.listroom = $scope.media.room.listroom;
                else return;
            }
            $rootScope.loading = true;
            RoomService.editRoom(param).success(function(data){
                $rootScope.loading = false;
                if($scope.media.flatid==null){
                         swal("提示","请添加楼栋信息","warning");
                }else if($scope.media.room.roomstyle != $scope.sex && "混住" !=$scope.sex){
                     swal("提示","与当前楼栋性别不符合","warning"); 
                }else if(data.code == 0){

                    //swal("提示", "修改成功！", "success"); 
                    swal({
						title: "提示",   
						text: "修改成功",
						type: "success",
						showCancelButton: false,
						closeOnConfirm: true,
						showLoaderOnConfirm: false,
					}, 
					function(fun){ 
						if(fun && typeof fun == 'function') fun();
                         refresh($scope.media.flatid);
						$('#roomEdit').removeClass('show');
					});
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                }
            });
        },
        delete:function (fun) {
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
                RoomService.delRoom({
                    token:AppConfig.token,
                    roomid:$scope.media.room.roomid
                }).success(function(data){
                    $rootScope.loading = false;
                    if(data.code == 0){
                        swal("提示", "删除成功！", "success");
                         if(fun && typeof fun == 'function') fun();
                         refresh($scope.media.flatid);
                    }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }
                    else{
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    }
                    
                });
            });
        }
        
    }
    /**
     * 获取学院数据
    */
    $scope.getCollegeList = function(checkedIds){
        $rootScope.loading = true;
        CollegeService.getList(AppConfig.schoolCode).success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                $scope.media.collegeList = data.data[0].collegeList;
                if(checkedIds && checkedIds.length>0){
                    $scope.media.collegeList.forEach(function(data, index, array){
                        for(var i=0; i<checkedIds.length; i++){
                            if(data.collegeId == checkedIds[i]){
                                data.checked = true;
                                break;
                            }
                        }
                    });
                    $scope.media.collegeCheckEvent();
                }
            }
            else if(data.code == 4037){
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                location.href="#login";$rootScope.loading = false;
            }else{
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
            }
        });
    }
    
    function typeInit() {
        if(!$rootScope.treeType){
            $rootScope.loading = true;
            RoomService.getTypeList().success(function(data){
                if(data.code == 0)
                    $rootScope.treeType = data.data;
                else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                }
                $rootScope.loading = false;
            });
        }
    }
        
    function refresh(flatid){
        if(!flatid){
            if($rootScope.treeFlat.cmpusList.length>0 && $rootScope.treeFlat.cmpusList[0].liveAreaList.length>0 && $rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList.length>0 && $rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0].flatId)
            {
                $scope.show($rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0],$rootScope.treeFlat.cmpusList[0],$rootScope.treeFlat.cmpusList[0].liveAreaList[0])
                return;
            } 
            else {
                $rootScope.loading = false;
                $scope.media.title = '请选择楼栋';
                return;
            }
        }
        $rootScope.loading = true;
        RoomService.getList(flatid).success(function(data){
            console.log(data);
            if(data.code == 0 ){
                data.data.floorList = data.data.floorList || [];
                data.data.floorList.forEach(function(list){
                    list.roomList = list.roomList || [];
                    list.roomList =  $filter('sliceArray')(list.roomList);
                    var l = list.roomList.length;
                    if(list.roomList.length>0 && list.roomList[l-1].length<10){
                        list.roomList[l-1].push({
                            status:-1,
                            roomName:'新增寝室'
                        })
                    }else{
                        list.roomList.push([{
                            status:-1,
                            roomName:'新增寝室'
                        }])
                    }
                });
                $scope.flat = data.data;
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
                swal("提示","错误代码："+ data.code + '，' + data.msg, "warning"); 
            }
            $rootScope.loading = false;
        })
    }
}])