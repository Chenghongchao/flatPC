angular.module('flatpcApp')
.controller('GradeForDayCtrl', ['$scope','AppConfig','$rootScope', 'FlatService','TermService','$filter','GradeService','RoomService','PublicService','RuleService',
function($scope,AppConfig,$rootScope,FlatService,TermService,$filter,GradeService,RoomService,PublicService,RuleService) {
    $scope.switch = {
        week : AppConfig.week==1?false:true,
        month : AppConfig.month==1?false:true,
        day : AppConfig.day==1?false:true,
        bed : AppConfig.bed==1?false:true,
        pass : AppConfig.pass==1?false:true,
        photo : AppConfig.photo==1?false:true,
        takephoto : AppConfig.takephoto==1?false:true,
        wgphoto : AppConfig.wgphoto==1?false:true,
        check : AppConfig.check==1?false:true,
        role :  AppConfig.role==1?false:true,
    },
    // AppConfig.token,
    // AppConfig.schoolCode,
    // AppConfig.fileid,
    // AppConfig.date,
    // AppConfig.adminid,
    
    $scope.media = {
        items:'',
        source:1,
        tab:1,
        setTab:function(n) {
            this.tab = n;
            this.epage = 1;
            refresh();
        },
        dayCompletion:function() {
            GradeService.dayCompletion({
                        token:AppConfig.token,
                        schoolcode:AppConfig.schoolCode,
                        flatid:$scope.media.flatid,
                        date:new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
                        adminid:AppConfig.adminId,
                    }).success(function(data){
                        if(data.code==0){
                                swal("提示","一键补全成功", "success"); 
                                refresh();
                        }else{
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }  
                    })
        },
        menuCheck:function(item){
            switch(item){
                case 1:
                    return (
                        (this.source==0 && $rootScope.menuCheck(63))
                        ||(this.source==1 && $rootScope.menuCheck(280))
                        ||(this.source==2 && $rootScope.menuCheck(283))
                        ||(this.source==3 && $rootScope.menuCheck(325))
                    );
                case 2:
                    return (
                        (this.source==0 && $rootScope.menuCheck(64))
                        ||(this.source==1 && $rootScope.menuCheck(281))
                        ||(this.source==2 && $rootScope.menuCheck(284))
                        ||(this.source==3 && $rootScope.menuCheck(326))
                    )
                case 3:
                    return (
                        (this.source==0 && $rootScope.menuCheck(65))
                        ||(this.source==1 && $rootScope.menuCheck(282))
                        ||(this.source==2 && $rootScope.menuCheck(285))
                        ||(this.source==3 && $rootScope.menuCheck(327))
                    )
                case 4:
                    return (
                        (this.source==0 && $rootScope.menuCheck(192))
                        ||(this.source==1 && $rootScope.menuCheck(291))
                        ||(this.source==2 && $rootScope.menuCheck(298))
                        ||(this.source==3 && $rootScope.menuCheck(333))
                    )
                case 5:
                    return (
                        (this.source==0 && $rootScope.menuCheck(193))
                        ||(this.source==1 && $rootScope.menuCheck(292))
                        ||(this.source==2 && $rootScope.menuCheck(299))
                        ||(this.source==3 && $rootScope.menuCheck(334))
                    )
                    
                case 0:
                default:
                    return this.menuCheck(1)||this.menuCheck(2)||this.menuCheck(3)
            }
        },
        type:3,
        flatid:'',
        flatid1:'',
        liveareaid:'',
        campusid:'',
        studentnumber:'',
        name:'',
        roomname:'',
        notRoomNumber:'',
        search:2,
        orderfield:'',
        ordertype:'',
        tobed:0,
        setRule:function (n) {
            this.tobed = n;
            refresh();
        },
        epage:1,
        pageCount:1,
        recordCount:0,
        pagesize:10,
        setPage:function(n){
            if(this.epage + n >0 && this.epage + n <= this.pageCount){
                this.epage += n;
                refresh(1);
            } 
        },
        setPageSize:function(n){
            this.pagesize = n;
            refresh();
        },
        setOrder : function(name){
            if(this.orderfield == name)
            {
                this.ordertype = this.ordertype=="asc"?"desc":"asc";
            }else{
                this.orderfield = name;
                this.ordertype = "asc";
            }
            refresh();
        },
        setSearch : function(search){
            this.studentnumber = this.search?'':search;
            this.name = this.search == 1?search:'';
            this.roomname = this.search == 2?search:'';
            // console.log(this);
            refresh();
        },
        yearIndex:0,
        termIndex:0,
        week:{
            month:new Date().getMonth()+1,
            year:new Date().getFullYear(),
            day:new Date().getDate()
        },
        weekList:$filter('sliceDay')({
            month:new Date().getMonth()+1,
            year:new Date().getFullYear(),
            day:new Date().getDate()
        }),
        now:function (week) {
            if(new Date(week.year + '-' + week.month + '-' + week.day).Format('yyyy-MM-dd') == new Date(new Date().Format('yyyy-MM-dd')).Format('yyyy-MM-dd')){
                return true
            }else return false;
        },
        setWeek:function (week) {
			$('#config-demo').val("");
            this.week = week;
            refresh();
        },
        setMonth:function (n) {
            this.week.month +=n;
            if(this.week.month < 1){
                this.week.year --;
                this.week.month = 12;
            }else if(this.week.month > 12){
                this.week.year ++;
                this.week.month = 1;
            }
            this.weekList = $filter('sliceDay')(this.week);
            refresh();
        },
        getMonth:function (n) {
            var month = this.week.month + n;
            if(month < 1){
                return {
                    year:this.week.year-1,
                    month:12
                }
            }else if(month > 12){
                return {
                    year:this.week.year+1,
                    month:1
                }
            }else{
                return {
                    year:this.week.year,
                    month:this.week.month + n
                }
            }
            
        },
        title:'',
        campus:'',
        liveArea:'',
        show:function (type,item,campus,liveArea) {
            this.type = type;
            this.flatid1 = item.flatId || '';
            this.liveareaid = item.liveAreaId || '';
            this.campusid = item.campusId || '';
            this.title = item.title;
            this.campus = campus?campus.title : '';
            this.liveArea = liveArea?liveArea.title:'';
                    
            if(this.tab == 1){
                if(type==3){
                    this.flatid = item.flatId;
                    refresh();
                }
            }
            else{
                refresh();
            }
        },
        
        downloadGrade:function(){
            if(this.tab == 2){
                GradeService.download({
                    epage:this.epage,
                    pagesize:this.pagesize,
                    liveareaid:this.liveareaid,
                    campusid:this.campusid,
                    studentnumber:this.studentnumber,
                    name:this.name,
                    roomname:this.roomname,
                    orderfield:this.orderfield,
                    ordertype:this.ordertype,
                    flatid:this.flatid1,
                    date:new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
                    type:1
                }).success(function (data) {
                  
                });
            }else if(this.tab == 3){
                GradeService.downloadTopList({
                    epage:this.epage,
                    pagesize:this.pagesize,
                    liveareaid:this.liveareaid,
                    campusid:this.campusid,
                    studentnumber:this.studentnumber,
                    orderfield:this.orderfield,
                    ordertype:this.ordertype,
                    flatid:this.flatid1,
                    date:new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
                    tobed:this.tobed,
                    type:1
                }).success(function (data) {
                   
                });
            }
        }
    }
    
    
    $scope.cardMedia = {
        roomGradeType: 0, //寝室打分类型
        bedGradeType: 0,  //床位打分类型
        tab:1,
        setTab:function (n) {
            if(n < 1 || n > 4) return;
            this.tab = n;
            switch(n){
                case 1:
                    if($rootScope.menuCheck(286)){
                        this.tab = n;
                        if(this.room){
                            return null;
                        }
                        break;
                    }
                    else{
                        return this.setTab(n+1);
                    }
                        
                case 2:
                    if($scope.switch.bed && $rootScope.menuCheck(287)){
                        this.tab = n;
                        if(this.bed){
                            return null;
                        }
                        break;
                    }
                    else{
                        return this.setTab(n+1);
                    }
                case 3:
                    if($scope.switch.photo && $rootScope.menuCheck(288)){
                        this.tab = n;
                        if(this.img){
                            return null;
                        }
                        break;
                    }
                    else{
                        
                        return this.setTab(n+1);
                    }
                case 4:
                    if($scope.switch.role && $rootScope.menuCheck(290)){
                        this.tab = n;
                        if(this.rule){
                            return null;
                        }
                        break;
                    }
                    else{
                        this.tab = 0;
                        return null;
                    }
            }
            return this.getData(n)
        },
        item:null,
        room:null,
        bed:null,
        img:null,
        rule:null,
        
        setData : function (n) {
            var item = null;
            if(n){
                item = this.getNext();
            }else{
                item = this.getPrev();
            }
            if(item){
                this.item = item;
                return this.getData();
            }
                
        },
        dataInit : function (item,parent) {
            //打分初始化相关
            this.item = item;
            this.tab = 1;
            // console.log(item);
            this.img = null;
            this.bed = null;
            this.room = null;
            this.rule = null;
            return this.setTab(1);
        },
        getData:function (n,fun) {
            var that = this;
            this.tab = n || this.tab;
            this.roomGradeType = 0; //初始化为寝室正常打分
            this.bedGradeType = 0;  //初始化为床位正常打分
            switch (this.tab) {
                case 1:
                    if(this.item.roomScoreId){
                        $rootScope.loading = true;
                        return GradeService.getGrade({
                            token:AppConfig.token,
                            roomscoreid:this.item.roomScoreId,
                            mold:1
                        }).success(function (data) {
                            $rootScope.loading = false;
                            if(data.code == 0){
                                that.room = data.data;
                                that.roomGradeType =data.type;
                                that.score =data.score;
                                that.getSum(true);
								that.getBedData();
                            }
                            else if(data.code == 4037){
                                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                                location.href="#login";$rootScope.loading = false;
                            }
                            else
                                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            //console.log(data);
                        });
                    }
                    else{
                        if($rootScope.treeDay[0] && $rootScope.treeDay[0].typeList && $rootScope.treeDay[0].typeList[0].itemList && $scope.media.tab==1)
                        {
                            that.room = $rootScope.treeDay[0].typeList[0].itemList;
                            that.getSum(true);
                            that.getBedData();
                            //$rootScope.treeDay[0].tableId;
                            //$rootScope.treeDay[0].typeList[0].typeId;
                        }    
                        else
                            that.room = [];
                        
                        // console.log($rootScope.treeDay[0]);
                        
                    }
                    break;
                case 2:
                    this.getBedData();
                case 3:
                    $rootScope.loading = true;
                    return GradeService.getGradeImgs({
                        token:AppConfig.token,
                        roomid:this.item.roomId,
                        date:new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
                        type:1
                    }).success(function (data) {
                        $rootScope.loading = false;
                        
                        if(data.code == 0){
                            that.img = data.data;
                            if(fun && typeof fun == "function") fun();
                        }
                        else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                        else
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        //console.log(data);
                    });
                case 4:
                    $rootScope.loading = true;
                    return RuleService.getListByRoom({
                        token:AppConfig.token,
                        schoolcode:AppConfig.schoolCode,
                        specialid:this.item.roomId+'-'+new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd')
                    }).success(function (data) {
                        $rootScope.loading = false;
                        
                        if(data.code == 0){
                            that.rule = data.data;
                        }
                        else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                        else
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        //console.log(data);
                    });
            }
            return null;
        },
		getBedData: function(){/*获取床位分*/
			var that = this;
			$rootScope.loading = true;
			return GradeService.getBedGrade({
				token:AppConfig.token,
				roomid:this.item.roomId,
				date:new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
				mold:1
			}).success(function (data) {
				$rootScope.loading = false;
				if(data.code == 0){
					that.bed = data.data;
					that.bedScoreId = 1;
                    that.bedGradeType =data.type;
                    //that.score =data.score;
					if(data.data.length>0 && $scope.media.tab ==1){
						that.bed.forEach(function (bed) {
							if(bed.itemList.length < 1){
								that.bedScoreId = 0;
								bed.itemList = [];
								// bed.totalScore = 0;
                                //console.log(bed.totalScore);
                                if(typeof(bed.totalScore) == 'undefined'){
                                    bed.totalScore = '100';
                                }
                                that.totalScore = bed.totalScore;
								var options = [];
								if($rootScope.treeDay[0] && $rootScope.treeDay[0].typeList && $rootScope.treeDay[0].typeList[0].itemList)
								{
									options = $rootScope.treeDay[0].typeList[1].itemList;
									//$rootScope.treeDay[0].tableId;
									//$rootScope.treeDay[0].typeList[1].typeId;
								}    
								else
									options = [];
									// console.log(options);
								options.forEach(function (item) {
									
										bed.itemList.push({
											itemId:item.itemId,
											title:item.title,
											maxScore:item.standardType?-1:item.fullMark,
											score:item.standardType?-1:item.fullMark,
											standardType:item.standardType
										})
										bed.totalScore += item.standardType?1:item.fullMark;
									
								});
							}
						})
					}
				}
				else if(data.code == 4037){
					swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
					location.href="#login";$rootScope.loading = false;
				}
				else
					swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
				//console.log(data);
			});
		},
        getSum:function(reset) {
            try{
                if(this.room){
                    var sum = 0;
                    this.room.forEach(function (category) {
                        if(category.itemList)
                            category.itemList.forEach(function (item) {
                                if(item.standardType){
                                    if(item.score == -1) sum+=1;
                                }else{
                                    sum+= item.score;
                                }
                                
                            })
                        else if(category.subNodes)
                            category.subNodes.forEach(function (item) {
                                if(item.standardType){
                                    if(item.score == -1) sum+=1;
                                    item.score = reset?-1 : (item.score || -1);
                                }else{
                                    sum+= item.score;
                                    item.score = reset?item.fullMark : (item.score || item.fullMark);
                                }
                            })
                    })
                    return sum;
                }
                return 0;
            }
            catch(e){
                return 0;
            }
        },
        getBedSum:function (bed) {
            try{
                if(bed && bed.itemList){
                    bed.totalScore = 0;
                    for(var i=0;i < bed.itemList.length;i++){
                        if(bed.itemList[i].standardType){
                            if(bed.itemList[i].score == -1)
                            bed.totalScore+= 1;
                        }else
                            bed.totalScore+= bed.itemList[i].score;
                    }
                }
                return bed.totalScore;
            }catch(e)
            {
                return 0;    
            }
        },
        grade:function (n,item) {
            if($scope.media.tab == 1 && this.menuCheck(5)){
                if(item.score < 0){
                    item.score = item.score==-1?-2:-1;
                }else if(item.score + n <= (item.fullMark || item.maxScore) && item.score + n >= 0){
                    item.score += n;
                }
            }
        },
        gradeKs:function (n) {
            if((n<0 && $scope.cardMedia.score > 0) || (n>0 && $scope.cardMedia.score <100)){
                $scope.cardMedia.score = $scope.cardMedia.score+n; 
            }  
        },
        gradeKsBed:function (bed,n) {
            if((n<0 && bed.totalScore > 0) || (n>0 && bed.totalScore <100)){
                bed.totalScore = bed.totalScore+n; 
            }  
        },
        addRule:function (list,item) {
            for(var i=0;i <list.length;i++){
                if(list[i].itemId == item.itemId)return;
            }
            
            list.push({
                itemId:item.itemId,
                itemName:item.title
            })
            $scope.media.items=list;
        },
        removeRule:function (list,index) {
            if($scope.media.tab <2)
                list.splice(index,1);
        },
        gradeSave:function (fun) {
        if($scope.switch.wgphoto &&  $scope.media.items.length>0){
                if(this.img){
                    if(this.img.length < 1){
                        swal("提示","违规必拍请上传图片", "error"); 
                        return null;
                    }                    
                }else{
                    //swal("提示","你还没有上传寝室实拍", "error"); 
                    var that = this;
                    this.getData(3,function () {
                        that.gradeSaves(fun);
                    });
                    return null;
                }   
            }else if($scope.switch.photo && $scope.switch.takephoto){
                $scope.media.items=='';
                if(this.img){
                    if(this.img.length < 1){
                        swal("提示","请上传图片", "error"); 
                        return null;
                    }
                    
                }else{
                    //swal("提示","你还没有上传寝室实拍", "error"); 
                    var that = this;
                    this.getData(3,function () {
                        that.gradeSave(fun);
                    });
                    return null;
                }   
            }
            if((this.room&& this.room.length>0)|| this.roomGradeType){
                this.roomGrade(fun);
            }
            else if(this.bed && this.bed.length>0) {
                this.bedGrade(fun);
            }else if(this.img){
                this.gradeImg(fun);
            }else if(this.rule){
                this.ruleSave(fun);
            }
        },

        roomGrade:function(fun){
            var grades = "[",that = this;
            // console.log(this.room);
            this.room.forEach(function (item,i) {
                var list = item.itemList || item.subNodes;
                console.log(list);
                for(var j = 0;j < list.length; j++){
                    grades += '{"itemid":' + list[j].itemId + ',"score":' + list[j].score +'},';
                }
            })
            if(grades.length > 2)
                grades = grades.substring(0,grades.length-1) + ']';
            if(this.item.roomScoreId){
                    GradeService.editGrade({
                        token:AppConfig.token,
                        roomscoreid:this.item.roomScoreId,
                        scoreitem:grades,
                        type: that.roomGradeType ? that.roomGradeType : null,
                        score: that.roomGradeType ? that.score : null,
                        mold:1
                    }).success(function(data){
                        $rootScope.loading = false;
                        if(data.code == 0){
                            if(that.bed && that.bed.length>0){
                                that.bedGrade(fun);
                            }else if(that.img){
                                that.gradeImg(fun);
                            }
                            else if(that.rule)that.ruleSave(fun);
                            else{
                                if(fun && typeof fun == 'function') fun();
                                swal("提示","保存成功！", "success"); 
                                refresh();
                            }
                            that.room = null;
                        }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }else{
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        }
                    });
                }
                else{
                    
                    GradeService.setGrade({
                        token:AppConfig.token,
                        schoolcode:AppConfig.schoolCode,
                        roomid:this.item.roomId,
                        date:new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
                        adminid:AppConfig.adminId,
                        scoreitem:grades,
                        typeid:$rootScope.treeDay[0].typeList[0].typeId,
                        tableid:$rootScope.treeDay[0].tableId,
                        mold:1,
                        type: that.roomGradeType ? that.roomGradeType : null,
                    score: that.roomGradeType ? that.score : null,
                    }).success(function(data){
                        $rootScope.loading = false;
                        if(data.code == 0){
                            if(that.bed&& that.bed.length>0){
                                that.bedGrade(fun);
                            }else if(that.img && that.img.length>0){
                                that.gradeImg(fun);
                            }
                            else if(that.rule)that.ruleSave(fun);
                            else{
                                swal("提示","打分成功！", "success"); 
                                refresh();
                                if(fun && typeof fun == 'function') fun();
                            }
                            that.room = null;
                        }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }else{
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        }
                    });
                }
        },
        bedGrade:function(fun){
            var grades = "[",that = this;
            if(!(that.bed && that.bed.length>0)){
                if(that.img){
                    that.gradeImg(fun);
                }
                else if(that.rule)that.ruleSave(fun);
                return;
            }
            this.bed.forEach(function (item,i) {
                var list = item.itemList;
                console.log(list);
                for(var j = 0;j < list.length; j++){
                    grades += '{"itemid":' + list[j].itemId + ',"studentkey":"' + item.studentKey +  '","bedid":"' + item.bedId + '","score":' + list[j].score +'},';
                }
            })
            if(grades.length > 2)
                grades = grades.substring(0,grades.length-1) + ']';
            else if(that.img){
                that.gradeImg(fun);
                return;
            }
            else if(that.rule){
                that.ruleSave(fun);
                return;
            }
            else {
                swal("提示","保存成功！", "success");
                if(fun && typeof fun == 'function') fun();
                return;
            }
            // console.log(grades);
            if(grades.length > 0){
                $rootScope.loading = true;
                if(that.bedGradeType){
                    GradeService.editBedGrade({
                        token:AppConfig.token,
                        roomid:this.item.roomId,
                        date:new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
                        scoreitem:grades,
                        typeid:$rootScope.treeDay[0].typeList[1].typeId,
                        tableid:$rootScope.treeDay[0].tableId,
                        type:that.bedGradeType,
                        score:that.score,
                        mold:1
                    }).success(function(data){
                        $rootScope.loading = false;
                        if(data.code == 0){
                            if(that.img){
                                that.gradeImg(fun);
                            }
                            else if(that.rule)that.ruleSave(fun);
                            else{
                                refresh();
                                swal("提示","保存成功！", "success");
                                if(fun && typeof fun == 'function') fun();
                            }
                            that.bed = null;
                        }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }else{
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        }
                    });
                }
                else{
                    GradeService.setBedGrade({
                        token:AppConfig.token,
                        schoolcode:AppConfig.schoolCode,
                        roomid:this.item.roomId,
                        date:new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
                        adminid:AppConfig.adminId,
                        scoreitem:grades,
                        typeid:$rootScope.treeDay[0].typeList[1].typeId,
                        tableid:$rootScope.treeDay[0].tableId,
                        type:that.bedGradeType,
                        score:that.score,
                        mold:1
                    }).success(function(data){
                        $rootScope.loading = false;
                        if(data.code == 0){
                            if(that.img){
                                that.gradeImg(fun);
                            }
                            else if(that.rule)that.ruleSave(fun);
                            else{
                                swal("提示","打分成功！", "success"); 
                                refresh();
                                if(fun && typeof fun == 'function') fun();
                            }
                            that.bed = null;
                        }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }else{
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        }
                    });
                }
            }
        },
        gradeImg:function(fun){
            // console.log('img');
            var imgs = "",that = this;
            this.img.forEach(function (item,i) {
                imgs += (item.fileId || item.fileid) + ',';
                
            })
            if(imgs.length > 0)
                imgs = imgs.substring(0,imgs.length-1);
            
            // console.log(imgs);
            $rootScope.loading = true;
            GradeService.uploadImg({
                token:AppConfig.token,
                schoolcode:AppConfig.schoolCode,
                roomid:this.item.roomId,
                date:new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
                adminid:AppConfig.adminId,
                fileids:imgs,
                type:1
            }).success(function(data){
                $rootScope.loading = false;
                if(data.code == 0){
                    if(that.rule)that.ruleSave(fun);
                    else{
                        swal("提示","打分成功！", "success"); 
                        refresh();
                        if(fun && typeof fun == 'function') fun();
                        that.img = null;
                    }
                    
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                }
            });
        },
        ruleSave:function (fun) {
            var items = "[",that = this;
            this.rule.itemList.forEach(function (item) {
                items += '{"bedid": "","itemid": ' + item.itemId + '},';
            });
            this.rule.bedList.forEach(function (bed) {
                if(bed.itemList)
                    bed.itemList.forEach(function (item) {
                        items += '{"bedid": "' + bed.bedId + '","itemid": ' + item.itemId + '},';
                    });
            });
            if(items.length > 2){
                items = items.substring(0,items.length-1) + ']';
            }else 
                items += "]";
            RuleService.checkByRoom({
                token:AppConfig.token,
                schoolcode:AppConfig.schoolCode,
                roomid:this.item.roomId,
                specialid:this.item.roomId+'-'+new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
                adminid:AppConfig.adminId,
                itemlist:items,
                source:1
            }).success(function(data){
                $rootScope.loading = false;
                if(data.code == 0){
                    swal("提示","打分成功！", "success"); 
                    refresh();
                    if(fun && typeof fun == 'function') fun();
                    that.rule = null;
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                }
            });
        },
        imgDel:function (index) {
            this.img.splice(index,1);
        },
        menuCheck:function(item){
            switch(item){
                case 1:
                    return (
                        ($scope.media.source==0 && $rootScope.menuCheck(188))
                        ||($scope.media.source==1 && $rootScope.menuCheck(286))
                        ||($scope.media.source==2 && $rootScope.menuCheck(293))
                        ||($scope.media.source==3 && $rootScope.menuCheck(328)) 
                    );
                case 2:
                    return ($scope.switch.bed && 
                        (
                            ($scope.media.source==0 && $rootScope.menuCheck(189))
                            ||($scope.media.source==1 && $rootScope.menuCheck(287))
                            ||($scope.media.source==2 && $rootScope.menuCheck(294)) 
                            ||($scope.media.source==3 && $rootScope.menuCheck(329)) 
                        )
                    )
                case 3:
                    return ($scope.switch.photo && 
                        (
                            ($scope.media.source==0 && $rootScope.menuCheck(190))
                            ||($scope.media.source==1 && $rootScope.menuCheck(288))
                            ||($scope.media.source==2 && $rootScope.menuCheck(295)) 
                            || ($scope.media.source==3 && $rootScope.menuCheck(330)) 
                        )
                    )
                case 4:
                    return ($scope.switch.role && 
                        (
                            ($scope.media.source==0 && $rootScope.menuCheck(265))
                            ||($scope.media.source==1 && $rootScope.menuCheck(290))
                            ||($scope.media.source==2 && $rootScope.menuCheck(297)) 
                            ||($scope.media.source==3 && $rootScope.menuCheck(331)) 
                        )
                    )
                case 5:
                    return $scope.switch.day && (
                        ($scope.media.source==0 && $rootScope.menuCheck(191))
                        ||($scope.media.source==1 && $rootScope.menuCheck(289))
                        ||($scope.media.source==2 && $rootScope.menuCheck(296)) 
                        ||($scope.media.source==3 && $rootScope.menuCheck(332)) 
                    )
                    
                case 0:
                default:
                    return this.menuCheck(1)||this.menuCheck(2)||this.menuCheck(3)||this.menuCheck(4)
            }
        }
    }
    //上传打分图片，并将返回的img url显示
    $scope.uploadImg = function(event){
        var files = event.target.files;
        var s = files[0].name.split(".").pop();
        if(s != "jpg" && s != "png" && s != "jpeg"){
            swal('提示', '文件格式不正确！请上传*.jpg或*.png文件', 'error'); 
            return false;
        }
        var form = document.createElement('form');
        form.enctype = 'multipart/form-data';
        var fdata = new FormData(form);
        if (!fdata) { swal('提示', '你的浏览器不支持文件上传！', 'error'); return false; };
        fdata.append('img', files[0]);
        
        fdata.append('token', AppConfig.token);
        fdata.append('schoolcode', AppConfig.schoolCode);
        // console.log(fdata);
        $rootScope.loading = true;
        return PublicService.imgUpload(fdata).success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                $scope.cardMedia.img = $scope.cardMedia.img || [];
                $scope.cardMedia.img.push({
                    picUrl:data.data.serverPath,
                    fileId:data.data.fileId
                });
                // console.log($scope.cardMedia.img);
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
        
    }
    
    
    
    //界面初始化相关
    // if(!$rootScope.treeTerm)
    //     TermService.getList().success(function(data){
    //         console.log(data);
    //         if(data.code == 0){
    //             $rootScope.treeTerm = data.data;
    //             getFlat();
    //         }
    //         else
    //             swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
    //     }); 
    // else {
    //     getFlat();
    // }
    getFlat();
    function getFlat() {
       if(!$rootScope.treeFlat){
            FlatService.getList(AppConfig.schoolCode).success(function(data){
                //console.log(data);
                if(data.code == 0){
                    $rootScope.treeFlat = data.data;
                    getSetting();
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                
            });
        }
        else
        {
            getSetting();
        }
    };
    function getSetting() {
        if(!$rootScope.treeDay)
            return GradeService.getSettingList({type:1,isopen:1}).success(function(data){
                if(data.code == 0){
                    $rootScope.treeDay = data.data;
                    getRule();
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                }
            });
        else
            getRule();
    }
    function getRule() {
        var change = function () {
            var list = [];
            $rootScope.treeRule.forEach(function (group) {
                list.push({
                    fid:0,
                    title:group.title
                })
                if(group.subNodes)
                {
                    group.subNodes.forEach(function (item) {
                        list.push(item);
                    })
                }
            })
            return list;
        }
        if(!$rootScope.treeRule)
            return RuleService.getList().success(function(data){
                if(data.code == 0){
                    $rootScope.treeRule = data.data;
                    $scope.rules = change();
                    init();
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                }
            });
        else{
            init();
            $scope.rules = change();
        }
    }
    function init() {
        if($rootScope.menuCheck(280)){
            $scope.media.tab = 1;
        }else if($rootScope.menuCheck(281)){
            $scope.media.tab = 2;
        }else if($rootScope.menuCheck(282)){
            $scope.media.tab = 3;
        }else{
            return;
        }
        if($rootScope.treeFlat.cmpusList[0]&&$rootScope.treeFlat.cmpusList[0].liveAreaList[0]&&$rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0]&&$rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0].flatId){
            $scope.media.show(3,$rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0],$rootScope.treeFlat.cmpusList[0],$rootScope.treeFlat.cmpusList[0].liveAreaList[0]);
        }else
            $rootScope.loading = false;
        return;
    };
    function refresh(n) {
        if($scope.media.flatid.length<1)return;
        if(!n)$scope.media.epage = 1;
        $rootScope.loading = true;
        if($scope.media.tab == 1){
            GradeService.getListByFlat({
                flatid:$scope.media.flatid,
                date:new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
                type:1
            }).success(function (data) {
                $rootScope.loading = false;
                if(data.code == 0){
                    data.list.floorList = data.list.floorList || [];
                    data.list.floorList.forEach(function(list,index){
                        list.roomList = list.roomList || [];
                        list.roomList =  $filter('sliceArray')(list.roomList,10,index);
                        // console.log(index);
                    });
                    $scope.flat = data.list;
                    $scope.flat.flatName = $scope.media.campus + '-' + $scope.media.liveArea + '-' + $scope.media.title;
                    // alert(JSON.stringify($scope.flat));
                    console.log($scope.flat);
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                
                // console.log(data);
            })
        }else if($scope.media.tab == 2){
            GradeService.getQuickScoreList({
                flatid:$scope.media.flatid,
                date:new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
                type:1
            }).success(function (data) {
                $rootScope.loading = false;
                if(data.code == 0){
                    $scope.bedstatus = data.data.status;
                    $scope.ksdfFlatList = data.data.list;
                    $scope.ksdfFlatList.forEach(function(floor, index, array){
                        floor.roomlist = floor.roomlist || [];
                        floor.roomlist =  $filter('sliceArray')(floor.roomlist,10,index);
                    });
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            })
        }else if($scope.media.tab == 3){
            GradeService.getImport({
                type:1
            }).success(function (data) {
                $rootScope.loading = false;
                    if(data.code == 0){
                        $scope.importList = data.data.list;
                        $scope.media.recordCount = data.data.recordCount;
                        $scope.media.pageCount = data.data.pageCount;
                    }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error");   
            })
        }else if($scope.media.tab == 4){
            GradeService.getList({
                epage:$scope.media.epage,
                pagesize:$scope.media.pagesize,
                liveareaid:$scope.media.liveareaid,
                campusid:$scope.media.campusid,
                studentnumber:$scope.media.studentnumber,
                name:$scope.media.name,
                roomname:$scope.media.roomname,
                orderfield:$scope.media.orderfield,
                ordertype:$scope.media.ordertype,
                flatid:$scope.media.flatid1,
                date:new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
                type:1
            }).success(function (data) {
                $rootScope.loading = false;
                
                if(data.code == 0){
                    $scope.rooms = data.list;
                    $scope.media.recordCount = data.list.recordCount;
                    $scope.media.pageCount = data.list.pageCount;
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                // console.log(data);
            })
        }else if($scope.media.tab == 5){
            GradeService.getTopList({
                epage:$scope.media.epage,
                pagesize:$scope.media.pagesize,
                liveareaid:$scope.media.liveareaid,
                campusid:$scope.media.campusid,
                studentnumber:$scope.media.studentnumber,
                name:$scope.media.name,
                roomname:$scope.media.roomname,
                orderfield:$scope.media.orderfield,
                ordertype:$scope.media.ordertype,
                flatid:$scope.media.flatid1,
                date:new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
                tobed:$scope.media.tobed,
                type:1
            }).success(function (data) {
                $rootScope.loading = false;
                if(data.code == 0){
                    $scope.topList = data.list;
                    $scope.media.recordCount = data.list.recordCount;
                    $scope.media.pageCount = data.list.pageCount;
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                
                // console.log(data);
            })
        }
    };
    
	//实例化日期控件
	$scope.search = {
		begindate: null,
		enddate: null
	}
	$('#config-demo').daterangepicker({
		autoApply: true,
		autoUpdateInput: false,
		startDate: new Date().Format('yyyy-MM-dd'),
		endDate: new Date().Format('yyyy-MM-dd'),
		opens: "left",
		locale : {
			format: "YYYY/MM/DD",
			applyLabel : '确定',  
			cancelLabel : '取消',  
			fromLabel : '起始时间',  
			toLabel : '结束时间',  
			customRangeLabel : '自定义',  
			daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
			monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
					'七月', '八月', '九月', '十月', '十一月', '十二月' ],  
			firstDay : 1  
		}
	}, function(start, end, label) {//格式化日期显示框
		$scope.search.begindate = new Date(start).Format('yyyy-MM-dd');
		$scope.search.enddate = new Date(end).Format('yyyy-MM-dd');
	});
	$('#config-demo').on('apply.daterangepicker', function(ev, picker) {
		$(this).val(picker.startDate.format('YYYY/MM/DD') + ' - ' + picker.endDate.format('YYYY/MM/DD'));
	});
	$('#config-demo').on('cancel.daterangepicker', function(ev, picker) {
		$(this).val('');
	});

	$scope.searchHandler = function(){
		if($scope.media.flatid.length<1)return;
        $rootScope.loading = true;
		GradeService.getListByDate({
            date:new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
			flatid: $scope.media.flatid,
			begindate: $scope.search.begindate,
			enddate: $scope.search.enddate,
			grade: -1 //不合格
		}).success(function (data) {
			$rootScope.loading = false;
			if(data.code == 0){
				data.list.floorList = data.list.floorList || [];
				data.list.floorList.forEach(function(list,index){
					list.roomList = list.roomList || [];
					list.roomList =  $filter('sliceArray')(list.roomList,10,index);
					// console.log(index);
				});
				$scope.flat = data.list;
				$scope.flat.flatName = $scope.media.campus + '-' + $scope.media.liveArea + '-' + $scope.media.title;
			}else if(data.code == 4037){
						swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
						location.href="#login";$rootScope.loading = false;
					}
			else
				swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
			
			// console.log(data);
		})
	};

    //快速打分(日)
    $scope.saveQuickScores = function(pama){
        swal({   
                title: "确认保存",   
                text: "确认保存第"+$scope.media.week.day+"日打分的成绩吗？",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "确定",   
                cancelButtonText: "取消",   
                closeOnConfirm: false 
            }, 
            function(){
                $rootScope.loading = true;
                //var rr = JSON.stringify($scope.getKsdfRoomsScores());
                //alert(rr);
                //var bb = JSON.stringify($scope.getKsdfBedsScores()).replace(/\\/g, '');
                //alert(bb);
                return GradeService.allQuickScores({
                    schoolcode:AppConfig.schoolCode,
                    date: new Date($scope.media.week.year + '-' + $scope.media.week.month + '-' + $scope.media.week.day).Format('yyyy-MM-dd'),
                    adminid:AppConfig.adminId,
                    roomtypeid: $rootScope.treeDay[0].typeList[0].typeId,
                    bedtypeid: $rootScope.treeDay[0].typeList[1].typeId,
                    roomlist: $scope.getKsdfRoomsScores(),
                    bedlist: $scope.getKsdfBedsScores(),
                    type:1
                }).success(function(data){
                    $rootScope.loading = false;
                    if(data.code == 0){
                        swal("提示", "保存成功！", "success"); 
                        if(fun) fun();
                        refresh();
                    }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                });
        });
    };
    //获取快速打分寝室分
    $scope.getKsdfRoomsScores = function(){
        var roomlist = [];
        angular.forEach($scope.ksdfFlatList, function(floor,index_floor,array_floor){
           angular.forEach(floor.roomlist, function(data,index,array){
                angular.forEach(data, function(room, index_room,array_room){
                    roomlist[roomlist.length] = {
                        "roomid": room.roomId,
                        "score": room.score=="尚未打分" ? "" : room.score,
                        "roomscoreid": room.roomScoreId
                    }
                });
            });
        });
        return roomlist;
    }
    //获取快速打分床位分
    $scope.getKsdfBedsScores = function(){
        var bedlist = [];
        angular.forEach($scope.ksdfFlatList, function(floor,index_floor,array_floor){
           angular.forEach(floor.roomlist, function(roomrow,index_rrow,array_rrow){
                angular.forEach(roomrow, function(room, index_room,array_room){
                    angular.forEach(room.bedlist, function(bed, index_bed,array_bed){
                        bedlist[bedlist.length] = {
                            "bedid": bed.bedid,
                            "score": bed.score=="尚未打分" ? "" : bed.score,
                            "bedscoreid": bed.bedscoreid
                        }
                    })
                });
            });
        });
        //var a = JSON.stringify(bedlist)+"";
        return bedlist;
    }

    //下载样表(日)
    $scope.downloadGradeScoreTable = function(){
        $rootScope.loading = true;
        GradeService.downloadSampleTable({
                type:1
        }).success(function(data){
            if(data.code == 0){
                location.href=data.data.fileUrl;
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
        }) 
    }
    $scope.uploadFile = function(event){
        var files = event.target.files;
        ////console.log(files);
        if(files[0].name.split(".").pop() != "xls" && files[0].name.split(".").pop() != "xlsx"){
            swal('提示', '文件格式不正确！请上传*.xls或*.xlsx文件', 'error'); 
            return false;
        }//console.log(files[0].name);
        $scope.importFileName = files[0].name;
        uploadExcel = files[0];
        $scope.$digest();
    };
    //数据导入
    $scope.subImport = function(fun){
        if(!uploadExcel)return;
        var form = document.createElement('form');
        form.enctype = 'multipart/form-data';
        var fdata = new FormData(form);
        if (!fdata) { swal('提示', '你的浏览器不支持文件上传！', 'error'); return false; };
        fdata.append('file', uploadExcel);
        fdata.append('title',$scope.importFileName);
        fdata.append('token',AppConfig.token);
        fdata.append('schoolcode',AppConfig.schoolCode);
        fdata.append('roomtypeid',$rootScope.treeDay[0].typeList[0].typeId);
        fdata.append('bedtypeid',$rootScope.treeDay[0].typeList[1].typeId);
        fdata.append('adminid',AppConfig.adminId);
        // console.log(uploadExcel);
        $rootScope.loading = true;
        return GradeService.importScoresData(fdata,$scope.type).success(function(data){
            //console.log(data);
            if(data.code == 0){
                swal("提示","上传成功！", "success");
                if(fun && typeof fun == 'function') fun();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
            refresh();
        })
    }
    //下载错误数据
    $scope.download = function(id){
        console.log(id);
        $rootScope.loading = true;
        GradeService.downloadImport({
            id:id,
            type:0
            }).success(function(data){
            //console.log(data.data.fileUrl);
            if(data.code == 0){
                location.href=data.data.fileUrl;
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
        })
    }
    //下载导入文件
    $scope.downloadImfile = function(id){
        $rootScope.loading = true;
        GradeService.downloadImportfile(id).success(function(data){
            console.log(data);
            //console.log(data.data.fileUrl);
            if(data.code == 0){
                location.href=data.data.fileUrl;
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
        })
    }
}]);
