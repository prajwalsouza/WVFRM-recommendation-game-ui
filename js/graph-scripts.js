
// Create a style tag
var style = document.createElement("style");
style.id = "root-styles"

themeColors = [270, 198, 40, 320]
analogousColors = [270 + 72, 198  + 72, 40 - 72, 320 + 72]

themeColor = themeColors[Math.floor(Math.random()*themeColors.length)]
if (themeColor == 40) {
    analogousColor = (themeColor - 72)
}
else {
    analogousColor = (themeColor + 72)
}
style.innerHTML = ":root {--themeColorHue: "+  themeColor + "; --themeSecondaryColorHue: "+ (themeColor - 72) + "; --themeAnalogousColorHue: " + analogousColor + "; }"
document.head.appendChild(style);

function changeThemeColor(hueValue) {
    if (hueValue == 40) {
        analogousColor = (hueValue - 72)
    }
    else {
        analogousColor = (hueValue + 72)
    }

    document.getElementById("root-styles").innerHTML = ":root {--themeColorHue: "+  hueValue + "; --themeSecondaryColorHue: "+ (hueValue - 72) + "; --themeAnalogousColorHue: " + analogousColor + "; }"
}


ignusTheme.baseHue = themeColor;
ignusTheme.baseLightness = 50;
ignusTheme.setUp();


protreinWApp = {}

protreinWApp.darkmode = false
// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
//     protreinWApp.darkmode = false
// }

 


// protreinWApp.defaultGraphOptions = {
//     xmax: 1.1,
//     xmin: -0.1,

//     ymax: 1.1,
//     ymin: -0.1,

//     axislocationX: 0,
//     axislocationY: 0,

//     xaxislabelvisibility: 'no',
//     yaxislabelvisibility: 'no',

//     xaxisvisibility: 'no',
//     yaxisvisibility: 'no',

//     xmajorgridlabelvisibility: 'no',
//     ymajorgridlabelvisibility: 'no',

//     xmajorgridlinesvisibility: 'no',
//     ymajorgridlinesvisibility: 'no',

//     fontSize: 1.6,

//     unitAspectRatio: 'yes',
//     fixAxisStretchCentrally: 'yes',

//     scrollZoom: "no"
// }


// protreinWApp.defaultChartOptions = {
//     xmax: 100,
//     xmin: 0,

//     ymax: 100,
//     ymin: 0,

//     axislocationX: 0,
//     axislocationY: 0,

//     xaxislabelvisibility: 'no',
//     yaxislabelvisibility: 'no',

//     yaxislabelshift: 0,

//     xaxisvisibility: 'yes',
//     yaxisvisibility: 'no',

//     gridlinenumberY: 4,
//     gridlinenumberX: 7,

//     xmajorgridlabelvisibility: 'yes',
//     ymajorgridlabelvisibility: 'yes',

//     xmajorgridlabelshift: 10,
//     ymajorgridlabelshift: -7,

//     xmajorgridlinesvisibility: 'no',
//     ymajorgridlinesvisibility: 'yes',
//     ymajorgridlinesextension: "no",

//     fontSize: 2,


//     unitAspectRatio: 'yes',
//     fixAxisStretchCentrally: 'yes',

//     scrollZoom: "no"
// }



// protreinWApp.dots = {}
// protreinWApp.dots.dotsAdded = []
// protreinWApp.addDotsGraph = function() {
//     graphH = document.getElementById('dots-background-graph-holder')
//     viewX.addGraph(graphH, "dots-background-graph", protreinWApp.defaultGraphOptions)
    

//     dotSpacing = window.innerWidth > 400 ? 1/20 : 1/25
//     yStart = window.innerWidth > 400 ? -0.5 : -0.3
//     xStart = window.innerWidth > 400 ? -0.8 : -0.3

//     protreinWApp.dots.xDots = window.innerWidth > 400 ? 80 : 15
//     protreinWApp.dots.yDots = window.innerWidth > 400 ? 40 : 40
//     for (i = 0; i < protreinWApp.dots.xDots; i++) {
//         for (j = 0; j < protreinWApp.dots.yDots; j++) {

