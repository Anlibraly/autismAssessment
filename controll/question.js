/**
 * @author Anlibraly
 * @class  测评模板
 * time 2015-12-15
 */
var myQues = angular.module("myQues",[]);
// 问题列表
myQues.controller("quesList", function($scope) {
    $scope.str = s;  
	$scope.oks = 0;
	$scope.num = 0;
    $scope.years = '';
    $scope.mons = '';
    $scope.totalmons = 0;
	$scope.score = 0;
	$scope.nextatter = '';
    $scope.nomal = new Array();
    $scope.special = new Array();
    $scope.url = "http://www.asd-family.cn/countas.action?clickType=";
    $scope.questions = questions[0];//quesdata.js
    $scope.$watch('mons',function(){
        if ($scope.mons==''||($scope.mons>=0&&$scope.mons<=12)) {
            m = $scope.mons;
        }else{
            $scope.mons = m;
            $scope.$apply();
        }
    });
    $scope.$watch('years',function(){
        if ($scope.years==''||($scope.years>=0&&$scope.years<=3)) {
            y = $scope.years;
        }else{
            $scope.years = y;
            $scope.$apply();
        }       
    });
    $scope.share = function(){
        
    };
});

myQues.directive("start", function() {
    return function(scope, element, attrs) {
        scope.$watch('totalmons', function() {
                if(scope.totalmons > 0&&scope.totalmons<=48){
                    attrs.$set("style","display:none;");
                }else{
                    attrs.$set("style","display:block;");
                }
        });
    };
});
myQues.directive("startbtn", function($http) {
    return function(scope, element, attrs) {
        element.bind("click", function() {
            scope.str = 1;
            scope.$apply();
        });  
    };
});

myQues.directive("closeage", function($http) {
    return function(scope, element, attrs) {
        element.bind("click", function() {
            scope.str = 0;
            scope.$apply();
        });  
    };
});

myQues.directive("age", function() {
    return function(scope, element, attrs) {  
        scope.$watch('str', function() {
            if(scope.str > 0){
                    attrs.$set("style","display:block;");
                    document.body.style.height="100%";
                    document.body.style.overflow="hidden";
                }else{
                    attrs.$set("style","display:none;");
                    document.body.style.height="";
                    document.body.style.overflow="";
                }
          });        
        scope.$watch('totalmons', function() {
            if((scope.totalmons > 0&&scope.totalmons<=48)||scope.str == 0){
                    attrs.$set("style","display:none;");
                    document.body.style.height="";
                    document.body.style.overflow="";
                }else{
                    attrs.$set("style","display:block;");
                    document.body.style.height="100%";
                    document.body.style.overflow="hidden";
                }
          });
    };
});

myQues.directive("okay", function($http) {
    return function(scope, element, attrs) {
        element.bind("click", function() {
            if(scope.years<0||scope.years>50||scope.mons<0||scope.mons>12){
                //alert('请按提示输入合法数据');
            }else{
                scope.totalmons = scope.years*12+scope.mons;
                var mon = [2,4,6,9,18,48];
                for (var i = 0; i < mon.length; i++) {
                    if(scope.totalmons<=mon[i]){
                        scope.questions = questions[i];
                        break;
                    }
                };                
                $http({method: 'GET', url: scope.url+'1'}).
                success(function(data, status, headers, config) {
                    //alert(1);
                }).
                error(function(data, status, headers, config) {
                    //alert(0);
                });
                scope.$apply();
            }
        });  
    };
});

myQues.directive("ques", function() {
    return function(scope, element, attrs) {
    	scope.$watch('totalmons', function() {
    	     	if(scope.totalmons > 0&&scope.totalmons<=48){
    	     		attrs.$set("style","display:block;");
    	     	}else{
    	     		attrs.$set("style","display:none;");
    	     	}
    	});
        scope.$watch('oks', function() {
            if(scope.oks == 1){
                attrs.$set("style","display:none;");
            }else if (scope.totalmons > 0&&scope.totalmons<=48){
                attrs.$set("style","display:block;");
            }
        });          
    };
});

