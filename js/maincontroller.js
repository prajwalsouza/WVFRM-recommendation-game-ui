


app.controller('theMainController', ['$scope','$routeParams', '$timeout', '$interval', '$location', '$q', '$http', function($scope, $routeParams, $timeout, $interval, $location, $q, $http) {




    

    // A lot of interesting and useful functions 

    $scope.isNaN = function(value) {
        return isNaN(value);
    }

    $scope.consoleLog = function(info) {
        console.log(info)
    }

    $scope.substring = function(stringX, a, b) {
        if (stringX == null || stringX == undefined || typeof stringX != 'string') {
            return null;
        }
        else if (stringX.length < b) {
            return stringX;
        }
        else {
            return stringX.substring(a, b);
        }
    }

    $scope.textSizeLimiter = function(stringX) {
        if (stringX == null || stringX == undefined || typeof stringX != 'string') {
            return null;
        }
        else if (stringX.length < 20) {
            return stringX;
        }
        else {
            return stringX.substring(0, 20) + "...";
        }
    }


    $scope.textSizeLimiterN = function(stringX, upto=20) {
        if (stringX == null || stringX == undefined || typeof stringX != 'string') {
            return null;
        }
        else if (stringX.length < upto) {
            return stringX;
        }
        else {
            return stringX.substring(0, upto) + "...";
        }
    }

    $scope.split = function(stringX, splitString) {
        if (stringX == null || stringX == undefined || typeof stringX != 'string') {
            return null;
        }
        else {
            return stringX.split(splitString);
        }
    }

    $scope.stringLength = function(stringX) {
        if (stringX == null || stringX == undefined || typeof stringX != 'string') {
            return 0;
        }
        
        return stringX.toString().length;
    }

    $scope.deleteObjectEntry = function(atKey, ofObj) {
        if (ofObj != null && ofObj != undefined) {
            if (ofObj.hasOwnProperty(atKey)) {
                delete ofObj[atKey];
            }
        }
    }

    $scope.upperCase = function(stringX) {
        return stringX.toString().toUpperCase();
    }


    $scope.getObjectKeys = function(obj) {
        if (obj != null && obj != undefined) {
            return Object.keys(obj);
        }
        
    }

    $scope.getNonFirebaseObjectKeys = function(obj) {
        if (obj != null && obj != undefined) {
            return Object.keys(obj).filter(function(key) {
                return key[0] != '$' && key != 'forEach'
            });
        }
        
    }

    $scope.length = function(obj) {
        if (obj !== null && obj !== undefined) {
            if (typeof obj == 'object') {
                return Object.keys(obj).length;
            }
            else {
                return obj.length;
            }
        }
    }

    $scope.parseInt = function(somevalue) {
        return parseInt(somevalue)
    }

    $scope.uniqueCodeGen = function() {
        sevenZBit = 78364164096;
        randomString = sevenZBit + parseInt(Math.random() * sevenZBit * 35)
        dateStringGen = new Date().getTime().toString(36)
        return (dateStringGen + "-" + randomString.toString(36))
    }

    $scope.filterURL = function(url) {
        // return url.split('/#!')[1]
        return url
    }

    $scope.decodeDate = function(dateString) {
        secondsValues = parseInt(dateString, 36);
        date = new Date(secondsValues);
        return date;
    }

    $scope.serverTime = 0;

    $scope.getServerTime = function() {
        $scope.serverTime = Date.parse($.ajax({async: false}).getResponseHeader('Date'));
    }

    $interval($scope.getServerTime, 1000)

    $scope.getLocalTime = function() {
        $scope.localTime = new Date().getTime();
    }

    $scope.runningCurrentTimeInterval = false;
    $scope.recordCurrentTimeEverySecond = function() {
        if ($scope.runningCurrentTimeInterval == false) {
            $interval($scope.findCurrentTime, 999)
            $scope.runningCurrentTimeInterval = true;
        }
        
        
    }
    

    $scope.linearValue = function(value, valuesAreBetween=[0, 1], needValuesBetween=[0, 100]) {
        if (Math.abs(valuesAreBetween[1] - valuesAreBetween[0]) > 0) {
            return ((value - valuesAreBetween[0])*(needValuesBetween[1] - needValuesBetween[0])/(valuesAreBetween[1] - valuesAreBetween[0])) + needValuesBetween[0]
        }
        else {
            return (needValuesBetween[1] + needValuesBetween[0])/2
        }

    }


    $scope.timeFindingCount = 0;
    $scope.findCurrentTime = function() {
        // console.clear()
        $scope.getLocalTime();
        if ($scope.timeFindingCount % 120 == 0) {
            $scope.getServerTime();
            $scope.localServerTimeDifference = $scope.localTime - $scope.serverTime;
        }
        $scope.timeFindingCount = $scope.timeFindingCount + 1
        $scope.currentTime = $scope.localTime - $scope.localServerTimeDifference
    }

    $interval($scope.findCurrentTime, 200)

    $scope.msToString = function(ms) {
        seconds = ms/1000
        minutes = seconds/60
        hours = minutes/60
        days = hours/24

        dayString = ''
        if (days > 0) {
           daysValue = parseInt(days)
           dayString = (daysValue == 1 ? '1 day': (daysValue == 0 ? '': daysValue + ' days'))
        }
        hourString = ''
        if (hours > 0) {
            hoursValue = parseInt(hours) - (24*parseInt(days))
            hourString = (hoursValue == 1 ? '1 hour': (hoursValue == 0 ? '': hoursValue + ' hours'))
        }
        minuteString = ''
        if (minutes > 0) {
            minutesValue = parseInt(minutes) - (60*parseInt(hours))
            minuteString = (minutesValue == 1 ? '1 minute': (minutesValue == 0 ? '': minutesValue + ' minutes'))
        }
        secondString = ''
        if (seconds > 0) {
            secondsValue = parseInt(seconds) - (60*parseInt(minutes))
            secondString = (secondsValue == 1 ? '1 second': (secondsValue == 0 ? '': secondsValue + ' seconds'))
        }

        finalString = (dayString == '' ? '': dayString +  ", ")
        finalString = finalString + (hourString == '' ? '': hourString +  ", ")
        finalString = finalString + (minuteString == '' ? '': minuteString +  ", ")
        finalString = finalString + (secondString == '' ? '': secondString +  ", ")

        finalString = finalString.substring(0, finalString.length - 2)
        if (ms == 0) {
            finalString = '0 sec'
        }
        return finalString;
    }

    $scope.msToStringRelevant = function(ms) {
        seconds = ms/1000
        minutes = seconds/60
        hours = minutes/60
        days = hours/24

        dayString = ''
        if (days > 0) {
           daysValue = parseInt(days)
           dayString = (daysValue == 1 ? '1 day': (daysValue == 0 ? '': daysValue + ' days'))
        }
        hourString = ''
        minuteString = ''
        secondString = ''

        if (days < 1) {
            if (hours > 0) {
                hoursValue = parseInt(hours) - (24*parseInt(days))
                hourString = (hoursValue == 1 ? '1 hour': (hoursValue == 0 ? '': hoursValue + ' hours'))
            }
            if (hours < 1) {
                if (minutes > 0) {
                    minutesValue = parseInt(minutes) - (60*parseInt(hours))
                    minuteString = (minutesValue == 1 ? '1 minute': (minutesValue == 0 ? '': minutesValue + ' minutes'))
                }
                if (minutes < 1) {
                    if (seconds > 0) {
                        secondsValue = parseInt(seconds) - (60*parseInt(minutes))
                        secondString = (secondsValue == 1 ? '1 second': (secondsValue == 0 ? '': secondsValue + ' seconds'))
                    }
                }
            }

        }


        finalString = (dayString == '' ? '': dayString +  ", ")
        finalString = finalString + (hourString == '' ? '': hourString +  ", ")
        finalString = finalString + (minuteString == '' ? '': minuteString +  ", ")
        finalString = finalString + (secondString == '' ? '': secondString +  ", ")

        finalString = finalString.substring(0, finalString.length - 2)
        if (ms == 0) {
            finalString = '0 sec'
        }
        return finalString;
    }

    $scope.secondsToDate = function(date) {
        return new Date(date)
    }

    $scope.twentyFourToTwelveString = function(date) {
        if (date != 'Invalid Date') {
            if (date.getHours() < 12) {
                meridian = 'am'
            }
            else {
                meridian = 'pm'
            }
            if (date.getMinutes() >= 10) {
                min = date.getMinutes()
            }
            else {
                min = '0' + date.getMinutes()
            }
            if (date.getHours() >= 1 && date.getHours() < 13) {
                hr = date.getHours()
            }
            else if (date.getHours() == 0) {
                hr =12
            }
            else if (date.getHours() >= 13) {
                hr = date.getHours() - 12
            }
            return hr + "." +  min + " " + meridian
        }
       
    }

    $scope.secondsToDateString = function(date) {
        d = new Date(date)
        var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
        
        return days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " at " + $scope.twentyFourToTwelveString(d) 
        // return $filter('date')(Date.parse(d), 'EEE, MMM dd, yyyy') + ' at ' + $filter('date')(Date.parse(d), 'h.mm a')
    }

    $scope.secondsToDateStringLocal = function(date) {
        d = new Date(date)
        return d.toLocaleString()
    }


    $scope.secondsFromToDateString = function(theStartDate, theEndDate) {
        theEndDate = new Date(theEndDate)
        theStartDate = new Date(theStartDate)
        if (theStartDate != null && theEndDate != null) {
            
            var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

            if (theStartDate.getDate() + "-" + theStartDate.getMonth() + "-" + theStartDate.getFullYear() == theEndDate.getDate() + "-" + theEndDate.getMonth() + "-" + theEndDate.getFullYear()) {
                return "On " + days[theStartDate.getDay()] + ", " + months[theStartDate.getMonth()] + " " + theStartDate.getDate() + ", " + theStartDate.getFullYear() + " from " + $scope.twentyFourToTwelveString(theStartDate) + " to " + $scope.twentyFourToTwelveString(theEndDate)
                // return 'on ' + $filter('date')(Date.parse(theStartDate), 'EEE, MMM dd, yyyy') + ' from ' + $filter('date')(Date.parse(theStartDate), 'h.mm a') + ' to ' + $filter('date')(Date.parse(theEndDate), 'h.mm a.')
            } else {
                return "From " + $scope.twentyFourToTwelveString(theStartDate) + ", " + days[theStartDate.getDay()] + ", " + months[theStartDate.getMonth()] + " " + theStartDate.getDate() + ", " + theStartDate.getFullYear() + " to " + $scope.twentyFourToTwelveString(theEndDate) + ", " + days[theEndDate.getDay()] + ", " + months[theEndDate.getMonth()] + " " + theEndDate.getDate() + ", " + theEndDate.getFullYear()
                // return 'from ' + $filter('date')(Date.parse(theStartDate), 'h.mm a, EEE, MMM dd, yyyy') + ' to ' + $filter('date')(Date.parse(theEndDate), 'h.mm a, EEE, MMM dd, yyyy')
            }
        }

    }

    $scope.convertHHMMSStoString = function(hhmmss) {
        // console.log(hhmmss)
        sec = (parseInt(hhmmss.split(':')[0])*60 + parseInt(hhmmss.split(':')[1]))*60 + parseInt(hhmmss.split(':')[2])
        return $scope.msToString(sec*1000);
    }

    $scope.convertHHMMSStoSeconds = function(hhmmss) {
        // console.log(hhmmss)
        sec = (parseInt(hhmmss.split(':')[0])*60 + parseInt(hhmmss.split(':')[1]))*60 + parseInt(hhmmss.split(':')[2])
        return sec;
    }

    $scope.convertSecondstoHHMMSS = function(seconds) {
        // console.log(hhmmss)
        ss = seconds % 60;
        minutes = (seconds - ss)/60;
        mm = minutes % 60;
        hh = (minutes - mm)/60;
        return hh + ":" + mm + ":" + ss;
    }

    $scope.runFunctionByName = function(functionName, args) {
        var parts = functionName.split('.');
        var context = $scope;
    
        for (var i = 0; i < parts.length - 1; i++) {
            context = context[parts[i]];
        }
    
        return context[parts[parts.length - 1]].apply(context, args);
    };

    // https://stackoverflow.com/a/44932690

    $scope.insertAndShiftInArray = function(arr, from, to) {
        let cutOut = arr.splice(from, 1)[0];
        arr.splice(to, 0, cutOut);
    }

    $scope.visit = function (url) {
        window.open(url,'_self')
    }

    $scope.visitWithTarget = function (url, target) {
        window.open(url,target)
    }

    $scope.deleteEntry = function(object, key) {
        delete object[key]
    }

    $scope.visitInternally = function(url) {
        $location.path(url);
    }

    $scope.encodeFirebaseKey = function(key) {
        return key.toString().replace(/\./g, '_reviews_dot__')
                  .replace(/\$/g, '_review_dollarSign__')
                  .replace(/\[/g, '_review_openBracket__')
                  .replace(/\]/g, '_review_closeBracket__')
                  .replace(/#/g, '_reviews_hashTag__');
    }
    
    $scope.decodeFirebaseKey = function(encodedKey) {
        return encodedKey.toString().replace(/_reviews_dot__/g, '.')
                         .replace(/_reviews_dollarSign__/g, '$')
                         .replace(/_reviews_openBracket__/g, '[')
                         .replace(/_reviews_closeBracket__/g, ']')
                         .replace(/_reviews_hashTag__/g, '#');
    }

    $scope.ui = {}

    $scope.ui.dimensions = {}
    $scope.ui.dimensions.widthType = (window.innerWidth < 768) ? 'mobile' : 'desktop'

    $scope.ui.dimensions.check = function() {
        $scope.ui.dimensions = {}
        $scope.ui.dimensions.widthType = (window.innerWidth < 768) ? 'mobile' : 'desktop'

        
    }

    $interval($scope.ui.dimensions.check, 200)


    
    $scope.appName = "Waveform Recommendations Game UI";

    

    $scope.addEntry = function(object, key, value) {
        object[key] = value
    }

    $scope.participantEntry = '';

    $scope.addParticipant = function($event) {
        if ($event.keyCode == 13) {

            $scope.addEntry($scope.appData.participants, $scope.appData.editor.addingID, {'name': $scope.appData.editor.addingParticipantName, 'color': 'green'}); 
            $scope.appData.editor.addingID += 1;

            $scope.appData.editor.addingParticipantName = '';


            $scope.saveAppData();
        }
    }

    $scope.setNextParticipant = function() {
        if ($scope.appData.rounds[$scope.appData.editor.editingRound].started == false) {
            keys = Object.keys($scope.appData.participants)
            currentIndex = keys.indexOf($scope.appData.rounds[$scope.appData.editor.editingRound].parameters['current_participant_key'])
            nextIndex = (currentIndex + 1) % keys.length
            $scope.appData.rounds[$scope.appData.editor.editingRound].parameters['current_participant_key'] = keys[nextIndex]
            $scope.saveAppData();
            
            
        }
    }

    $scope.addOption = function($event) {
        if ($event.keyCode == 13) {
            $scope.addEntry($scope.appData.rounds[$scope.appData.editor.editingRound].options, $scope.appData.editor.addingID, {'name': $scope.appData.editor.addingOptionName, 'color': 'green'});
            $scope.appData.editor.addingID += 1;

            $scope.appData.editor.addingOptionName = '';

            $scope.saveAppData();
        }
    }


    $scope.chooseOptionStartSpinning = function() {
        if ($scope.appData.rounds[$scope.appData.editor.editingRound].started) {
            $scope.chooseRandomOptionForRound();
        }
    }


    $scope.chooseRandomOptionForRound = function() {
        keysPossible = Object.keys($scope.appData.rounds[$scope.appData.editor.editingRound].options)

        if ($scope.appData.rounds[$scope.appData.editor.editingRound].parameters['nature_of_randomness']['choose_atleast_once'] == true) {
            keysPossible = keysPossible.filter(function(key) {
                return $scope.appData.rounds[$scope.appData.editor.editingRound].parameters['last_1000_random_choices'][key] == undefined
            })
        }

        if (keysPossible.length == 0) {
            $scope.appData.rounds[$scope.appData.editor.editingRound].parameters['last_1000_random_choices'] = {}
            keysPossible = Object.keys($scope.appData.rounds[$scope.appData.editor.editingRound].options)
        }

        randomKey = keysPossible[Math.floor(Math.random()*keysPossible.length)]

        $scope.appData.rounds[$scope.appData.editor.editingRound].parameters['last_1000_random_choices'][randomKey] = Date.now()

        $scope.appData.rounds[$scope.appData.editor.editingRound].parameters['random_option'] = randomKey
        $scope.saveAppData();

    }

    $scope.urlParameters = {}

    $scope.defaultAppData =  {
        'midiKey': 81,
        'midiKeyDownCode': 158,
        'participants': {
            '0': {
                'name': "Marques",
                'color': 'hsla(0, 0%, 100%, 1)',
            },
            '1': {
                'name': "Andrew",
                'color': 'hsla(0, 0%, 100%, 1)',
            },
            '2': {
                'name': "David",
                'color': 'hsla(0, 0%, 100%, 1)',
            }
            
        },
        'editor':{
            'addingID': 10,
            'addingParticipantName': '',
            'addingOptionName': '',
            'editingRound': 'easy-medium-hard',
            'editingOptions': {
                'randomOptionBox': {
                    'visible': true
                },
                'randomOptionText': {
                    'visible': true
                },
                'seconds': {
                    'visible': true
                },
                'secondsUnit': {
                    'visible': true
                },
                'participantName': {
                    'visible': true
                },
                'participantText': {
                    'visible': true
                },
                'waveformLogo': {
                    'visible': true
                },
            },
            'editingOptions-something-that': {
                'randomOptionBox': {
                    'visible': true
                },
                'randomOptionText': {
                    'visible': true
                },
                'seconds': {
                    'visible': true
                },
                'secondsUnit': {
                    'visible': true
                },
                'participantName': {
                    'visible': true
                },
                'participantText': {
                    'visible': true
                },
                'waveformLogo': {
                    'visible': true
                },
            }
        },
        'rounds': {
            'easy-medium-hard': {
                "name": "Easy, Medium and Hard ",
                "maximumTime": 45,
                "wheelSpinningTime": 5,
                'started': false,
                'startedAt': Date.now(),
                'selected': true,
                'url': 'easy-medium-hard',
                'options': {
                    '0': {
                        'name': "Easy",
                        'color': 'green',
                    },
                    '1': {
                        'name': "Medium",
                        'color': 'yellow',
                    },
                    '2': {
                        'name': "Hard",
                        'color': 'red',
                    },
                },
                'startedAt': Date.now(),
                'parameters': {
                    'current_participant_key': '0',
                    'random_option': "0",
                    'nature_of_randomness': {
                        'choose_atleast_once': true,
                        'startTimerWhenWheelIsSpinning': true,
                    },
                    'last_1000_random_choices': {}
                },
            },
            'something-that': {
                "name": "Something That",
                "maximumTime": 45,
                "wheelSpinningTime": 5,
                'started': false,
                'startedAt': Date.now(),
                'selected': false,
                'url': 'something-that',
                'options': {
                    '0': {
                        'name': "WAY more expensive than it should be",
                        'color': 'green',
                    },
                    '1': {
                        'name': "has wheels",
                        'color': 'yellow',
                    },
                    '2': {
                        'name': "you cannot get anymore",
                        'color': 'red',
                    },
                },
                'startedAt': Date.now(),
                'parameters': {
                    'current_participant_key': '0',
                    'random_option': "0",
                    'nature_of_randomness': {
                        'choose_atleast_once': true,
                        'startTimerWhenWheelIsSpinning': true,
                    },
                    'last_1000_random_choices': {}
                },
            },

        }
    }

    $scope.midiSetup = function() {
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess()
                .then(onMIDISuccess, onMIDIFailure);
        } else {
            console.error("Web MIDI API is not supported in this browser.");
        }

        function onMIDISuccess(midiAccess) {
            console.log("MIDI Access Object", midiAccess);
            $scope.midiInputs = midiAccess.inputs;
            midiAccess.inputs.forEach(input => {
                input.addEventListener('midimessage', handleMIDIMessage);
            });
        }

        function onMIDIFailure() {
            console.error("Failed to access MIDI devices.");
        }

        function handleMIDIMessage(event) {
            const data = event.data;
            const command = data[0];
            const note = data[1];
            const velocity = data[2];

            const message = `Command: ${command}, Note: ${note}, Velocity: ${velocity}`;

            console.log(message);

            $scope.midiNote = note;
            $scope.midiNoteCommand = command;

            if ($scope.urlParameters[1] != 'ui') {
                if (note == $scope.appData.midiKey && command == $scope.appData.midiKeyDownCode) {
                    $scope.appData.rounds[$scope.appData.editor.editingRound].started = !$scope.appData.rounds[$scope.appData.editor.editingRound].started; 
                    
                    $scope.findCurrentTime(); 
                    
                    $scope.appData.rounds[$scope.appData.editor.editingRound].startedTime = $scope.currentTime; 
                    $scope.setNextParticipant();
                    $scope.chooseOptionStartSpinning();
                    $scope.saveAppData(); 

                    
                }
            }
            
        }
    }

    $scope.view = function() {
        $scope.urlParameters[1] = $routeParams.param1
        $scope.urlParameters[2] = $routeParams.param2
        $scope.urlParameters[3] = $routeParams.param3

        // base url
        $scope.baseURL = $location.absUrl().split('#')[0]

        
        // themeColor = $scope.themeColors[Math.floor(Math.random()*$scope.themeColors.length)]
        // changeThemeColor(themeColor)

        
        $scope.loadAppData();

        

        if ($scope.appData == null) {
            $scope.appData = $scope.defaultAppData
            localStorage.setItem('waveformUIData', JSON.stringify($scope.appData))
        }

        $scope.loadApp();

        if ($routeParams.param1 === undefined && $routeParams.param2 === undefined) {
            $scope.views.loadDashboard()
            $scope.appData.editor.addingParticipantName = '';

            $scope.midiSetup();
        }

        if ($routeParams.param1 === 'ui' && $routeParams.param2 !== undefined) {
            $interval($scope.checkToRenderAppData, 100)
            $scope.views.loadUI()

            // Sound Effect by 666HeroHero from Pixabay
            // load assets\audio\click-21156.mp3
            $scope.audio = new Audio('assets/audio/click-21156.mp3');

            $scope.clickSounds = 0;
            $scope.spinningOptionKey = "";
            // $scope.audio.play();
        }
        


    }

    $scope.saveAppData = function() {
        // delete old
        localStorage.removeItem('waveformUIData');
        localStorage.setItem('waveformUIData', JSON.stringify($scope.appData))
    }

    $scope.resetAppData = function() {
        // delete old
        // localStorage.removeItem('waveformUIData');
        $scope.appData = {}
        $scope.appData = $scope.defaultAppData
        localStorage.setItem('waveformUIData', JSON.stringify($scope.defaultAppData))
        
    }

    $scope.loadAppData = function() {
        $scope.appData = JSON.parse(localStorage.getItem('waveformUIData'))
    }

    // Sound Effect by 666HeroHero from Pixabay
    // assets\audio\click-21156.mp3

    $scope.checkToRenderAppData = function() {
        if ($scope.urlParameters[1] == 'ui' && $scope.urlParameters[2] !== undefined) {
            if ($scope.appData.rounds[$scope.urlParameters[2]].started) {
                greaterThan = $scope.appData.rounds[$scope.urlParameters[2]].maximumTime - $scope.appData.rounds[$scope.urlParameters[2]].wheelSpinningTime

                currentCountdown = $scope.appData.rounds[$scope.urlParameters[2]].maximumTime - (($scope.currentTime - $scope.appData.rounds[$scope.urlParameters[2]].startedTime)/1000)

                if (currentCountdown > greaterThan) {
                    randomAnimationTimeParametric = $scope.linearValue(currentCountdown, [greaterThan, $scope.appData.rounds[$scope.urlParameters[2]].maximumTime], [0, 1])

                    randomAnimationTimeParametric = 1 - randomAnimationTimeParametric*randomAnimationTimeParametric*randomAnimationTimeParametric


                    if (randomAnimationTimeParametric - $scope.clickSounds/20 > 0) {
                        $scope.audio.play();
                        $scope.clickSounds += 1;

                        randOptions = Object.keys($scope.appData.rounds[$scope.urlParameters[2]].options)
                        $scope.spinningOptionKey = randOptions[($scope.clickSounds % randOptions.length)]
                    }

                    if ($scope.clickSounds == 20 && $scope.spinningOptionKey != "") {
                        $scope.spinningOptionKey = ""
                    }
                    // console.log($scope.clickSounds, randomAnimationTimeParametric)
                }
            }
            else {
                $scope.clickSounds = 0;
            }
            $scope.loadAppData();
            // console.log($scope.appData.editor.editingOptions.randomOptionText.visible)


        }
    }



    $scope.loadApp = function() {

        // $scope.text = {
        //     heading: $scope.appName,
        //     subheading: "EUBIC-MS Winter School 2024",
        // }

        // if ($scope.ui.dimensions.widthType == 'mobile') {
        //     $scope.text = {
        //         heading: "Protrein",
        //         subheading: "EUBIC-MS Winter School 2024",
        //     }
        // }


    }



    $scope.ui = {
        roundUnselectAll: function() {
            for (var key in $scope.appData.rounds) {
                $scope.appData.rounds[key].selected = false
            }
        }
    }


    $scope.views = {
        loadDashboard: function() {
        },
        loadUI: function() {
            

        },
    }




    $scope.themeColors = [270, 198, 40, 320]
    $scope.hueList = [0, 40, 60, 120, 198, 210, 270, 300, 330]
    



}]);