//             if (Math.random() < viewX.mod(viewX.subtractVec([i, j], [25, 23]))/70) {
//                 if (viewX.mod(viewX.subtractVec([i, j], [25, 23])) > 9) {
//                     dotOptions = {x: xStart + i*dotSpacing, y: yStart + j*dotSpacing, pointcolor: (protreinWApp.darkmode ? "hsla(0, 0%, 20%, 1)" : "hsla(0, 0%, 60%, 1)"), pointsize: 0.4}
//                     viewX.addPoint("dots-background-graph", "background-dot-" + i + "-" + j, dotOptions)
    
//                     protreinWApp.dots.dotsAdded.push({
//                         i: i,
//                         j: j
//                     })
//                 }
                
//             }
            
//         }
//     }

// }

// // protreinWApp.addDotsGraph()

// protreinWApp.dotAnimationParameter = 0
// protreinWApp.updateDotsGraph = function() {
//     protreinWApp.dotAnimationParameter =  protreinWApp.dotAnimationParameter + 0.1

    
//     for (k = 0; k < protreinWApp.dots.dotsAdded.length; k++) {
//         dotAdded = protreinWApp.dots.dotsAdded[k]

//         i = parseInt(dotAdded.i)
//         j = parseInt(dotAdded.j)

//         dotColor = viewX.linearValue(-1, 1, 0, 100, Math.sin(protreinWApp.dotAnimationParameter*3 - (0.2*i*(i - 2)+0.3*j)))
//         darkness = viewX.linearValue(-1, 1, 20, 70, Math.sin(protreinWApp.dotAnimationParameter*3 - (0.2*i*(i - 2)+0.3*j)))
//         pointSize = viewX.linearValue(-1, 1, 0.4, 0.5, Math.sin(protreinWApp.dotAnimationParameter*3 - (0.2*i*(i - 2)+0.3*j)))
//         dotOptions = {pointcolor: (protreinWApp.darkmode ? "hsla(var(--themeColorHue), " + dotColor  + "%, " + darkness + "%, 1)" : "hsla(var(--themeColorHue), " + dotColor  + "%, 60%, 1)"), pointsize: pointSize}
//         viewX.updatePoint("dots-background-graph", "background-dot-" + i + "-" + j, dotOptions)
//     }

// }

// // setInterval(protreinWApp.updateDotsGraph, 50)





// protreinWApp.addShapesGraph = function() {

//     protreinWApp.shapes = {}
//     graphH = document.getElementById('dots-background-graph-holder')
//     viewX.addGraph(graphH, "dots-background-graph", protreinWApp.defaultGraphOptions)

//     protreinWApp.shapes.number = window.innerWidth > 400 ? 40 : 12
//     for (i = 0; i < protreinWApp.shapes.number; i++) {
        
//         randomCircleColorArray = ["hsla(var(--themeColorHue), 100%, 70%, 0.1)", "hsla(var(--themeSecondaryColorHue), 100%, 70%, 0.07)","hsla(var(--themeColorHue), 100%, 70%, 0.04)", "hsla(var(--themeColorHue), 100%, 70%, 0.01)"]

//         xDistance = -2 + 4*Math.random()
//         yDistance = Math.random()
//         randomCircleColor = randomCircleColorArray[Math.floor(Math.random()*randomCircleColorArray.length)]
//         circleOptions = {x: xDistance, y: yDistance, circlecolor: randomCircleColor, radius: 0.01 + (Math.random()*0.04*Math.abs(1*yDistance - 1*xDistance)), stroke: 'transparent'}
//         viewX.addCircle("dots-background-graph", "background-circle-" + i,  circleOptions)
        
//     }
// }

// protreinWApp.addShapesGraph()

function getUserDetails() {
    // Retrieve user agent
    var userAgent = navigator.userAgent;

    // Retrieve screen resolution
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;

    // Retrieve browser dimensions
    var browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // Retrieve user's preferred language
    var preferredLanguage = navigator.language;

    var previousURL = document.referrer;

    var currentDate = new Date();
    var currentTime = currentDate.toString();

    // Return an object with all the user details
    return {
        userAgent: userAgent,
        screenWidth: screenWidth,
        screenHeight: screenHeight,
        browserWidth: browserWidth,
        browserHeight: browserHeight,
        preferredLanguage: preferredLanguage,
        previousURL: previousURL,
        time: currentTime
    };
}