myQues.directive("result", function($http) {
    return function(scope, element, attrs) {
    	scope.$watch('oks', function() {
	     	if(scope.oks == 1){
                $http({method: 'GET', url: scope.url+'2'}).
                success(function(data, status, headers, config) {

                }).
                error(function(data, status, headers, config) {
                  
                });
                if(!resultDialog){
            		setTimeout(function(){
            			attrs.$set("style","display:block;");
    		     		document.body.style.height="";
                        document.body.style.overflow="";
                        var tpl = document.getElementById('videos-template').innerText;
                        var tempFn = doT.template(tpl);
                        var rHtml = tempFn(scope.special);
                        document.getElementById('special_list').innerHTML = rHtml; 
            		},500);
                }else{
		     		attrs.$set("style","display:block;");
                    document.getElementById('info').setAttribute("style","display:none;");
		     		document.body.style.height="";
		     		document.body.style.overflow="";
                }
	     	}else{
	     		attrs.$set("style","display:none;");
	     		document.body.style.height="";
	     		document.body.style.overflow="";
	     	}
	  });    	
    };
});

myQues.directive("closeresult", function($http) {
    return function(scope, element, attrs) {
        element.bind("click", function() {
            scope.oks = 0;
            scope.$apply();
        });  
    };
});

myQues.directive("fade", function($http) {
    return function(scope, element, attrs) {
        element.bind("touchmove", function(e) {
        	 e.preventDefault();  
        });  
    };
});

myQues.directive("borders", function() {
    return function(scope, element, attrs) {
        scope.$watch('oks', function() {
            if(scope.oks == 1){
            setTimeout(function(){
                var spc = document.getElementById('special_list');
                var h = spc.offsetHeight; 
                var tp = spc.offsetTop;
                attrs.$set("style","top:"+tp+"px;height:"+h+"px;display:block;");
            },10);       
            }else{
                attrs.$set("style","display:none;");
            }
        });      
    };
});

myQues.directive("loading", function($http) {
    return function(scope, element, attrs) {
        scope.$watch('oks', function() {
            if(scope.oks == 1){
            	attrs.$set("style","display:block;");
        		setTimeout(function(){
        			attrs.$set("style","display:none;");
        		},500);
            }else if (scope.totalmons > 0&&scope.totalmons<=48){
                attrs.$set("style","display:none;");
            }
        });     	
    };
});

myQues.directive("myradioweb", function() {
    return function(scope, element, attrs) {
    	scope.$watch('num', function() {
    		var n = scope.num;
    		var vl = scope.questions[n].value;
    		if(vl == attrs.v){
    			element.prop("checked",true);
    		}else{
    			element.prop("checked",false);
    		}
    	});
    	element.bind("click", function() {
    		var n = scope.num;
    		var vl = scope.questions[n].value;
    		var tp = scope.questions[n].type;
    		if(vl*tp>0){
    			scope.score -= vl*tp;
                var i = scope.special.indexOf(scope.questions[n]);
                if (i>=0) {
                    scope.special.splice(i,1);
                };
    		}else{
                var i = scope.nomal.indexOf(scope.questions[n]);
                if (i>=0) {
                    scope.nomal.splice(i,1);
                }
            }
    		scope.questions[n].value = attrs.v;
    		if(tp*attrs.v>0){
    			scope.score += tp*attrs.v;
                scope.special.push(scope.questions[n]);
    		}else{
                scope.nomal.push(scope.questions[n]);
            }
    		setTimeout(function(){
    			if(scope.num != scope.questions.length-1&&scope.questions[n].value!=0){
	    			scope.num++;
    			}
    			scope.$apply();
    		},100);
        });    
    };
});

