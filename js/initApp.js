var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', '$sceProvider', '$locationProvider', function ($routeProvider, $sceProvider, $locationProvider) {
    $routeProvider.
        when('/:param1', {
            templateUrl: function (urlParams) {
                if (urlParams.param1 == 'app') {
                    return 'views/dash.html';
                }
            }
        }).
        when('/:param1/:param2', {
            templateUrl: function (urlParams) {
                if (urlParams.param1 == 'app') {
                    return 'views/dash.html';
                }
                if (urlParams.param1 == 'ui') {
                    return 'views/render.html';
                }
                else {
                    return 'views/dash.html';
                }
            }
        }).
        when('/', {
            templateUrl: function (urlParams) {
                return 'views/dash.html';
            }
        }).
        otherwise({
            redirectTo: '/'
        });
    // $sceProvider.enabled(false);
    // $locationProvider.html5Mode(true);
}]);


app.directive('ngLongPress', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element[0].addEventListener('dragstart', function (event) {
                // Handle the dragstart event
                event.dataTransfer.setData('text/plain', 'data'); // You can set custom data
                console.log('dragstart')
            });
        }
    };
});

// From Eduardo Cuomo, https://stackoverflow.com/a/36414606

app.directive('pressableElement', function ($timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $elm, $attrs) {

            $elm.bind('touchstart', function (evt) {
                $scope.longPress = true;
                $scope.click = true;

                // onLongPress: on-long-press
                $timeout(function () {
                    $scope.click = false;
                    if ($scope.longPress && $attrs.onLongPress) {
                        $scope.$apply(function () {
                            $scope.$eval($attrs.onLongPress, { $event: evt });
                        });
                    }
                }, $attrs.timeOut || 600); // timeOut: time-out

                // onTouch: on-touch
                if ($attrs.onTouch) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.onTouch, { $event: evt });
                    });
                }
            });


            $elm.bind('mousedown', function (evt) {
                $scope.longPress = true;
                $scope.click = true;

                // onLongPress: on-long-press
                $timeout(function () {
                    $scope.click = false;
                    if ($scope.longPress && $attrs.onLongPress) {
                        $scope.$apply(function () {
                            $scope.$eval($attrs.onLongPress, { $event: evt });
                        });
                    }
                }, $attrs.timeOut || 600); // timeOut: time-out

                // onTouch: on-touch
                if ($attrs.onTouch) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.onTouch, { $event: evt });
                    });
                }
            });

            $elm.bind('touchend', function (evt) {
                $scope.longPress = false;

                // onTouchEnd: on-touch-end
                if ($attrs.onTouchEnd) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.onTouchEnd, { $event: evt });
                    });
                }

                // onClick: on-click
                if ($scope.click && $attrs.onClick) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.onClick, { $event: evt });
                    });
                }
            });

            $elm.bind('mouseup', function (evt) {
                $scope.longPress = false;

                // onTouchEnd: on-touch-end
                if ($attrs.onTouchEnd) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.onTouchEnd, { $event: evt });
                    });
                }

                // onClick: on-click
                if ($scope.click && $attrs.onClick) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.onClick, { $event: evt });
                    });
                }
            });

            // $elm.bind('mousemove', function (evt) {
            //     $scope.longPress = false;
            //     console.log("moved")
            // });

            // $elm.bind('touchmove', function (evt) {
            //     $scope.longPress = false;
            // });
        }
    };
})


app.directive('ngDraggable', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element[0].addEventListener('dragstart', function (event) {
                // Handle the dragstart event
                event.dataTransfer.setData('text/plain', 'data'); // You can set custom data
                console.log('dragstart')
            });
        }
    };
});

app.directive('ngDroppable', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element[0].addEventListener('dragover', function (event) {
                // Handle the dragover event
                event.preventDefault();

                scope.notes.droppingImage = true;
            });

            element[0].addEventListener('drop', function (event) {
                // Handle the drop event
                event.preventDefault();
                var data = event.dataTransfer.getData('text/plain');

                scope.$apply(function () {
                    scope.notes.uploadImageOnDrop(event);
                });
                // Process the dropped data
            });

            element[0].addEventListener('dragleave', function (event) {
                // Handle the dragleave event

                scope.notes.droppingImage = false
            });
        }
    };
});

app.filter('numkeysFirebase', function () {
    return function (object) {
        if (object == null) {
            return null
        }
        else {
            countO = 0;
            for (var key in object) {
                if (key[0] != '$' && key != 'forEach') {
                    countO = countO + 1;
                }
            }
            return countO
        }
    }
});

app.filter('stringLength', function () {
    return function (string) {
        if (string == null) {
            return null
        }
        else {
            return string.length
        }
    }
});

app.filter('reverse', function () {
    return function (input) {
        if (angular.isArray(input)) {
            // Reverse an array
            return input.slice().reverse();
        } else if (angular.isObject(input)) {
            // Reverse an object (key-value pairs)
            var reversedObject = {};
            Object.keys(input).reverse().forEach(function (key) {
                reversedObject[key] = input[key];
            });
            return reversedObject;
        } else {
            return input;
        }
    };
});

// order by filter, avoid duplicates error, save keys in array

app.filter('orderObjectBy', function () {
    return function (items, field, reverse) {
        var filtered = [];
        var keys = [];
        var i = 0;
        angular.forEach(items, function (item, key) {
            item.key = key;
            keys.push(key);
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        if (reverse) filtered.reverse();
        var ordered = {};
        for (var i = 0; i < filtered.length; i++) {
            ordered[keys[i]] = filtered[i];
        }
        return ordered;
    }
});

// example use
// <div ng-repeat="item in items | orderObjectBy:'name':true">