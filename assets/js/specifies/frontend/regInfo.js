var Today=new Date();
// Today.getMonth()+1; //月份
Today.getDate();  //日期
Today.getHours();  //小時
Today.getMinutes(); //分鐘
Today.getSeconds(); //秒數
// console.log(Today.getMonth()+1 +"_"+Today.getHours());

function getTimeRemaining(line_time) {
  var t = Date.parse(line_time) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, line_time) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  daysSpan.innerHTML = 0;
  hoursSpan.innerHTML = 0;
  minutesSpan.innerHTML = 0;
  secondsSpan.innerHTML = 0;

  function updateClock() {
    var t = getTimeRemaining(line_time);

    if (t.total <= 0) {
      clearInterval(timeinterval);
      return;
    }
    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var startline = new Date(2018, 06-1, 01,  0,  0,  0);
var deadline = new Date( 2018, 07-1, 07, 23, 59, 59);
if( new Date() < startline){
  $('#clock-title').text('距離報名開始');
  initializeClock('clockdiv', startline);
} else if (new Date() < deadline ){
  $('#clock-title').text('距離報名截止');
  initializeClock('clockdiv', deadline);
}else{
  $('#clock-title').text('報名已經截止');
}

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
}

if (getUrlParam('hint') == "true"){
  swal(
    '目前尚未開放報名',
    '即將在 6 / 1 開放報名，盡請期待',
    'success'
  )
}