myQues.directive("myradio", function() {
    return function(scope, element, attrs) {
    	scope.$watch('num', function() {
    		var n = scope.num;
    		var vl = scope.questions[n].value;
    		if(vl == element.find("input").attr('v')){
    			element.find("input").prop("checked",true);
        		attrs.$set("style","background:#ECF5FE;border:1px solid #C9E2FB;");
    		}else{
    			element.find("input").prop("checked",false);
    			attrs.$set("style","background:#FFFFFF;border:1px solid #B7B7B7;");
    		}
    	});
    	element.bind("click", function() {
    		document.getElementById("yes").setAttribute("style","background:#FFFFFF;border:1px solid #B7B7B7;");
    		document.getElementById("no").setAttribute("style","background:#FFFFFF;border:1px solid #B7B7B7;");
    		var n = scope.num;
    		var vl = scope.questions[n].value;
    		var tp = scope.questions[n].type;
    		if(vl*tp>0){
    			scope.score -= vl*tp;
                 var i = scope.special.indexOf(scope.questions[n]);
                if (i>=0) {
                    scope.special.splice(i,1);
                };               
    		}else{
                var i = scope.nomal.indexOf(scope.questions[n]);
                if (i>=0) {
                    scope.nomal.splice(i,1);
                }
            }

    		scope.questions[n].value = element.find("input").attr('v');
    		if(tp*element.find("input").attr('v')>0){
    			scope.score += tp*element.find("input").attr('v');
                scope.special.push(scope.questions[n]);
            }else{
                scope.nomal.push(scope.questions[n]);
            }
    		element.find("input").prop("checked",true);
    		attrs.$set("style","background:#ECF5FE;border:1px solid #C9E2FB;");

    		setTimeout(function(){
    			if(scope.num != scope.questions.length-1&&scope.questions[n].value!=0){
	    			scope.num++;
    			}
    			scope.$apply();
    		},100);
        });       	
    };
});

myQues.directive("asdwarn", function($http) {
    return function(scope, element, attrs) {
        element.bind("click", function() {
                $http({method: 'GET', url: scope.url+'3'}).
                success(function(data, status, headers, config) {

                }).
                error(function(data, status, headers, config) {
                  
                });            
                window.open('http://form.mikecrm.com/f.php?t=IKq6nm');
        });     

    };
});

myQues.directive("noasd", function($http) {
    return function(scope, element, attrs) {
        element.bind("click", function() {
                $http({method: 'GET', url: scope.url+'4'}).
                success(function(data, status, headers, config) {

                }).
                error(function(data, status, headers, config) {
                  
                });            
                window.open('http://form.mikecrm.com/f.php?t=1i9vyw');
        });     

    };
});

myQues.directive("prepage", function() {
    return function(scope, element, attrs) {
    	element.bind("click", function() {
    		if(scope.num > 0){
        		scope.num --;
        		scope.$apply();
        	}
        });     

    };
});

myQues.directive("nextpage", function() {
    return function(scope, element, attrs) {
    	element.bind("click", function() {
    		if(!resultDialog&&scope.num != scope.questions.length-1&&scope.questions[scope.num].value!=0){
    			scope.num++;
    		}
    		if(scope.num == scope.questions.length-1&&scope.questions[scope.num].value!=0){
    			scope.oks = 1;
    		} 
    		scope.$apply();
        }); 
    	scope.$watch('num', function() {
    		var n = scope.num;
    		var vl = scope.questions[n].value;
    		scope.nextattr = attrs;
            if(!resultDialog){
        		if(n == scope.questions.length-1){
        			element.val("提 交");
        		}else{
        			element.val("下一题");
        		}
            }else{
                if(n == scope.questions.length-1){
                    attrs.$set("style","background:#A4D700;padding: 3% 10.5%;border-color: #A4D700;");
                }else{
                	attrs.$set("style","background:#C4C4C4;padding: 3% 10.5%;border-color: #C4C4C4;");
                }
            }
     	});    	
    };
});
var shows = -1;
function showVideo(sid){
    if(shows == sid){
        document.getElementById("videos_"+sid).setAttribute("style","display:none;");
        shows = -1;
    }else{
        if (shows != -1) {
            document.getElementById("videos_"+shows).setAttribute("style","display:none;");
        };
        shows = sid;
        document.getElementById("videos_"+shows).setAttribute("style","display:block;");
    }
}