angular.module('flatpcApp')
.controller('GradeForWeekCtrl', ['$scope','AppConfig','$rootScope', 'FlatService','TermService','$filter','GradeService','RoomService','PublicService','RuleService',
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
    }
    $scope.media = {
        items:'',
        tab:1,
        source:0,
        setTab:function(n) {
            this.tab = n;
            this.epage = 1;
            refresh();
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
            // //console.log(this);
            refresh();
        },
        yearIndex:0,
        termIndex:0,
        week:0,
        weekList:[],
        setWeek:function (week) {
            this.week = week;
            refresh();
        },
        setYear:function (n) {
            n = n || 1;
            if(n < 0){
                if(this.termIndex > 0){
                    this.termIndex--;
                }else{
                    if(this.yearIndex < $rootScope.treeTerm.length - 1){
                        this.yearIndex++;
                        this.termIndex = $rootScope.treeTerm[this.yearIndex].semesterList.length-1;
                    }
                    else return;
                }
            }else{
                if(this.termIndex < $rootScope.treeTerm[this.yearIndex].semesterList.length - 1){
                    this.termIndex++;
                }else{
                    if(this.yearIndex > 0){
                        this.yearIndex --;
                        this.termIndex = 0;
                    }
                    else return;
                }
            }
            $scope.media.weekList  = $filter('sliceWeek')($rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex]);
            refresh();
        },
        getYear:function (n) {
            n = n || 0;
            if(!$rootScope.treeTerm) return {};
            try {
                if( n < 0){
                    if(this.termIndex > 0){
                        return {
                            year:$rootScope.treeTerm[this.yearIndex].year,
                            term:$rootScope.treeTerm[this.yearIndex].semesterList[this.termIndex-1].semesterName
                        }
                    }else{
                        if(this.yearIndex < $rootScope.treeTerm.length - 1){
                            if($rootScope.treeTerm[this.yearIndex+1].semesterList.length>0)
                                return {
                                    year:$rootScope.treeTerm[this.yearIndex+1].year,
                                    term:$rootScope.treeTerm[this.yearIndex+1].semesterList[$rootScope.treeTerm[this.yearIndex+1].semesterList.length-1].semesterName
                                };
                            else
                                return {
                                    year:null,
                                    term:null
                                };
                        }else{
                            return {
                                year:null,
                                term:null
                            }
                        }
                    }
                }else{
                    if(this.termIndex < $rootScope.treeTerm[this.yearIndex].semesterList.length - 1){
                        return {
                            year:$rootScope.treeTerm[this.yearIndex].year,
                            term:$rootScope.treeTerm[this.yearIndex].semesterList[this.termIndex+1].semesterName
                        }
                    }else{
                        if(this.yearIndex > 0){
                            return {
                                year:$rootScope.treeTerm[this.yearIndex-1].year,
                                term:$rootScope.treeTerm[this.yearIndex-1].semesterList[0].semesterName
                            }
                        }else{
                            return {
                                year:null,
                                term:null
                            }
                        }
                    }
                }
            } catch (error) {
                return {
                    year:null,
                    term:null
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
                    semesterid:$rootScope.treeTerm[this.yearIndex].semesterList[this.termIndex].semesterId,
                    currentweek:this.week,
                    type:0
                }).success(function (data) {
                    $rootScope.loading = false;
                    if(data.code == 0){
                        location.href = data.data.fileUrl;
                    }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    ////console.log(data);
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
                    semesterid:$rootScope.treeTerm[this.yearIndex].semesterList[this.termIndex].semesterId,
                    currentweek:this.week,
                    tobed:this.tobed,
                    type:0
                }).success(function (data) {
                    $rootScope.loading = false;
                    if(data.code == 0){
                        location.href = data.data.fileUrl;
                    }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    ////console.log(data);
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
                    if($rootScope.menuCheck(188)){
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
                    if($scope.switch.bed && $rootScope.menuCheck(189)){
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
                    if($scope.switch.photo && $rootScope.menuCheck(190)){
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
                    if($scope.switch.role && $rootScope.menuCheck(265)){
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
                return this.setTab(1);
            }
                
        },
        dataInit : function (item,parent) {
            //打分初始化相关
            this.item = item;
            this.tab = 1;
            // //console.log(item);
            this.img = null;
            this.bed = null;
            this.room = null;
            this.rule = null;
            return this.getData();
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
                            mold:0
                        }).success(function (data) {
                            $rootScope.loading = false;
                            if(data.code == 0){
                                that.room = data.data;
                                that.roomGradeType =data.type;
                                that.score =data.score;
                                that.getSum(true);
                                that.getBedData();
                            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                            else
                                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            ////console.log(data);
                        });
                    }
                    else{
                        if($rootScope.treeWeek[0] && $rootScope.treeWeek[0].typeList && $rootScope.treeWeek[0].typeList[0].itemList && $scope.media.tab==1)
                        {
                            that.room = $rootScope.treeWeek[0].typeList[0].itemList;
                            that.getSum(true);
                            that.getBedData();
                            //$rootScope.treeWeek[0].tableId;
                            //$rootScope.treeWeek[0].typeList[0].typeId;
                        }    
                        else
                            that.room = [];
                        
                        //console.log($rootScope.treeWeek[0]);
                        
                    }
                    break;
                case 2:
                    this.getBedData();
                case 3:
                    $rootScope.loading = true;
                    //console.log(this.item);
                    return GradeService.getGradeImgs({
                        token:AppConfig.token,
                        roomid:that.item.roomId,
                        semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                        currentweek:$scope.media.week,
                        type:0
                    }).success(function (data) {
                        $rootScope.loading = false;
                        
                        if(data.code == 0){
                            that.img = data.data;
                            if(fun && typeof fun == "function") fun();
                        }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                        else
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        ////console.log(data);
                    });
                case 4:
                    $rootScope.loading = true;
                    return RuleService.getListByRoom({
                        token:AppConfig.token,
                        schoolcode:AppConfig.schoolCode,
                        specialid:this.item.roomId+'-'+$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId+'-'+$scope.media.week
                    }).success(function (data) {
                        $rootScope.loading = false;
                        
                        if(data.code == 0){
                            that.rule = data.data;
                        }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                        else
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        ////console.log(data);
                    });
            }
            return null;
        },
        getBedData: function(){
            var that = this;
            $rootScope.loading = true;
            return GradeService.getBedGrade({
                token:AppConfig.token,
                roomid:this.item.roomId,
                semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                currentweek:$scope.media.week,
                mold:0
            }).success(function (data) {
                
                
                $rootScope.loading = false;
                if(data.code == 0){
                    
                    that.bed = data.data;
                    that.bedScoreId = 1;
                    that.bedGradeType =data.type; 
                    // that.totalScore =data.totalScore;
                    if(data.data.length>0 && $scope.media.tab==1){
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
                                if($rootScope.treeWeek[0] && $rootScope.treeWeek[0].typeList && $rootScope.treeWeek[0].typeList[0].itemList)
                                {
                                    options = $rootScope.treeWeek[0].typeList[1].itemList;
                                    //$rootScope.treeWeek[0].tableId;
                                    //$rootScope.treeWeek[0].typeList[1].typeId;
                                }    
                                else
                                    options = [];
                                //console.log(options);
                                options.forEach(function (item) {
                                    //console.log(item);
                                        bed.itemList.push({
                                            itemId:item.itemId,
                                            title:item.title,
                                            standardType:item.standardType,
                                            maxScore:item.standardType?-1:item.fullMark,
                                            score:item.standardType?-1:item.fullMark
                                        })
                                })
                            }
                        })
                    }
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                ////console.log(data);
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
            // //console.log(this.room);
            this.room.forEach(function (item,i) {
                var list = item.itemList || item.subNodes;
                // //console.log(list);
                for(var j = 0;j < list.length; j++){
                    grades += '{"itemid":' + (list[j].itemId) + ',"score":' + list[j].score +'},';
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
                    mold:0
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
                    semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                    currentweek:$scope.media.week,
                    adminid:AppConfig.adminId,
                    scoreitem:grades,
                    typeid:$rootScope.treeWeek[0].typeList[0].typeId,
                    tableid:$rootScope.treeWeek[0].tableId,
                    mold:0,
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
            // //console.log(this.bedScoreId);
            if(!(that.bed && that.bed.length>0)){
                if(that.img){
                    that.gradeImg(fun);
                }
                else if(that.rule)that.ruleSave(fun);
                return;
            }
            // //console.log(this.room);
            this.bed.forEach(function (item,i) {
                var list = item.itemList;
                // //console.log(list);
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
            if(grades.length > 0){
                $rootScope.loading = true;
                if(that.bedGradeType){
                    GradeService.editBedGrade({
                        token:AppConfig.token,
                        roomid:that.item.roomId,
                        semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                        currentweek:$scope.media.week,
                        scoreitem:grades,
                        typeid:$rootScope.treeWeek[0].typeList[1].typeId,
                        tableid:$rootScope.treeWeek[0].tableId,
                        type:that.bedGradeType,
                        score:that.score,
                        mold:0
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
                        semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                        currentweek:$scope.media.week,
                        adminid:AppConfig.adminId,
                        scoreitem:grades,
                        typeid:$rootScope.treeWeek[0].typeList[1].typeId,
                        tableid:$rootScope.treeWeek[0].tableId,
                        type:that.bedGradeType,
                        score:that.score,
                        mold:0
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
            
            var imgs = "",that = this;
            this.img.forEach(function (item,i) {
                imgs += (item.fileId || item.fileid) + ',';
                
            })
            if(imgs.length > 0)
                imgs = imgs.substring(0,imgs.length-1);
            $rootScope.loading = true;
            GradeService.uploadImg({
                token:AppConfig.token,
                schoolcode:AppConfig.schoolCode,
                roomid:this.item.roomId,
                semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                currentweek:$scope.media.week,
                adminid:AppConfig.adminId,
                fileids:imgs,
                type:0
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
                specialid:this.item.roomId+'-'+$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId+'-'+$scope.media.week,
                adminid:AppConfig.adminId,
                itemlist:items,
                source:0
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
                    return $scope.switch.week && (
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
        // var e = arguments.callee.caller.arguments[0] || window.event; 
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
        // //console.log(fdata);
        $rootScope.loading = true;
        return PublicService.imgUpload(fdata).success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                $scope.cardMedia.img = $scope.cardMedia.img || [];
                $scope.cardMedia.img.push({
                    picUrl:data.data.serverPath,
                    fileId:data.data.fileId
                });
                // //console.log($scope.cardMedia.img);
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
        
    }
    
    
    //界面初始化相关
    if(!$rootScope.treeTerm)
        TermService.getList().success(function(data){
            //console.log(data);
            if(data.code == 0){
                $rootScope.treeTerm = data.data;
                getFlat();
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
        }); 
    else {
        getFlat();
    }
    
    function getFlat() {
       if(!$rootScope.treeFlat){
            FlatService.getList(AppConfig.schoolCode).success(function(data){
                ////console.log(data);
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
        if(!$rootScope.treeWeek)
            return GradeService.getSettingList({type:0,isopen:1}).success(function(data){
                if(data.code == 0){
                    $rootScope.treeWeek = data.data;
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
        for(var i = 0;i < $rootScope.treeTerm.length;i ++){
            for(var j = 0; j < $rootScope.treeTerm[i].semesterList.length ; j ++ ){
                if(($rootScope.treeTerm[i].semesterList[j].isCurrent) || (i == $rootScope.treeTerm.length-1 && j == $rootScope.treeTerm[i].semesterList.length-1)){
                    $scope.media.yearIndex = i;
                    $scope.media.termIndex = j;
                    $scope.media.week = $rootScope.treeTerm[i].semesterList[j].currentWeek || 1;
                    $scope.media.weekList  = $filter('sliceWeek')($rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex]);
                    // //console.log($scope.media.weekList);
                    if($rootScope.menuCheck(63)){
                        $scope.media.tab = 1;
                    }else if($rootScope.menuCheck(64)){
                        $scope.media.tab = 2;
                    }else if($rootScope.menuCheck(65)){
                        $scope.media.tab = 3;
                    }else{
                        return;
                    }
                    if($rootScope.treeFlat.cmpusList[0]&&$rootScope.treeFlat.cmpusList[0].liveAreaList[0]&&$rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0]&&$rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0].flatId){
                        $scope.media.show(3,$rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0],$rootScope.treeFlat.cmpusList[0],$rootScope.treeFlat.cmpusList[0].liveAreaList[0]);
                    }else
                        $rootScope.loading = false;
                    return;
                }
            }
            
        }
        swal("提示","没有设置学期", "error"); 
        $rootScope.loading = false;
    };
    function refresh(n) {
        if($scope.media.flatid.length<1 || $scope.media.week<1)return;
        if(!n)$scope.media.epage = 1;
        $rootScope.loading = true;
        if($scope.media.tab == 1){
            GradeService.getListByFlat({
                flatid:$scope.media.flatid,
                semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                currentweek:$scope.media.week || 1,
                type:0
            }).success(function (data) {
                $rootScope.loading = false;
                if(data.code == 0){
                    data.list.floorList = data.list.floorList || [];
                    data.list.floorList.forEach(function(list,index){
                        list.roomList = list.roomList || [];
                        list.roomList =  $filter('sliceArray')(list.roomList,10,index);
                        // //console.log(index);
                    });
                    $scope.flat = data.list;
                    $scope.flat.flatName = $scope.media.campus + '-' + $scope.media.liveArea + '-' + $scope.media.title;
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                
                //console.log(data);
            })
        }else if($scope.media.tab == 2){
            GradeService.getQuickScoreList({
                flatid:$scope.media.flatid,
                currentweek: $scope.media.week,
                semesterid: $rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                type:0
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
                type:0
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
                semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                currentweek:$scope.media.week,
                type:0
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
                // //console.log(data);
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
                semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                currentweek:$scope.media.week,
                tobed:$scope.media.tobed,
                type:0
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
                
                // //console.log(data);
            })
        }
    };
    
    //快速打分(周)
    $scope.saveQuickScores = function(pama){
        swal({   
                title: "确认保存",   
                text: "确认保存第"+$scope.media.week+"周打分的成绩吗？",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "确定",   
                cancelButtonText: "取消",   
                closeOnConfirm: false 
            }, 
            function(){
                $rootScope.loading = true;
                return GradeService.allQuickScores({
                    schoolcode:AppConfig.schoolCode,
                    currentweek: $scope.media.week,
                    semesterid: $rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                    adminid:AppConfig.adminId,
                    roomtypeid: $rootScope.treeWeek[0].typeList[0].typeId,
                    bedtypeid: $rootScope.treeWeek[0].typeList[1].typeId,
                    roomlist: $scope.getKsdfRoomsScores(),
                    bedlist: $scope.getKsdfBedsScores(),
                    type:0
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
        return bedlist;
    }
    
    //下载样表(周)
    $scope.downloadGradeScoreTable = function(){
        $rootScope.loading = true;
        GradeService.downloadSampleTable({
                type:0
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
    //数据导入保存
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
        fdata.append('roomtypeid',$rootScope.treeWeek[0].typeList[0].typeId);
        fdata.append('bedtypeid',$rootScope.treeWeek[0].typeList[1].typeId);
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
    //下载错误数据
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