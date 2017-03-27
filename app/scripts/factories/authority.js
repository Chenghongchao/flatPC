'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.factory('authority', ['$rootScope','AppConfig','$state',function ($rootScope,AppConfig,$state) {
    
    var transform = function(name){
        
        name = name || "";
        switch (name){
            case "login":
            case "nbdx":
            case "hzsf":
            case "cslg":
            case "sqxy":
            case "sxwl":
                return ['login'];
            case "index":
                if($rootScope.sysMenu && $rootScope.sysMenu[0]!='login'){
                    return $rootScope.sysMenu;
                }else{
                    var menus = [];
                    if(menuCheck(1)){
                        menus.push('flat');
                        if(menuCheck(6)){
                            menus.push('flat');
                        }else if(menuCheck(7)){
                            menus.push('grade');
                        }else if(menuCheck(8)){
                            menus.push('check');
                        }else menus.push(' ');
                    }else if(menuCheck(2)){
                        menus.push('center');
                        if(menuCheck(353)){
                            menus.push('center');
                        }else if(menuCheck(9)){
                            menus.push('data');
                        }else if(menuCheck(10)){
                            menus.push('collect');
                        }else if(menuCheck(11)){
                            menus.push('floor');
                        }else menus.push(' ');
                    }else if(menuCheck(3)){
                        menus.push('admin');
                        if(menuCheck(13)){
                            menus.push('admin');
                        }else if(menuCheck(12)){
                            menus.push('role');
                        }else menus.push(' ');
                    }else if(menuCheck(367)){
                         menus.push('shower');
                        if(menuCheck(382)){
                            menus.push('order');
                        }else if(menuCheck(383)){
                            menus.push('personnel');
                        }else if(menuCheck(384)){
                            menus.push('setting');
                        }else menus.push(' ');
                     }else if(menuCheck(549)){
                         menus.push('meet');
                        if(menuCheck(550)){
                            menus.push('meet');
                        }else menus.push(' ');
                    }else if(menuCheck(416)){
                         menus.push('exams');
                        if(menuCheck(417)){
                            menus.push('exams');
                        }else if(menuCheck(418)){
                            menus.push('examgrade');
                        }else if(menuCheck(419)){
                            menus.push('exammessage');
                        }else if(menuCheck(420)){
                            menus.push('exampeople');
                        }else menus.push(' ');
                    }else if(menuCheck(492)){
                         menus.push('physical');
                        if(menuCheck(493)){
                            menus.push('physical');
                        }else menus.push(' ');
                    }else if(menuCheck(466)){
                         menus.push('bookinggrade');
                        if(menuCheck(467)){
                            menus.push('bookinggrade');
                        }else if(menuCheck(511)){
                            menus.push('datastatistics');
                        }else if(menuCheck(468)){
                            menus.push('roomgrade');
                        }else if(menuCheck(469)){
                            menus.push('hotelset');
                        }else if(menuCheck(473)){
                            menus.push('persongrade');
                        }else menus.push(' ');
                    }else if(menuCheck(555)){
                         menus.push('busbookinggrade');
                        if(menuCheck(556)){
                            menus.push('busbookinggrade');
                        }else if(menuCheck(557)){
                            menus.push('relatedset');
                        }else if(menuCheck(558)){
                            menus.push('driver');
                        }else menus.push(' ');
                    }else if(menuCheck(567)){
                         menus.push('formNotice');
                        if(menuCheck(568)){
                            menus.push('formNotice');
                        }else if(menuCheck(569)){
                            menus.push('formMarketPrice');
                        }else if(menuCheck(570)){
                            menus.push('formPriceGrade');
                        }else if(menuCheck(571)){
                            menus.push('formPersonGrade');
                        }else menus.push(' ');
                    }else if(menuCheck(474)){
                         menus.push('questionnaire');
                        if(menuCheck(475)){
                            menus.push('questionnaire');
                        }else if(menuCheck(476)){
                            menus.push('questionstatist');
                        }else menus.push(' ');
                    }else if(menuCheck(584)){
                         menus.push('questionsetting');
                        if(menuCheck(585)){
                            menus.push('questionsetting');
                        }else if(menuCheck(586)){
                            menus.push('questionmanagement');
                        }else menus.push(' ');
                    }else if(menuCheck(587)){
                         menus.push('bookingdetails');
                        if(menuCheck(588)){
                            menus.push('bookingdetails');
                        }else if(menuCheck(589)){
                            menus.push('personnelmanagement');
                        }else if(menuCheck(590)){
                            menus.push('relatedsetting');
                        }else menus.push(' ');
                    }else if(menuCheck(5)){
                        menus.push('hydropower');
                        if(menuCheck(526)){
                            menus.push('hydropower');
                        }else if(menuCheck(527)){
                            menus.push('hydwrite');
                        }else if(menuCheck(528)){
                            menus.push('hydpayment');
                        }else if(menuCheck(529)){
                            menus.push('hydset');
                        }else if(menuCheck(530)){
                            menus.push('hydhistory');
                        }else menus.push(' ');
                    }else if(menuCheck(371)){
                        menus.push('graduate');
                        if(menuCheck(377)){
                            menus.push('graduate');
                        }else menus.push(' ');
                    }else if(menuCheck(401)){
                        menus.push('report');
                        if(menuCheck(403)){
                            menus.push('report');
                        }else if(menuCheck(402)){
                            menus.push('quiltreserve');
                        }else if(menuCheck(433)){
                            menus.push('package');
                        }else if(menuCheck(437)){
                            menus.push('preset');
                        }else menus.push(' ');
                    }else if(menuCheck(421)){
                        menus.push('entry');
                        if(menuCheck(422)){
                            menus.push('entry');
                        }else if(menuCheck(423)){
                            menus.push('daily');
                        }else menus.push(' ');
                    }
                    menus.push(' ')
                    return menus;
                }
            case 'flat':
                if(menuCheck(18))
                    return ['flat','flat','flat'];
                else
                    return null;
            case 'college':
                if(menuCheck(19))
                    return ['flat','flat','college'];
                else
                    return null;
            case 'live':
                if(menuCheck(27))
                    return ['flat','flat','live'];
                else
                    return null;
            case 'change':
                if(menuCheck(28))
                    return ['flat','flat','change'];
                else
                    return null;
            case 'quit':
                if(menuCheck(29))
                    return ['flat','flat','quit'];
                else
                    return null;
            case 'check':
                if(menuCheck(30))
                    return ['flat','flat','check'];
                else
                    return null;
            case 'graduation':
            // return ['flat','flat','graduation'];
                if(menuCheck(32))
                    return ['flat','flat','graduation'];
                else
                    return null;
            case 'arrearage':
            // return ['flat','flat','arrearage'];
                if(menuCheck(342))
                    return ['flat','flat','arrearage'];
                else
                    return null;
            case 'holiday':
                if(menuCheck(369))
                    return ['flat','flat','holiday'];
                else
                    return null;
            case 'gradeForWeek':
                if(menuCheck(60))
                    return ['flat','grade','gradeForWeek'];
                else
                    return null;
            case 'gradeForDay':
                if(menuCheck(277))
                    return ['flat','grade','gradeForDay'];
                else
                    return null;
            case 'gradeForMonth':
                if(menuCheck(278))
                    return ['flat','grade','gradeForMonth'];
                else
                    return null;
            case 'spot':
            // return ['flat','grade','spot'];
            case 'gradeForSpot':
            // return ['flat','grade','gradeForSpot'];
                if(menuCheck(279))
                    return ['flat','grade','gradeForSpot'];
                else
                    return null;
            case 'rule':
                if(menuCheck(307))
                    return ['flat','grade','rule'];
                else
                    return null;
            case 'visit':
                if(menuCheck(73))
                    return ['flat','check','visit'];
                else
                    return null;
            case 'key':
                if(menuCheck(74))
                    return ['flat','check','key'];
                else
                    return null;
            case 'late':
                if(menuCheck(75))
                    return ['flat','check','late'];
                else
                    return null;
            case 'logs':
                if(menuCheck(521))
                    return ['flat','journal','logs'];
                else
                    return null;        
            case 'dormitoryWeek':
                if(menuCheck(442))
                    return ['flat','dormitoryCheck','dormitoryWeek'];
                else
                    return null;
             case 'dormitoryMonth':
                if(menuCheck(443))
                    return ['flat','dormitoryCheck','dormitoryMonth'];
                else
                    return null;
             case 'dormitoryRandom':
                if(menuCheck(444))
                    return ['flat','dormitoryCheck','dormitoryRandom'];
                else
                    return null;
             case 'dormitoryMarkSet':
                if(menuCheck(446))
                    return ['flat','dormitoryCheck','dormitoryMarkSet'];
                else
                    return null;
             case 'safeCheck':
                if(menuCheck(461))
                    return ['flat','safetyCheck','safeCheck'];
                else
                    return null;
            case 'singleCheck':
                if(menuCheck(461))
                    return ['flat','safetyCheck','singleCheck'];
                else
                    return null;
             case 'checkResult':
                if(menuCheck(463))
                    return ['flat','safetyCheck','checkResult'];
                else
                    return null;
             case 'safeSet':
                if(menuCheck(465))
                    return ['flat','safetyCheck','safeSet'];
                else
                    return null;
             case 'checkResults':
                if(menuCheck(479))
                    return ['flat','bedroomCheck','checkResults'];
                else
                    return null;
             case 'weekCheck':
                if(menuCheck(525))
                    return ['flat','bedroomCheck','weekCheck'];
                else
                    return null;
             case 'resultsCount':
                if(menuCheck(480))
                    return ['flat','bedroomCheck','resultsCount'];
                else
                    return null;
             case 'bedroomCheckSet':
                if(menuCheck(481))
                    return ['flat','bedroomCheck','bedroomCheckSet'];
                else
                    return null;

             case 'bedroomGradeDay':
                if(menuCheck(611))
                    return ['flat','bedroomGrade','bedroomGradeDay'];
                else
                    return null;
             case 'bedroomGradeRule':
                if(menuCheck(612))
                    return ['flat','bedroomGrade','bedroomGradeRule'];
                else
                    return null;
             case 'bedroomGradeSet':
                if(menuCheck(614))
                    return ['flat','bedroomGrade','bedroomGradeSet'];
                else
                    return null;
            case 'scoreStatistics':
                if(menuCheck(301))
                    return ['flat','grade','scoreStatistics'];
                else
                    return null;
             case 'ruleStatistics':
                if(menuCheck(303))
                    return ['flat','grade','ruleStatistics'];
                else
                    return null;    
            case 'appraiseStatistics':
                if(menuCheck(304))
                    return ['flat','grade','appraiseStatistics'];
                else
                    return null;  
            case 'scoreStatisticsForCollege':
                if(menuCheck(364))
                    return ['flat','grade','scoreStatisticsForCollege'];
                else
                    return null;
             case 'ruleStatisticsForCollege':
                if(menuCheck(365))
                    return ['flat','grade','ruleStatisticsForCollege'];
                else
                    return null;    
            case 'appraiseStatisticsForCollege':
                if(menuCheck(363))
                    return ['flat','grade','appraiseStatisticsForCollege'];
                else
                    return null;  
            case 'gradeSetting':
                if(menuCheck(62))
                    return ['flat','grade','gradeSetting'];
                else
                    return null;
            case 'ruleSetting':
                if(menuCheck(266))
                    return ['flat','grade','ruleSetting'];
                else
                    return null;
            case 'appraiseSetting':
                if(menuCheck(361))
                    return ['flat','grade','appraiseSetting'];
                else
                    return null;
            case 'floor':
                if(menuCheck(125))
                    return ['center','floor','floor'];
                else
                    return null;
            case 'room':
                if(menuCheck(128))
                    return ['center','floor','room'];
                else
                    return null;
            case 'initialize':
                if(menuCheck(448))
                    return ['center','initialize','initialize'];
                else
                    return null;
            case 'type':
                if(menuCheck(130))
                    return ['center','floor','type'];
                else
                    return null;
            case 'student':
                if(menuCheck(108))
                    return ['center','collect','student'];
                else
                    return null;
            case 'stay':
                if(menuCheck(129))
                    return ['center','collect','stay'];
                else
                    return null;
            case 'staff':
                if(menuCheck(603))
                    return ['center','collect','staff'];
                else
                    return null;
            case 'class':
                if(menuCheck(107))
                    return ['center','collect','class'];
                else
                    return null;
            case 'term':
                if(menuCheck(104))
                    return ['center','data','term'];
                else
                    return null;
            case 'userList':
                if(menuCheck(357))
                    return ['center','center','userList'];
                else
                    return null;
           case 'verify':
                if(menuCheck(358))
                    return ['center','center','verify'];
                else
                    return null;
           case 'form':
                if(menuCheck(359))
                    return ['center','center','form'];
                else
                    return null;
            case 'user':
                if(menuCheck(114))
                    return ['admin','admin','user'];
                else
                    return null;
            case 'admin':
                if(menuCheck(111))
                    return ['admin','admin','admin'];
                else
                    return null;
            case 'group':
                if(menuCheck(117))
                    return ['admin','admin','group'];
                else
                    return null;
            case 'flatManager':
                if(menuCheck(522))
                    return ['admin','admin','flatManager'];
                else
                    return null;
            case 'counselor':
                if(menuCheck(523))
                    return ['admin','admin','counselor'];
                else
                    return null; 
            case 'collegeAccount':
                if(menuCheck(576))
                    return ['admin','admin','collegeAccount'];
                else
                    return null;        
            case 'role':
                if(menuCheck(123))
                    return ['admin','role','role'];
                else
                    return null;
            case 'template':
                if(menuCheck(124))
                    return ['admin','role','template'];
                else
                    return null;
            case 'menu':
                if(menuCheck(127))
                    return ['admin','role','menu'];
                else
                    return null;
            case 'padmanage':
                if(menuCheck(510))
                    return ['admin','pad','padmanage'];
                else
                    return null;   
            case 'baseSetup':
                if(menuCheck(617))
                    return ['admin','baseSetup','baseSetup'];
                else
                    return null;   
            case 'graduate':
                if(menuCheck(377))
                    return ['graduate','graduate','leaveschool'];
                else
                    return null;
            case 'graduatepeople':
                if(menuCheck(371))
                    return ['graduate','graduate','leaveschoolpeople'];
                else
                    return null;
            case 'basicsetting':
                if(menuCheck(582))
                    return ['graduate','graduate','basicsetting'];
                else
                    return null;
            case 'accountmanagement':
                if(menuCheck(583))
                    return ['graduate','graduate','accountmanagement'];
                else
                    return null;
                    //case为在定义menu.html定义的跳转地址，return 里面flat为跳转到的头部当行条菜单，flat跳转到的左侧菜单，newstudents为自定义的规则名
           //menu.html中的超链接名
            case 'newstudent':
                if(menuCheck(31))
                //头部菜单，左侧菜单，规则名
                    return ['flat','flat','newstudents'];
                else
                    return null;
            case 'flats':
                if(menuCheck(6))
                //头部菜单，左侧菜单，规则名
                    return ['flat','flat','flats'];
                else
                    return null;
            case 'identity':
                if(menuCheck(360))
                //头部菜单，左侧菜单，规则名
                    return ['data','center','identity'];
                else
                    return null;
            case 'order':
                if(menuCheck(367))
                //头部菜单，左侧菜单，规则名
                    return ['order','order','order'];
                else
                    return null;
             case 'meet':
                if(menuCheck(550))
                //头部菜单，左侧菜单，规则名
                    return ['meet','meet','meet'];
                else
                    return null;
             case 'showper':
                if(menuCheck(367))
                //头部菜单，左侧菜单，规则名
                    return ['order','personnel','personnel'];
                else
                    return null;
             case 'showset':
                if(menuCheck(367))
                //头部菜单，左侧菜单，规则名
                    return ['order','setting','setting'];
                else
                    return null; 
            case 'kuaicha':
                if(menuCheck(391))
                    return ['flat','flat','kuaicha'];
                else
                    return null;
            case 'hutiao':
                if(menuCheck(390))
                    return ['flat','flat','hutiao'];
                else
                    return null;
            case 'roomchange':
                if(menuCheck(524))
                    return ['flat','flat','roomchange'];
                else
                    return null;        
            case 'weigui':
                if(menuCheck(392))
                    return ['flat','check','weigui'];
                else
                    return null;
            case 'large':
                if(menuCheck(394))
                    return ['flat','check','large'];
                else
                    return null;
            case 'illegalManage':
                if(menuCheck(572))
                    return ['flat','check','illegalManage'];
                else
                    return null;
            case 'visitorStatistics':
                if(menuCheck(573))
                    return ['flat','check','visitorStatistics'];
                else
                    return null;
            case 'latego':
                if(menuCheck(395))
                    return ['flat','check','latego'];
                else
                    return null;
            case 'lategoCounselor':
                if(menuCheck(552))
                    return ['flat','check','lategoCounselor'];
                else
                    return null;
            case 'lateCounselor':
                if(menuCheck(553))
                    return ['flat','check','lateCounselor'];
                else
                    return null;
            case 'checkSet':
                if(menuCheck(575))
                    return ['flat','check','checkSet'];
                else
                    return null;
            case 'logs':
                if(menuCheck(521))
                    return ['flat','journal','logs'];
                else
                    return null;
            case 'repdc':
                if(menuCheck(405))
                    return ['report','report','repdc'];
                else
                    return null;
            case 'repway':
                if(menuCheck(406))
                    return ['report','report','repway'];
                else
                    return null;
            case 'repnoe':
                if(menuCheck(407))
                    return ['report','report','repnoe'];
                else
                    return null;
            case 'receiveinfo':
                if(menuCheck(435))
                    return ['report','package','receiveinfo'];
                else
                    return null;
            case 'packageset':
                if(menuCheck(436))
                    return ['report','package','packageset'];
                else
                    return null;
            case 'basicset':
                if(menuCheck(439))
                    return ['report','preset','basicset'];
                else
                    return null;
            case 'quiltse':
                if(menuCheck(402))
                   return ['report','quiltreserve','quiltse'];
                else
                    return null;
            case 'newStudentOrder':
                if(menuCheck(627))
                    return ['reportSecond','reportSecond','newStudentOrder'];
                else
                    return null;  
            case 'reportMode':
                if(menuCheck(628))
                    return ['reportSecond','reportSecond','reportMode'];
                else
                    return null;    
            case 'bedBooking':
                if(menuCheck(629))
                    return ['reportSecond','reportSecond','bedBooking'];
                else
                    return null; 
            case 'newQuestion':
                if(menuCheck(630))
                    return ['reportSecond','reportSecond','newQuestion'];
                else
                    return null; 
            case 'newPackage':
                if(menuCheck(631))
                    return ['reportSecond','reportSecond','newPackage'];
                else
                    return null; 
            case 'safeEdu':
                if(menuCheck(632))
                    return ['reportSecond','reportSecond','safeEdu'];
                else
                    return null;
            case 'reportSecondBaseSet':
                if(menuCheck(633))
                    return ['reportSecond','reportSecond','reportSecondBaseSet'];
                else
                    return null; 
            case 'entrycount':
                if(menuCheck(426))
                    return ['entry','entry','entrycount'];
                else
                    return null;
            case 'abnormalcount':
                if(menuCheck(427))
                    return ['entry','entry','abnormalcount'];
                else
                    return null;
            case 'entryset':
                if(menuCheck(429))
                    return ['entry','entry','entryset'];
                else
                    return null;

            case 'allview':
                if(menuCheck(430))
                    return ['entry','entry','allview'];
                else
                    return null;
            case 'fastquery':
                if(menuCheck(431))
                    return ['entry','entry','fastquery'];
                else
                    return null;
            case 'statisticsLd':
                if(menuCheck(533))
                    return ['entry','entry','statisticsLd'];
                else
                    return null;
            case 'statisticsXy':
                if(menuCheck(535))
                    return ['entry','entry','statisticsXy'];
                else
                    return null;
            case 'timeSd':
                if(menuCheck(536))
                    return ['entry','entry','timeSd'];
                else
                    return null;
            case 'timeGr':
                if(menuCheck(537))
                    return ['entry','entry','timeGr'];
                else
                    return null;
            case 'unusualLd':
                if(menuCheck(539))
                    return ['entry','entry','unusualLd'];
                else
                    return null;
            case 'unusualXy':
                if(menuCheck(540))
                    return ['entry','entry','unusualXy'];
                else
                    return null;
            case 'nobackLd':
                if(menuCheck(541))
                    return ['entry','entry','nobackLd'];
                else
                    return null;
            case 'nobackXy':
                if(menuCheck(542))
                    return ['entry','entry','nobackXy'];
                else
                    return null;
            case 'wanguiLd':
                if(menuCheck(543))
                    return ['entry','entry','wanguiLd'];
                else
                    return null;
            case 'wanguiXy':
                if(menuCheck(544))
                    return ['entry','entry','wanguiXy'];
                else
                    return null;
            case 'nocardLd':
                if(menuCheck(545))
                    return ['entry','entry','nocardLd'];
                else
                    return null;
            case 'nocardXy':
                if(menuCheck(546))
                    return ['entry','entry','nocardXy'];
                else
                    return null;
            case 'unusualentryLd':
                if(menuCheck(547))
                    return ['entry','entry','unusualentryLd'];
                else
                    return null;
            case 'unusualentryXy':
                if(menuCheck(548))
                    return ['entry','entry','unusualentryXy'];
                else
                    return null;
            case 'actionwarn':
                if(menuCheck(450))
                    return ['entry','daily','actionwarn'];
                else
                    return null;
            case 'actionwarncustom':
                if(menuCheck(451))
                    return ['entry','daily','actionwarncustom'];
                else
                    return null;
            case 'personalleave':
                if(menuCheck(453))
                    return ['entry','daily','personalleave'];
                else
                    return null;
            case 'classleave':
                if(menuCheck(454))
                    return ['entry','daily','classleave'];
                else
                    return null;
            case 'holidaymanage':
                if(menuCheck(456))
                    return ['entry','daily','holidaymanage'];
                else
                    return null;
            case 'entryregister':
                if(menuCheck(458))
                    return ['entry','daily','entryregister'];
                else
                    return null;
             case 'newstudentdiv':
                if(menuCheck(408))
                     return ['flat','flat','newstudentdiv'];
                else
                    return null;
             case 'newstudentregister':
                if(menuCheck(409))
                    return ['flat','flat','newstudentregister'];
                else
                    return null;
             case 'newstudentdivschool':
                if(menuCheck(447))
                    return ['flat','flat','newstudentdivschool'];
                else
                    return null;
             case 'newstudentIn':
                if(menuCheck(410))
                     return ['flat','flat','newstudentIn'];
                else
                    return null;
             case 'zhufenbu':
                if(menuCheck(411))
                     return ['flat','flat','zhufenbu'];
                else
                    return null;
             case 'biandong':
                if(menuCheck(412))
                     return ['flat','flat','biandong'];
                else
                    return null;
            case 'staycost':
                if(menuCheck(531))
                     return ['flat','flat','staycost'];
                else
                    return null;
             case 'dormrefer':
                if(menuCheck(413))
                     return ['report','report','dormrefer'];
                else
                    return null;
             case 'dormdist':
                if(menuCheck(414))
                     return ['report','report','dormdist'];
                else
                    return null;
             case 'newstudentschool':
                if(menuCheck(415))
                     return ['flat','flat','newstudentschool'];
                else
                    return null;
             case 'exams':
                if(menuCheck(417))
                     return ['exammessage','exams','exams'];
                else
                    return null;
             case 'examgrade':
                if(menuCheck(418))
                     return ['exammessage','examgrade','examgrade'];
                else
                    return null;
             case 'exammessage':
                if(menuCheck(419))
                     return ['exammessage','exammessage','exammessage'];
                else
                    return null;
             case 'exampeople':
                if(menuCheck(420))
                     return ['exammessage','exampeople','exampeople'];
                else
                    return null;
             case 'physical':
                if(menuCheck(493))
                     return ['physical','physical','physical'];
                else
                    return null;
             case 'bookinggrade':
                if(menuCheck(467))
                    return ['bookinggrade','bookinggrade','bookinggrade'];
                else
                    return null; 
             case 'datastatistics':
                if(menuCheck(511))
                    return ['bookinggrade','datastatistics','datastatistics'];
                else
                    return null; 
             case 'roomgrade':
                if(menuCheck(468))
                    return ['bookinggrade','roomgrade','roomgrade'];
                else
                    return null; 
             case 'hotelset':
                if(menuCheck(469))
                    return ['bookinggrade','hotelset','hotelset'];
                else
                    return null; 
            case 'persongrade':
                if(menuCheck(473))
                    return ['bookinggrade','persongrade','persongrade'];
                else
                    return null; 
            case 'busbookinggrade':
                if(menuCheck(556))
                    return ['busbookinggrade','busbookinggrade','busbookinggrade'];
                else
                    return null; 
            case 'relatedset':
                if(menuCheck(557))
                    return ['busbookinggrade','relatedset','relatedset'];
                else
                    return null; 
            case 'driver':
                if(menuCheck(558))
                    return ['busbookinggrade','driver','driver'];
                else
                    return null;
            case 'formNotice':
                if(menuCheck(568))
                    return ['formNotice','formNotice','formNotice'];
                else
                    return null; 
            case 'formMarketPrice':
                if(menuCheck(569))
                    return ['formNotice','formMarketPrice','formMarketPrice'];
                else
                    return null; 
            case 'formPriceGrade':
                if(menuCheck(570))
                    return ['formNotice','formPriceGrade','formPriceGrade'];
                else
                    return null;   
            case 'formPersonGrade':
                if(menuCheck(571))
                    return ['formNotice','formPersonGrade','formPersonGrade'];
                else
                    return null;                           
             case 'questionnaire':
                if(menuCheck(475))
                    return ['questionnaire','questionnaire','questionnaire'];
                else
                    return null;
             case 'questionstatist':
                if(menuCheck(476))
                    return ['questionnaire','questionstatist','questionstatist'];
                else
                    return null; 
            case 'questionsetting':
                if(menuCheck(585))
                    return ['questionsetting','questionsetting','questionsetting'];
                else
                    return null;
             case 'questionmanagement':
                if(menuCheck(586))
                    return ['questionsetting','questionmanagement','questionmanagement'];
                else
                    return null;
             case 'bookingdetails':
                if(menuCheck(588))
                    return ['bookingdetails','bookingdetails','bookingdetails'];
                else
                    return null;
             case 'personnelmanagement':
                if(menuCheck(589))
                    return ['bookingdetails','personnelmanagement','personnelmanagement'];
                else
                    return null;
             case 'relatedsetting':
                if(menuCheck(590))
                    return ['bookingdetails','relatedsetting','relatedsetting'];
                else
                    return null;
             case 'hydropower':
                if(menuCheck(526))
                    return ['hydropower','hydropower','hydropower'];
                else
                    return null; 
             case 'hydwrite':
                if(menuCheck(527))
                    return ['hydropower','hydwrite','hydwrite'];
                else
                    return null;  
             case 'hydpayment':
                if(menuCheck(528))
                    return ['hydropower','hydpayment','hydpayment'];
                else
                    return null;  
             case 'hydset':
                if(menuCheck(529))
                    return ['hydropower','hydset','hydset'];
                else
                    return null; 
             case 'hydhistory':
                if(menuCheck(30))
                    return ['hydropower','hydhistory','hydhistory'];
                else
                    return null;      
        }
        return null;
    };
    var check = function () {
        function getCookie(name){
            var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr = document.cookie.match(reg))
            return unescape(arr[2]);
            else
            return null;
        }
        AppConfig.adminId     = getCookie('adminId');
        AppConfig.token       = getCookie('token');
        AppConfig.nodeIds     = ',' + getCookie('nodeIds') + ',';
        AppConfig.schoolCode  = getCookie('schoolCode');
        AppConfig.userName    = getCookie('userName');
        AppConfig.roleName    = getCookie('roleName');
        AppConfig.roleId      = getCookie('roleId');
        AppConfig.userAccount = getCookie('userAccount');
        AppConfig.isOpenBed   = getCookie('isOpenBed');
        AppConfig.week        = getCookie('week') || 1;
        AppConfig.month       = getCookie('month') || 1;
        AppConfig.day         = getCookie('day') || 1;
        AppConfig.bed         = getCookie('bed') || 1;
        AppConfig.pass        = getCookie('pass') || 1;
        AppConfig.photo       = getCookie('photo') || 1;
        AppConfig.role        = getCookie('role') || 1;
        AppConfig.takephoto   = getCookie('takephoto') || 1;
        AppConfig.wgphoto   = getCookie('wgphoto') || 1;
        AppConfig.check       = getCookie('check') || 1;
        /*AppConfig.adminId = sessionStorage.adminId;
        AppConfig.token = sessionStorage.token;
        AppConfig.nodeIds = ',' + sessionStorage.nodeIds + ',';
        AppConfig.schoolCode = sessionStorage.schoolCode;
        AppConfig.userName = sessionStorage.userName;
        AppConfig.roleName = sessionStorage.roleName;
        AppConfig.roleId = sessionStorage.roleId;
        AppConfig.userAccount = sessionStorage.userAccount;
        AppConfig.isOpenBed = sessionStorage.isOpenBed;
        
        AppConfig.week = sessionStorage.week || 1;
        AppConfig.month = sessionStorage.month || 1;
        AppConfig.day = sessionStorage.day || 1;
        AppConfig.bed = sessionStorage.bed || 1;
        AppConfig.pass = sessionStorage.pass || 1;
        AppConfig.photo = sessionStorage.photo || 1;
        AppConfig.role = sessionStorage.role || 1;
        AppConfig.takephoto = sessionStorage.takephoto || 1;
        AppConfig.check = sessionStorage.check || 1;*/
        if(AppConfig.adminId && AppConfig.token && AppConfig.nodeIds && AppConfig.schoolCode && AppConfig.userName && AppConfig.roleName && AppConfig.roleId && AppConfig.userAccount){
            return true;
        }
        else return false;
    }
    var menuCheck = function(menu){
        if(AppConfig.nodeIds.length < 2) $location.path('/login');
        // console.log(AppConfig.nodeIds);
        return new RegExp(',' + menu + ',' ).test(AppConfig.nodeIds);
    }
    return {
        check:check,
        transform:transform,
        menuCheck:menuCheck
    }
}]);
