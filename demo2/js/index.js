
//loading

function playMusic(){   //播放或暂停音乐
    var music = document.getElementById('music');
    if(music.paused){
        $('#musicBtn').attr('src', './imgs/4-1.png');
        music.play();
    }else{
        $('#musicBtn').attr('src', './imgs/4-2.png');
        music.pause();
    }
}

$('#musicBtn').on('click', playMusic);

//game rule

$('#gamerule').on('click', function(){
    $('.gamerule-part').fadeIn();
});

$('#understand').on('click', function(){
    $('.gamerule-part').fadeOut();
});

$('#startgame').on('click', gameStart);

function gameStart() {
    $('.first-part').fadeOut();
    $('.game-part').fadeIn();

    gameloading();
    gameInit();
}

function gameloading() {     //游戏开始时的计时
    var url = ['./imgs/num1.png', './imgs/num2.png'];
    var count = 1;
    var timer = setInterval(function(){
        $('.loading-second').attr('src', url[count]);
        count--;
    }, 1000);
    setTimeout(function() {
        if(count < 0) {
            console.log('cleaner');
            clearInterval(timer);
            $('.game-loading').fadeOut();
            gameTime(time);
        }
    }, 3000);
}

//游戏主要逻辑部分
const cvs = document.getElementById('canvas');
const cxt = cvs.getContext('2d');
const cvsWidth = cvs.width;
const cvsHeight = cvs.height;
const map = new Map();
let level = 1,
    sourceImage = [
        './imgs/big1.png',
        './imgs/big2.png',
        './imgs/big3.png',
        './imgs/big4.png',
        './imgs/big5.png',
        './imgs/big6.png'
    ],
    targetImage = new Image(),
    imgWidth, imgHeight, pointArr, tileWidth, tileHeight, select = new Point(-1, -1), time = 60;

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function gameInit() {    //初始化数组
    //get image
    let index = Math.floor(Math.random() * sourceImage.length);
    $('.source-image').attr('src', sourceImage[index]);
    targetImage.src = sourceImage[index];
    pointArr = getRandomArray(level);
    getMap(level);
    targetImage.onload = function() {
        drawImg(pointArr, level);
    }
    cvs.addEventListener('touchend', moveBlock, false);
}

function getMap(level) {    //得到一个坐标与值的对应表
    map.clear();
    const num = level + 1;
    var count = 0;
    for(let i = 0; i < num; i++) {
        for( let j = 0; j < num; j++) {
            const point = new Point(i, j);
            const str = '' + i + '' + j;
            map.set(count, point);
            map.set(str, count);
            count++;
        }
    }
}

function getRandomArray(level){    //得到一个随机数组
    const res = [];
    const num = level + 1;
    let i = 0;
    while(true) {
        if( i >= num*num){
            if(judge(res)){
                i = 0;
                continue;
            }
            break;
        }
        let number = Math.floor(Math.random() * num * num);
        if(res.indexOf(number) === -1) {
            res.push(number);
            i++;
        }
    }
    return res;
}

function drawImg(arr, level) {     //根据数组绘制图像
    const num = level + 1;
    imgWidth = targetImage.width / num;
    imgHeight = targetImage.height / num;
    tileWidth = cvsWidth / num;
    tileHeight = cvsHeight / num;
    let index = 0;
    for(let i = 0; i < num; i++) {
        for( let j = 0; j < num; j++) {
            const key = arr[index];
            const point = map.get(key);
            cxt.drawImage(targetImage, point.x * imgWidth, point.y * imgHeight, imgWidth, imgHeight, i * tileWidth, j * tileHeight, tileWidth, tileHeight);
            index++;
        }
    }
}

function moveBlock(event) {
    const ev = event || window.event;
    const touch = ev.changedTouches[0];
    const num = level + 1;
    const cvsSize = this.offsetWidth / num;
    const x = Math.floor((touch.pageX - this.offsetLeft) / cvsSize);
    const y = Math.floor((touch.pageY - this.offsetTop) / cvsSize);
    if(select.x === -1) {
        select.x = x;
        select.y = y;
        addRect(select);
    }else {
        const temp = '' + x + y;
        const index = map.get(temp);
        const other = '' + select.x + select.y;
        const selectIndex = map.get(other);
        const med = pointArr[index];
        pointArr[index] = pointArr[selectIndex];
        pointArr[selectIndex] = med;
        redraw(pointArr, level);
        select.x = -1;
        select.y = -1;
        if(judge(pointArr)) {
            if(level >= 3){
                cvs.removeEventListener('touchend', moveBlock, false);
                success();
            }
            level++;
            changeGuanqia(level);
            cvs.removeEventListener('touchend', moveBlock, false);
            gameInit();
        }
    }
}

function addRect(select) {
    cxt.strokeRect(select.x * imgWidth, select.y * imgHeight, tileWidth, tileHeight);
}

function redraw(arr, level) {
    cxt.clearRect(0, 0, cvsWidth, cvsHeight);
    drawImg(arr, level);
}

function judge(arr) {
    const num = level + 1;
    for( let i = 0; i < num * num - 1 ; i++) {
        if(arr[i] > arr[i+1]){
            return false;
        }
    }
    return true;
}

function changeGuanqia(level) {
    $('.guanqia').attr('src', `./imgs/lv${level}.png`);
}

function success() {
    $('.second-part').fadeOut();
    $('.game-success').fadeIn();
}

function gameTime(time) {
    var gameTimer = setInterval(function(){
        time--;
        if(time === 0) {
            clearInterval(gameTimer);
            gameover();
            level = 1;
            time = 60;
            changeGuanqia(level);
        }
        let str;
        if(time < 10){
            str = '00:0'+time;
        }else{
            str = '00:'+time;
        }
        $('.time').html(str);
    }, 1000)
}

function gameover() {
    $('.second-part').fadeOut();
    $('.game-over').fadeIn();
}

$('#restart').on('click', function(e){
    e.preventDefault();
    $('.game-over').fadeOut();
    $('.second-part').fadeIn();
    gameInit();
    gameTime(time);
});

$('#invite').on('click', function(){
    $('#share').fadeIn();
});

$('#share').on('click', function(e){
    $(this).fadeOut();
});

$('#open').on('click', function(e){
    const probability= Math.random();
    $('.game-success').fadeOut();
    if(probability >= 0.5) {
        
    }
})
