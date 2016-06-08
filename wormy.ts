
document.addEventListener("keydown", keyDownHandler, false);

var canvas = (<HTMLCanvasElement>document.getElementById("myCanvas"));
var ctx = canvas.getContext("2d");


var gridPixSize = 10;
var gridWidth = canvas.width/10;
var gridHeight = canvas.height/10;
var grid = [];

var dx = 0;
var dy = -1;

var x = gridWidth/2;
var y = gridHeight/2;

var worm = [];

var fruitCounter = 1;


function init() {
    var x,y;
    for (x=0; x < gridWidth; x++) {
        grid[x] = [];
        for (y=0; y < gridHeight; y++) {
            grid[x][y] = 0;
        }
    }
}


function randomPoint() {
    return {'x':Math.floor(Math.random() * (gridWidth + 1)),
        'y':Math.floor(Math.random() * (gridHeight + 1))};
}


function keyDownHandler(e) {
    if(e.keyCode == 37) { // Left
        dx=-1;
        dy=0;
    }
    else if(e.keyCode == 38) { // Up
        dx=0;
        dy=-1
    }
    else if(e.keyCode == 39) { // Right
        dx=1;
        dy=0;
    }
    else if(e.keyCode == 40) { // Down
        dx=0;
        dy=1;
    }
}


function drawFruit(x, y) {
    ctx.beginPath();
    ctx.arc(x*gridPixSize+5, y*gridPixSize+5, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    grid[x][y] = 2
    console.log('mark:' + x + ":" + y + " => " + grid[x][y])
}

function clearFruit(x, y) {
    ctx.clearRect(x*gridPixSize, y*gridPixSize, gridPixSize, gridPixSize);
    grid[x][y] = 0
    console.log('clear:' + x + ":" + y + " => " + grid[x][y])
}


function drawHead(x, y) {
    ctx.beginPath();
    ctx.rect(x*gridPixSize, y*gridPixSize, 10, 10);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    worm.unshift({'x':x, 'y':y});
    grid[x][y] = 1
    console.log('mark:' + x + ":" + y + " => " + grid[x][y])
}

function clearTail() {
    var tail = worm.pop();
    ctx.clearRect(tail.x*gridPixSize, tail.y*gridPixSize, gridPixSize, gridPixSize);
    grid[tail.x][tail.y] = 0
    console.log('clear:' + tail.x + ":" + tail.y + " => " + grid[tail.x][tail.y])
}

function addTail() {
    worm.push({'x':-1, 'y':-1})
    worm.push({'x':-1, 'y':-1})
    worm.push({'x':-1, 'y':-1})
    worm.push({'x':-1, 'y':-1})
    worm.push({'x':-1, 'y':-1})
}


function updateWorm() {
    x += dx;
    y += dy;

    if (x > gridWidth || x  < 0) {
        //alert("GAME OVER");
        //document.location.reload();
        clearInterval(timer);
        return;
    }
    if (y > gridHeight || y  < 0) {
        //alert("GAME OVER");
        //document.location.reload();
        clearInterval(timer);
        return;
    }

    console.log('check:' + x + ":" + y + " => " + grid[x][y])
    if (grid[x][y] == 1) {
        clearInterval(timer);
        return;
    }

    if (grid[x][y] == 2) {
        addTail();
        fruitCounter = 0;
    }


    drawHead(x,y)
    clearTail();

    if (fruitCounter != -1) {
        fruitCounter++;
    }

    if ((fruitCounter % 25) == 0) {
        var p = randomPoint();

        while (grid[p.x][p.y] == 1) {
            p = randomPoint();
        }
        drawFruit(p.x, p.y);
        fruitCounter = -1;
    }
}


// start
init();
drawHead(x,y+4);
drawHead(x,y+3);
drawHead(x,y+2);
drawHead(x,y+1);
drawHead(x,y);


var timer = setInterval(updateWorm, 150);
