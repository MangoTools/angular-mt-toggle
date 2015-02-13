/*
 * mt-toggle
 * https://github.com/MangoTools/mt-toggle/

 * Version:
 * License: MIT
 *
 */
'use strict';

angular.module('angular.mt.toggle', [])
    .directive('mtToggle', [
        function() {
            return {
                restrict: 'AE',
                scope: {
                    model:'=ngModel',
                    type:'@',
                    threeStates:'@' // three state mode if present
                },
                replace: true,
                template:
                '<span class="mt-toggle" ng-class="rootClasses" ng-click="toggle()">' +
                '   <i class="fa" ng-class="classes"></i>' +
                '</span>',

                link: function postLink(scope, element) {
                    $(element).disableSelection();
                },
                controller: function($scope, $element){

                    var threeStatesValue;
                    if(!angular.isDefined($scope.threeStates)){
                        $scope.threeStates=false;
                    }else if($scope.threeStates!='undefined'){
                        threeStatesValue=$scope.threeStates;
                    }

                    $scope.rootClasses = {
                        selected: false,
                        unselected: false
                    };
                    $scope.classes = {
                        'fa-toggle-on':true,
                        'fa-toggle-off':false
                    };

                    $scope.$watch('model', function(){
                        if(angular.isDefined($scope.model) && $scope.model!==threeStatesValue){
                            if($scope.type==='number' || $scope.type==='text') {
                                $scope.classes['fa-toggle-on'] = $scope.model;
                                $scope.classes['fa-toggle-off'] = !$scope.model;
                                $scope.rootClasses['selected'] = $scope.model;
                                $scope.rootClasses['unselected'] = !$scope.model;
                            }
                            else{
                                var val = $scope.model>0?1:0;
                                $scope.classes['fa-toggle-on'] = val;
                                $scope.classes['fa-toggle-off'] = !val;
                                $scope.rootClasses['selected'] = val;
                                $scope.rootClasses['unselected'] = !val;
                            }

                        }else{
                            $scope.classes['fa-toggle-on']=false;
                            $scope.classes['fa-toggle-off']=true;
                            $scope.rootClasses['selected']=false;
                            $scope.rootClasses['unselected']=false;
                        }
                    });

                    $scope.toggle = function(){
                        if($scope.type==='number'){
                            if($scope.model>0){
                                $scope.model=0;
                            }else if($scope.model===0){
                                $scope.model=$scope.threeStates?threeStatesValue:1;
                            }else{
                                $scope.model=1;
                            }
                        }else if($scope.type==='text'){
                            if($scope.model>0){
                                $scope.model='';
                            }else{
                                $scope.model=$scope.threeStates?threeStatesValue:1;
                            }
                        }else{
                            if($scope.model===true){
                                $scope.model=false;
                            }else if($scope.model===false){
                                $scope.model=$scope.threeStates?threeStatesValue:true;
                            }else{
                                $scope.model=true;
                            }
                        }
                    };
                }
            };
        }
    ]);
