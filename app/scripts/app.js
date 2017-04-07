'use strict';

/**
 * @ngdoc overview
 * @name flatpcApp
 * @description
 * # flatpcApp
 *
 * Main module of the application.
 */
angular
  .module('flatpcApp', [
    //'ngAnimate',
    // 'ngCookies',
    // 'ngResource',
    // 'ngSanitize',
    'ui.router',
    // 'ngTouch',
    'frapontillo.bootstrap-switch'
  ])
  .constant('AppConfig',{
    //   
      //WEB_ROOT:'http://120.55.84.193/Geese_Apartment/',

     WEB_ROOT:'http://code.houqinbao.com/Geese_Apartment/',
      //WEB_ROOT_DOWNLOAD:'http://test.houqinbao.com/gyxt_api/',
      
    //WEB_ROOT:'http://192.168.2.116:8080/Geese_Apartment/',

        //WEB_ROOT:'http://192.168.2.138:8080/Geese_Apartment/',

        // WEB_ROOT:'http://114.55.17.193/Geese_Apartment/',
     //WEB_ROOT:'http://127.0.0.1:8080/Geese_Apartment/',
     //WEB_ROOT:'http://ap.houqinbao.com/Geese_Apartment/',
    WEB_ROOT_MESSAGE:'http://120.55.84.193:8080/Geese_Quality_Supervision/',
    FRAME:'http://code.houqinbao.com:3338/Apartment/',
    //FRAME:'http://192.168.2.138/Apartment/',
    REPORT:'http://test.houqinbao.com/Report/',
    REPORTNEW:'http://code.houqinbao.com:3338/ReportNew/',
    SHOWER:'http://code.houqinbao.com:3338/Shower/',
    UCENTER:'http://code.houqinbao.com:3338/ucenter/',
    PHYSICAL:'http://code.houqinbao.com:3338/physical/',
    HYDROPOWER:'http://code.houqinbao.com:3338/hydropower/',
    EXAM:'http://test3.houqinbao.com/Examination/',
    HOTEL:'http://120.26.48.150/hotel/',
    BUS:'http://code.houqinbao.com:3338/bus/',
    FORMINING:'http://code.houqinbao.com:3338/formining/',
    QUESTION:'http://120.26.48.150/question/',
    MEET:'http://code.houqinbao.com:3338/meet/',
    WENJUAN:'http://code.houqinbao.com:3338/wenjuan2/',
    HUICHANG:'http://code.houqinbao.com:3338/huichang/',
    NEWREPAIR:'http://testbx.houqinbao.com/', //新版报修
      schoolCode:0,
	  token:'',
      adminId:0,
      nodeIds:''
  }).run(['$rootScope', '$location', 'AppConfig','authority','$stateParams','$http',
		function($rootScope, $location, AppConfig,authority,$stateParams,$http) {
            //侧边栏收缩控制
            var w = document.documentElement.clientWidth||document.body.clientWidth;
            if(w < 1024) $rootScope.miniAside = true;
            
            $rootScope.routerInit = function(menu){
                $rootScope.sysMenu = [menu,menu,""];
            }
            $rootScope.menuCheck = authority.menuCheck;
            $rootScope.authority = '';
			$rootScope.$on('$stateChangeStart',
				function(event, toState, toParams, fromState, fromParams) {
                    if(authority.check()){
                        $rootScope.loginSwitch = true;
                    }else{
                        $location.path('/login');
                    }
                    $rootScope.sysMenu = authority.transform(toState.name);
                    $rootScope.loading = true;
                    // console.log(AppConfig.nodeIds)
            });
            $rootScope.$on('$stateChangeSuccess',
				function(event, toState, toParams, fromState, fromParams) {
                    
                    if(!$rootScope.sysMenu)$location.path('/index');

            });
            $rootScope.$on('$stateChangeError', 
                function(event, toState, toParams, fromState, fromParams, error){ 
                    sweetAlert("页面加载出错", "错误信息：" + error.status, "warning");
            });
			
		}
	])
  .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
    .state('login', {
        url: "/login",
        views: {
            "login": {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            }
        }
    })
    .state('nbdx', {
        url: "/nbdx",
        views: {
            "login": {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            }
        }
    })
    .state('hzsf', {
        url: "/hzsf",
        views: {
            "login": {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            }
        }
    })
    .state('cslg', {
        url: "/cslg",
        views: {
            "login": {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            }
        }
    })
    .state('sqxy', {
        url: "/sqxy",
        views: {
            "login": {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            }
        }
    })
    .state('sxwl', {
        url: "/sxwl",
        views: {
            "login": {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            }
        }
    })
    .state('index', {
        url: "/index?p",
        views: {
            "": {
                templateUrl: 'views/menu.html',
                controller: 'MenuCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('flats', {
        url: "/flats",
        views: {
            "": {
                templateUrl: 'views/flat/flats.html',
                controller: 'FlatCtrls'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('flat1', {
        url: "/flat1",
        views: {
            "": {
                templateUrl: 'views/flat/list-selectByFlat.html',
                controller: 'Flat1Ctrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('college', {
        url: "/college",
        views: {
            "": {
                templateUrl: 'views/flat/list-selectByCollege.html',
                controller: 'CollegeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('live', {
        url: "/live",
        views: {
            "": {
                templateUrl: 'views/flat/live.html',
                controller: 'LiveCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('change', {
        url: "/change",
        views: {
            "": {
                templateUrl: 'views/flat/change.html',
                controller: 'ChangeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('quit', {
        url: "/quit",
        views: {
            "": {
                templateUrl: 'views/flat/quit.html',
                controller: 'QuitCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('check', {
        url: "/check",
        views: {
            "": {
                templateUrl: 'views/flat/check.html',
                controller: 'CheckCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('graduation', {
        url: "/graduation",
        views: {
            "": {
                templateUrl: 'views/flat/graduation.html',
                controller: 'GraduationCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('arrearage', {
        url: "/arrearage",
        views: {
            "": {
                templateUrl: 'views/flat/arrearage.html',
                controller: 'ArrearageCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('holiday', {
        url: "/holiday",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'HolidayCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('gradeForWeek', {
        url: "/gradeForWeek",
        views: {
            "": {
                templateUrl: 'views/grade/grade.html',
                controller: 'GradeForWeekCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('gradeForDay', {
        url: "/gradeForDay",
        views: {
            "": {
                templateUrl: 'views/grade/grade.html',
                controller: 'GradeForDayCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('gradeForMonth', {
        url: "/gradeForMonth",
        views: {
            "": {
                templateUrl: 'views/grade/grade.html',
                controller: 'GradeForMonthCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('spot', {
        url: "/spot",
        views: {
            "": {
                templateUrl: 'views/grade/spot.html',
                controller: 'SpotCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('gradeForSpot', {
        url: "/gradeForSpot",
        views: {
            "": {
                templateUrl: 'views/grade/grade.html',
                controller: 'GradeForSpotCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('rule', {
        url: "/rule",
        views: {
            "": {
                templateUrl: 'views/grade/rule.html',
                controller: 'RuleCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('scoreStatistics', {
        url: "/scoreStatistics",
        views: {
            "": {
                templateUrl: 'views/grade/statistics.html',
                controller: 'StatisticsCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('ruleStatistics', {
        url: "/ruleStatistics",
        views: {
            "": {
                templateUrl: 'views/grade/ruleStatistics.html',
                controller: 'RuleStatisticsCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('appraiseStatistics', {
        url: "/appraiseStatistics",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'AppraiseStatisticsCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('scoreStatisticsForCollege', {
        url: "/scoreStatisticsForCollege",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'ScoreStatisticsForCollegeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('ruleStatisticsForCollege', {
        url: "/ruleStatisticsForCollege",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'RuleStatisticsForCollegeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('appraiseStatisticsForCollege', {
        url: "/appraiseStatisticsForCollege",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'AppraiseStatisticsForCollegeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('gradeSetting', {
        url: "/gradeSetting",
        views: {
            "": {
                templateUrl: 'views/grade/setting.html',
                controller: 'GradeSettingCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('ruleSetting', {
        url: "/ruleSetting",
        views: {
            "": {
                templateUrl: 'views/grade/ruleSetting.html',
                controller: 'RuleSettingCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('appraiseSetting', {
        url: "/appraiseSetting",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'AppraiseSettingCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('visit', {
        url: "/visit",
        views: {
            "": {
                templateUrl: 'views/checkIn/visit.html',
                controller: 'VisitCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('key', {
        url: "/key",
        views: {
            "": {
                templateUrl: 'views/checkIn/key.html',
                controller: 'KeyCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('late', {
        url: "/late",
        views: {
            "": {
                templateUrl: 'views/checkIn/late.html',
                controller: 'LateCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    
    .state('dormitoryWeek', {
        url: "/dormitoryWeek",
        views: {
            "": {
                templateUrl: 'views/dormitory/dormitoryWeek.html',
                controller: 'dormitoryWeekCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('dormitoryMonth', {
        url: "/dormitoryMonth",
        views: {
            "": {
                templateUrl: 'views/dormitory/dormitoryMonth.html',
                controller: 'dormitoryMonthCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('dormitoryRandom', {
        url: "/dormitoryRandom",
        views: {
            "": {
                templateUrl: 'views/dormitory/dormitoryRandom.html',
                controller: 'dormitoryRandomCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('dormitoryMarkSet', {
        url: "/dormitoryMarkSet",
        views: {
            "": {
                templateUrl: 'views/dormitory/dormitoryMarkSet.html',
                controller: 'dormitoryMarkSetCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('safeCheck', {
        url: "/safeCheck",
        views: {
            "": {
                templateUrl: 'views/safety/safeCheck.html',
                controller: 'safeCheckCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('singleCheck', {
        url: "/singleCheck",
        views: {
            "": {
                templateUrl: 'views/safety/singleCheck.html',
                controller: 'singleCheckCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('checkResult', {
        url: "/checkResult",
        views: {
            "": {
                templateUrl: 'views/safety/checkResult.html',
                controller: 'checkResultCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('safeSet', {
        url: "/safeSet",
        views: {
            "": {
                templateUrl: 'views/safety/safeSet.html',
                controller: 'safeSetCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('checkResults', {
        url: "/checkResults",
        views: {
            "": {
                templateUrl: 'views/bedroom/checkResults.html',
                controller: 'checkResultsCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('weekCheck', {
        url: "/weekCheck",
        views: {
            "": {
                templateUrl: 'views/bedroom/weekCheck.html',
                controller: 'weekCheckCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('dayCheck', {
        url: "/dayCheck",
        views: {
            "": {
                templateUrl: 'views/bedroom/dayCheck.html',
                controller: 'dayCheckCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('resultsCount', {
        url: "/resultsCount",
        views: {
            "": {
                templateUrl: 'views/bedroom/resultsCount.html',
                controller: 'resultsCountCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('bedroomCheckSet', {
        url: "/bedroomCheckSet",
        views: {
            "": {
                templateUrl: 'views/bedroom/bedroomCheckSet.html',
                controller: 'bedroomCheckSetCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })

    .state('bedroomGradeDay', {
        url: "/bedroomGradeDay",
        views: {
            "": {
                templateUrl: 'views/bedroom/bedroomGradeDay.html',
                controller: 'bedroomGradeDayCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('bedroomGradeRule', {
        url: "/bedroomGradeRule",
        views: {
            "": {
                templateUrl: 'views/bedroom/bedroomGradeRule.html',
                controller: 'bedroomGradeRuleCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('bedroomGradeSet', {
        url: "/bedroomGradeSet",
        views: {
            "": {
                templateUrl: 'views/bedroom/bedroomGradeSet.html',
                controller: 'bedroomGradeSetCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })

    .state('logs', {
        url: "/logs",
        views: {
            "": {
                templateUrl: 'views/journal/logs.html',
                controller: 'logsCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('floor', {
        url: "/floor",
        views: {
            "": {
                templateUrl: 'views/floor/tree.html',
                controller: 'FloorCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('room', {
        url: "/room",
        views: {
            "": {
                templateUrl: 'views/floor/room.html',
                controller: 'RoomCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
      .state('initialize', {
        url: "/initialize",
        views: {
            "": {
                templateUrl: 'views/floor/initialize.html',
                controller: 'initializeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('type', {
        url: "/type",
        views: {
            "": {
                templateUrl: 'views/floor/type.html',
                controller: 'TypeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('class', {
        url: "/class",
        views: {
            "": {
                templateUrl: 'views/collect/tree.html',
                controller: 'SchoolCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('student', {
        url: "/student",
        views: {
            "": {
                templateUrl: 'views/collect/student.html',
                controller: 'StudentCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('stay', {
        url: "/stay",
        views: {
            "": {
                templateUrl: 'views/collect/stay.html',
                controller: 'FlatCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('term', {
        url: "/term",
        views: {
            "": {
                templateUrl: 'views/setting/term.html',
                controller: 'TermCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('userList', {
        url: "/userList",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'UserListCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    //实名审核
    .state('verify', {
        url: "/verify",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'verifyCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    //认证方式
      .state('form', {
        url: "/form",
        views: {
            "": {
                templateUrl: 'views/approve.html',
                controller: 'formCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    //教职工认证列表
      .state('staff', {
        url: "/staff",
        views: {
            "": {
                templateUrl: 'views/center/staff.html',
                controller: 'staffCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    //统一身份配置
      .state('identity', {
        url: "/identity",
        views: {
            "": {
                templateUrl: 'views/admin/identity.html',
                controller: 'identityCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('user', {
        url: "/user",
        views: {
            "": {
                templateUrl: 'views/admin/user.html',
                controller: 'UserCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('admin', {
        url: "/admin",
        views: {
            "": {
                templateUrl: 'views/admin/admin.html',
                controller: 'AdminCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('group', {
        url: "/group",
        views: {
            "": {
                templateUrl: 'views/admin/group.html',
                controller: 'GroupCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('flatManager', {
        url: "/flatManager",
        views: {
            "": {
                templateUrl: 'views/admin/manager.html',
                controller: 'FlatManagerCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('counselor', {
        url: "/counselor",
        views: {
            "": {
                templateUrl: 'views/admin/counselor.html',
                controller: 'CounselorCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('collegeAccount', {
        url: "/collegeAccount",
        views: {
            "": {
                templateUrl: 'views/admin/collegeAccount.html',
                controller: 'collegeAccountCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('role', {
        url: "/role",
        views: {
            "": {
                templateUrl: 'views/role/role.html',
                controller: 'RoleCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('template', {
        url: "/template",
        views: {
            "": {
                templateUrl: 'views/role/template.html',
                controller: 'RoleTemplateCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('menu', {
        url: "/menu",
        views: {
            "": {
                templateUrl: 'views/role/menu.html',
                controller: 'MenuSettingCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('padmanage', {
        url: "/padmanage",
        views: {
            "": {
                templateUrl: 'views/pad/padmanage.html',
                controller: 'padManageCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('baseSetup', {
        url: "/baseSetup",
        views: {
            "": {
                templateUrl: 'views/admin/baseSetup.html',
                controller: 'baseSetupCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
     .state('graduate', {
        url: "/leaveschool",
        views: {
            "": {
                templateUrl: 'views/grade/leaveschool.html',
                controller: 'leaveschoolCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('graduatepeople', {
        url: "/leaveschoolpeople",
        views: {
            "": {
                templateUrl: 'views/grade/leaveschoolpeople.html',
                controller: 'leaveschoolpeopleCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('basicsetting', {
        url: "/basicsetting",
        views: {
            "": {
                templateUrl: 'views/grade/basicsetting.html',
                controller: 'basicsettingCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('accountmanagement', {
        url: "/accountmanagement",
        views: {
            "": {
                templateUrl: 'views/grade/accountmanagement.html',
                controller: 'accountmanagementCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
     .state('newstudent', {
        url: "/newstudent",
        views: {
            "": {
                templateUrl: 'views/grade/newStudentAllocation.html',
                controller: 'newStudentCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('list', {
        url: "/list",
        views: {
            "": {
                templateUrl: 'views/list-tree.html',
                controller: 'ListCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('list1', {
        url: "/list1",
        views: {
            "": {
                templateUrl: 'views/list-normal.html',
                controller: 'ListCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('meet', {
        url: "/meet",
        views: {
            "": {
                templateUrl: 'views/enrol/meet.html',
                controller: 'meetCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('order', {
        url: "/order",
        views: {
            "": {
                templateUrl: 'views/shower/order.html',
                controller: 'orderCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('showper', {
        url: "/showper",
        views: {
            "": {
                templateUrl: 'views/shower/personnel.html',
                controller: 'personnelCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('showset', {
        url: "/showset",
        views: {
            "": {
                templateUrl: 'views/shower/setting.html',
                controller: 'settingCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('bookinggrade', {
        url: "/bookinggrade",
        views: {
            "": {
                templateUrl: 'views/hotel/bookinggrade.html',
                controller: 'bookingGradeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('datastatistics', {
        url: "/datastatistics",
        views: {
            "": {
                templateUrl: 'views/hotel/datastatistics.html',
                controller: 'dataStatisticsCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('roomgrade', {
        url: "/roomgrade",
        views: {
            "": {
                templateUrl: 'views/hotel/roomgrade.html',
                controller: 'roomGradeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('hotelset', {
        url: "/hotelset",
        views: {
            "": {
                templateUrl: 'views/hotel/hotelset.html',
                controller: 'hotelSetCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('persongrade', {
        url: "/persongrade",
        views: {
            "": {
                templateUrl: 'views/hotel/persongrade.html',
                controller: 'personGradeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('busbookinggrade', {
        url: "/busbookinggrade",
        views: {
            "": {
                templateUrl: 'views/busbooking/busbookinggrade.html',
                controller: 'busbookingGradeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('relatedset', {
        url: "/relatedset",
        views: {
            "": {
                templateUrl: 'views/busbooking/relatedset.html',
                controller: 'relatedSetCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('driver', {
        url: "/driver",
        views: {
            "": {
                templateUrl: 'views/busbooking/driver.html',
                controller: 'DriverCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('formNotice', {
        url: "/formNotice",
        views: {
            "": {
                templateUrl: 'views/formining/formNotice.html',
                controller: 'formNoticeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('formMarketPrice', {
        url: "/formMarketPrice",
        views: {
            "": {
                templateUrl: 'views/formining/formMarketPrice.html',
                controller: 'formMarketPriceCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('formPriceGrade', {
        url: "/formPriceGrade",
        views: {
            "": {
                templateUrl: 'views/formining/formPriceGrade.html',
                controller: 'formPriceGradeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('formPersonGrade', {
        url: "/formPersonGrade",
        views: {
            "": {
                templateUrl: 'views/formining/formPersonGrade.html',
                controller: 'formPersonGradeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('questionnaire', {
        url: "/questionnaire",
        views: {
            "": {
                templateUrl: 'views/question/questionnaire.html',
                controller: 'questionNaireCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('questionstatist', {
        url: "/questionstatist",
        views: {
            "": {
                templateUrl: 'views/question/questionstatist.html',
                controller: 'questionStatistCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('questionsetting', {
        url: "/questionsetting",
        views: {
            "": {
                templateUrl: 'views/serviceevaluation/questionsetting.html',
                controller: 'questionSettingCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('questionmanagement', {
        url: "/questionmanagement",
        views: {
            "": {
                templateUrl: 'views/serviceevaluation/questionmanagement.html',
                controller: 'questionManagementCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('bookingdetails', {
        url: "/bookingdetails",
        views: {
            "": {
                templateUrl: 'views/venuebooking/bookingdetails.html',
                controller: 'bookingDetailsCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('personnelmanagement', {
        url: "/personnelmanagement",
        views: {
            "": {
                templateUrl: 'views/venuebooking/personnelmanagement.html',
                controller: 'personnelManagementCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('relatedsetting', {
        url: "/relatedsetting",
        views: {
            "": {
                templateUrl: 'views/venuebooking/relatedsetting.html',
                controller: 'relatedSettingCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('large', {
    url: "/large",
    views: {
        "": {
            templateUrl: 'views/checkIn/large.html',
            controller: 'largeCtrl'
        },
        "aside": {
            templateUrl: "views/aside.html",
            controller: 'AsideCtrl'
        },
        "header": {
            templateUrl: "views/header.html",
            controller: 'HeaderCtrl'
        }
    }
})
.state('weigui', {
        url: "/weigui",
        views: {
            "": {
                templateUrl: 'views/checkIn/weigui.html',
                controller: 'weiguiCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('kuaicha', {
        url: "/kuaicha",
        views: {
            "": {
                templateUrl: 'views/flatManager/kuaicha.html',
                controller: 'kuaichaCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('hutiao', {
        url: "/hutiao",
        views: {
            "": {
                templateUrl: 'views/flatManager/hutiao.html',
                controller: 'hutiaoCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('roomchange', {
        url: "/roomchange",
        views: {
            "": {
                templateUrl: 'views/flatManager/roomchange.html',
                controller: 'roomchangeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('latego', {
        url: "/latego",
        views: {
            "": {
                templateUrl: 'views/checkIn/latego.html',
                controller: 'lategoCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('lategoCounselor', {
        url: "/lategoCounselor",
        views: {
            "": {
                templateUrl: 'views/checkIn/lategoCounselor.html',
                controller: 'lategoCounselorCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('lateCounselor', {
        url: "/lateCounselor",
        views: {
            "": {
                templateUrl: 'views/checkIn/lateCounselor.html',
                controller: 'lateCounselorCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('illegalManage', {
        url: "/illegalManage",
        views: {
            "": {
                templateUrl: 'views/checkIn/illegalManage.html',
                controller: 'illegalManageCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('visitorStatistics', {
        url: "/visitorStatistics",
        views: {
            "": {
                templateUrl: 'views/checkIn/visitorStatistics.html',
                controller: 'visitorStatisticsCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('checkSet', {
        url: "/checkSet",
        views: {
            "": {
                templateUrl: 'views/checkIn/checkSet.html',
                controller: 'checkSetCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('newStudentOrder', {
        url: "/newStudentOrder",
        views: {
            "": {
                templateUrl: 'views/reportSecond/newStudentOrder.html',
                controller: 'newStudentOrderCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('reportMode', {
        url: "/reportMode",
        views: {
            "": {
                templateUrl: 'views/reportSecond/reportMode.html',
                controller: 'reportModeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('bedBooking', {
        url: "/bedBooking",
        views: {
            "": {
                templateUrl: 'views/reportSecond/bedBooking.html',
                controller: 'bedBookingCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('newQuestion', {
        url: "/newQuestion",
        views: {
            "": {
                templateUrl: 'views/reportSecond/newQuestion.html',
                controller: 'newQuestionCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('newPackage', {
        url: "/newPackage",
        views: {
            "": {
                templateUrl: 'views/reportSecond/newPackage.html',
                controller: 'newPackageCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('safeEdu', {
        url: "/safeEdu",
        views: {
            "": {
                templateUrl: 'views/reportSecond/safeEdu.html',
                controller: 'safeEduCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('reportSecondBaseSet', {
        url: "/reportSecondBaseSet",
        views: {
            "": {
                templateUrl: 'views/reportSecond/reportSecondBaseSet.html',
                controller: 'reportSecondBaseSetCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('repdc', {
        url: "/repdc",
        views: {
            "": {
                templateUrl: 'views/collect/reportdirectory.html',
                controller: 'reportdirectoryCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('repway', {
        url: "/repway",
        views: {
            "": {
                templateUrl: 'views/collect/reportway.html',
                controller: 'reportwayCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('repnoe', {
        url: "/repnoe",
        views: {
            "": {
                templateUrl: 'views/collect/reportnotice.html',
                controller: 'reportnoticeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('receiveinfo', {
        url: "/receiveinfo",
        views: {
            "": {
                templateUrl: 'views/collect/receiveinfo.html',
                controller: 'receiveinfoCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('packageset', {
        url: "/packageset",
        views: {
            "": {
                templateUrl: 'views/collect/packageset.html',
                controller: 'packagesetCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('basicset', {
        url: "/basicset",
        views: {
            "": {
                templateUrl: 'views/collect/basicset.html',
                controller: 'basicsetCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('quiltse', {
        url: "/quiltse",
        views: {
            "": {
                templateUrl: 'views/collect/quiltreserve.html',
                controller: 'quiltreserveCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('entrycount', {
        url: "/entrycount",
        views: {
            "": {
                templateUrl: 'views/entry/entrycount.html',
                controller: 'entrycountCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('abnormalcount', {
        url: "/abnormalcount",
        views: {
            "": {
                templateUrl: 'views/entry/abnormalcount.html',
                controller: 'abnormalcountCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('entryset', {
        url: "/entryset",
        views: {
            "": {
                templateUrl: 'views/entry/entryset.html',
                controller: 'entrysetCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('allview', {
        url: "/allview",
        views: {
            "": {
                templateUrl: 'views/entry/allview.html',
                controller: 'allviewCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('fastquery', {
        url: "/fastquery",
        views: {
            "": {
                templateUrl: 'views/entry/fastquery.html',
                controller: 'fastqueryCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('statisticsLd', {
        url: "/statisticsLd",
        views: {
            "": {
                templateUrl: 'views/entry/statisticsLd.html',
                controller: 'statisticsLdCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('statisticsXy', {
        url: "/statisticsXy",
        views: {
            "": {
                templateUrl: 'views/entry/statisticsXy.html',
                controller: 'statisticsXyCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('timeSd', {
        url: "/timeSd",
        views: {
            "": {
                templateUrl: 'views/entry/timeSd.html',
                controller: 'timeSdCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('timeGr', {
        url: "/timeGr",
        views: {
            "": {
                templateUrl: 'views/entry/timeGr.html',
                controller: 'timeGrCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('unusualLd', {
        url: "/unusualLd",
        views: {
            "": {
                templateUrl: 'views/entry/unusualLd.html',
                controller: 'unusualLdCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('unusualXy', {
        url: "/unusualXy",
        views: {
            "": {
                templateUrl: 'views/entry/unusualXy.html',
                controller: 'unusualXyCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('nobackLd', {
        url: "/nobackLd",
        views: {
            "": {
                templateUrl: 'views/entry/nobackLd.html',
                controller: 'nobackLdCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('nobackXy', {
        url: "/nobackXy",
        views: {
            "": {
                templateUrl: 'views/entry/nobackXy.html',
                controller: 'nobackXyCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('wanguiXy', {
        url: "/wanguiXy",
        views: {
            "": {
                templateUrl: 'views/entry/wanguiXy.html',
                controller: 'wanguiXyCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('wanguiLd', {
        url: "/wanguiLd",
        views: {
            "": {
                templateUrl: 'views/entry/wanguiLd.html',
                controller: 'wanguiLdCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('nocardXy', {
        url: "/nocardXy",
        views: {
            "": {
                templateUrl: 'views/entry/nocardXy.html',
                controller: 'nocardXyCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('nocardLd', {
        url: "/nocardLd",
        views: {
            "": {
                templateUrl: 'views/entry/nocardLd.html',
                controller: 'nocardLdCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('unusualentryLd', {
        url: "/unusualentryLd",
        views: {
            "": {
                templateUrl: 'views/entry/unusualentryLd.html',
                controller: 'unusualentryLdCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('unusualentryXy', {
        url: "/unusualentryXy",
        views: {
            "": {
                templateUrl: 'views/entry/unusualentryXy.html',
                controller: 'unusualentryXyCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('actionwarn', {
        url: "/actionwarn",
        views: {
            "": {
                templateUrl: 'views/entry/actionwarn.html',
                controller: 'actionwarnCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('actionwarncustom', {
        url: "/actionwarncustom",
        views: {
            "": {
                templateUrl: 'views/entry/actionwarncustom.html',
                controller: 'actionwarncustomCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('personalleave', {
        url: "/personalleave",
        views: {
            "": {
                templateUrl: 'views/entry/personalleave.html',
                controller: 'personalleaveCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('classleave', {
        url: "/classleave",
        views: {
            "": {
                templateUrl: 'views/entry/classleave.html',
                controller: 'classleaveCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('holidaymanage', {
        url: "/holidaymanage",
        views: {
            "": {
                templateUrl: 'views/entry/holidaymanage.html',
                controller: 'holidaymanageCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('entryregister', {
        url: "/entryregister",
        views: {
            "": {
                templateUrl: 'views/entry/entryregister.html',
                controller: 'entryregisterCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('newstudentdiv', {
        url: "/newstudentdiv",
        views: {
            "": {
                templateUrl: 'views/grade/newStudentDivide.html',
                controller: 'newstudentdivCtrls'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('newstudentregister', {
        url: "/newstudentregister",
        views: {
            "": {
                templateUrl: 'views/grade/newStudentRegister.html',
                controller: 'newstudentregisterCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('newstudentIn', {
        url: "/newstudentIn",
        views: {
            "": {
                templateUrl: 'views/grade/newStudentIn.html',
                controller: 'newstudentInCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('zhufenbu', {
        url: "/zhufenbu",
        views: {
            "": {
                templateUrl: 'views/flatManager/zhufenbu.html',
                controller: 'pandectdistributeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('biandong', {
        url: "/biandong",
        views: {
            "": {
                templateUrl: 'views/flat/biandong.html',
                controller: 'staffvariationCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('staycost', {
        url: "/staycost",
        views: {
            "": {
                templateUrl: 'views/flat/staycost.html',
                controller: 'stayCostCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('dormrefer', {
        url: "/dormrefer",
        views: {
            "": {
                templateUrl: 'views/reportforduty/dormrefer.html',
                controller: 'dormreferCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('dormdist', {
        url: "/dormdist",
        views: {
            "": {
                templateUrl: 'views/reportforduty/dormdist.html',
                controller: 'dormdistCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('newstudentschool', {
        url: "/newstudentschool",
        views: {
            "": {
                templateUrl: 'views/grade/newstudentschool.html',
                controller: 'newstudentschoolCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('exams', {
        url: "/exams",
        views: {
            "": {
                templateUrl: 'views/exam/exams.html',
                controller: 'examsCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('examgrade', {
        url: "/examgrade",
        views: {
            "": {
                templateUrl: 'views/exam/examgrade.html',
                controller: 'examgradeCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('exampeople', {
        url: "/exampeople",
        views: {
            "": {
                templateUrl: 'views/exam/exampeople.html',
                controller: 'exampeopleCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
       .state('newstudentdivschool', {
        url: "/newstudentdivschool",
        views: {
            "": {
                templateUrl: 'views/grade/newstudentdivschool.html',
                controller: 'newstudentdivschoolcodeCtrls'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('exammessage', {
        url: "/exammessage",
        views: {
            "": {
                templateUrl: 'views/exam/exammessage.html',
                controller: 'exammessageCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('physical', {
        url: "/physical",
        views: {
            "": {
                templateUrl: 'views/physical/physical.html',
                controller: 'physicalCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('hydropower', {
        url: "/hydropower",
        views: {
            "": {
                templateUrl: 'views/hydropower/hydropower.html',
                controller: 'hydropowerCtrl'
            },
            // "aside": {
            //     templateUrl: "views/aside.html",
            //     controller: 'AsideCtrl'
            // },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('hydwrite', {
        url: "/hydwrite",
        views: {
            "": {
                templateUrl: 'views/hydropower/hydwrite.html',
                controller: 'hydWriteCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('hydpayment', {
        url: "/hydpayment",
        views: {
            "": {
                templateUrl: 'views/hydropower/hydpayment.html',
                controller: 'hydPaymentCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('hydset', {
        url: "/hydset",
        views: {
            "": {
                templateUrl: 'views/hydropower/hydset.html',
                controller: 'hydSetCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('hydhistory', {
        url: "/hydhistory",
        views: {
            "": {
                templateUrl: 'views/hydropower/hydhistory.html',
                controller: 'hydHistoryCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    });
    


    $urlRouterProvider.otherwise('/login');
  });
  
Date.prototype.Format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}