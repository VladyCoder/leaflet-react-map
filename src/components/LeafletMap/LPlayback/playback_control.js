// L.Playback = L.Playback || {};

import L from 'leaflet';
import './example_2.css';
L.Playback.Control = L.Control.extend({

  _html: 
'<div class="lp">' +
'  <div class="transport">' +
'    <div class="navbar">' +
'      <div class="navbar-inner">' +
'        <ul class="nav">' +
'          <li class="ctrl">' +
'            <a id="play-pause" href="#"><i id="play-pause-icon" class="fa fa-play fa-lg"></i></a>' +
'          </li>' +
'          <li class="ctrl dropup">' +
'            <a id="clock-btn" class="clock" data-toggle="dropdown" href="#">' +
'              <span id="cursor-date"></span><br/>' +
'              <span id="cursor-time"></span>' +
'            </a>' +
'            <div class="dropdown-menu" role="menu" aria-labelledby="clock-btn">' +
'              <label>Playback Cursor Time</label>' +
'              <div class="input-append bootstrap-timepicker">' +
'                <input id="timepicker" type="text" class="input-small span2">' +
'                <span class="add-on"><i class="fa fa-clock-o"></i></span>' +
'              </div>' +
'              <div id="calendar"></div>' +
'              <div class="input-append">' +
'                <input id="date-input" type="text" class="input-small">' +
'                <span class="add-on"><i class="fa fa-calendar"></i></span>' +
'              </div>' +
'            </div>' +
'          </li>' +
'        </ul>' +
'        <ul class="nav pull-right">' +
'          <li>' +
'             <input id="time-slider" type="range" min="0" max="5">' +
// '            <div id="time-slider"><a class="time-slider-handle" href="#"></a></div>' +
'          </li>' +
'          <li class="ctrl dropup">' +
'            <a id="speed-btn" data-toggle="dropdown" href="#"><i class="fa fa-dashboard fa-lg"></i> <span id="speed-icon-val" class="speed">1</span>x</a>' +
'            <div class="speed-menu dropdown-menu" role="menu" aria-labelledby="speed-btn">' +
'              <label>Player<br/>Speed</label>' +
'              <input id="speed-input" class="span1 speed" type="number" value="1" min="-9" max="9"/>' +
'               <input id="speed-slider" type="range" min="0" max="5">' +
// '              <div id="speed-slider"></div>' +
'            </div>' +
'          </li>' +
'        </ul>' +
'      </div>' +
'    </div>' +
'  </div>' +
'</div>',

  initialize: function(playback) {
    this.playback = playback;
    let self = this;
    playback.addCallback(function(ms){
      self._clockCallback(ms, self);
    });
    playback.addUpdateCallback(function(){
      self._update(self);
    });
    // playback.addCallback(this._clockCallback);
  },
 
  onAdd: function(map) {
    this._map = map;
    var html = this._html;
    
    if(!this.container){
      this.container = document.createElement('div');
      this.container.classList.add("leaflet-playback-control");
      this.container.innerHTML = html;
    }

    var mapContainer = document.querySelector('#'+map._container.id);
    mapContainer.append(this.container);
    this._setup();

    return L.DomUtil.create('div');
  },

  _setup: function() {
    var self = this;
    var playback = this.playback;
    this.el('#play-pause').addEventListener('click', function(e){
      e.preventDefault();
      
      if (playback.isPlaying() === false) {
        playback.start();
        self.el('#play-pause-icon').classList.remove('fa-play');
        self.el('#play-pause-icon').classList.add('fa-pause');
      } else {
        playback.stop();
        self.el('#play-pause-icon').classList.remove('fa-pause');
        self.el('#play-pause-icon').classList.add('fa-play');
      }
    })

    this.setDropDown(this.el('#speed-btn'));
    this.setDropDown(this.el('#clock-btn'));
    
    var startTime = playback.getStartTime();
    this.el('#cursor-date').innerHTML = L.Playback.Util.DateStr(startTime);
    this.el('#cursor-time').innerHTML = L.Playback.Util.TimeStr(startTime);
    
    this.timeSlider = this.el('#time-slider');
    L.DomEvent.disableClickPropagation(this.timeSlider);
    this.timeSlider.min = playback.getStartTime();
    this.timeSlider.max = playback.getEndTime();
    this.timeSlider.step = playback.getTickLen();
    this.timeSlider.value = playback.getTime();
    this.timeSlider.addEventListener('input', function(e){
      console.log(this.value);
      playback.setCursor(this.value);
      self.el('#cursor-date').innerHTML = L.Playback.Util.DateStr(Number(this.value));
      self.el('#cursor-time').innerHTML = L.Playback.Util.TimeStr(Number(this.value));
    });
    
    this.speedSlider = this.el('#speed-slider');
    L.DomEvent.disableClickPropagation(this.speedSlider);
    this.speedSlider.min = -9;
    this.speedSlider.max = 9;
    this.speedSlider.step = 1;
    this.speedSlider.value = self._speedToSliderVal(this.playback.getSpeed());
    this.speedSlider.addEventListener('input', function(e){
      var speed = Number(this.value);
      playback.setSpeed(speed);
      self.el('#speed-btn .speed').innerHTML = speed;
      self.el('.speed-menu #speed-input').value = speed;
    });

    var speedInput = this.el('#speed-input');
    L.DomEvent.disableClickPropagation(speedInput);
    speedInput.addEventListener('input', function(e){
      var speed = this.value;
      playback.setSpeed(Number(speed));
      self.el('#speed-btn .speed').innerHTML = speed;
      self.speedSlider.value = speed;
    })

    // $('#calendar').datepicker({
    //   changeMonth: true,
    //   changeYear: true,
    //   altField: '#date-input',
    //   altFormat: 'mm/dd/yy',
    //   defaultDate: new Date(playback.getTime()),
    //   onSelect: function(date) {
    //     var date = new Date(date);
    //     var time = $('#timepicker').data('timepicker');
    //     var ts = self._combineDateAndTime(date, time);
    //     playback.setCursor(ts);
    //     $('#time-slider').slider('value', ts);
    //   }
    // }); 

    // $('#date-input').on('keyup', function(e) {
    //   $('#calendar').datepicker('setDate', $('#date-input').val());
    // });

    // $('.dropdown-menu').on('click', function(e) {
    //   e.stopPropagation();
    // });

    // $('#timepicker').timepicker({
    //   showSeconds: true
    // });
    
    // $('#timepicker').timepicker('setTime', 
    //     new Date(playback.getTime()).toTimeString());

    // $('#timepicker').timepicker().on('changeTime.timepicker', function(e) {
    //   var date = $('#calendar').datepicker('getDate');
    //   var ts = self._combineDateAndTime(date, e.time);
    //   playback.setCursor(ts);
    //   $('#time-slider').slider('value', ts);
    // });
  },

  _update(self){
    var playback = this.playback;
    var startTime = playback.getStartTime();
    self.el('#cursor-date').innerHTML = L.Playback.Util.DateStr(startTime);
    self.el('#cursor-time').innerHTML = L.Playback.Util.TimeStr(startTime);

    self.timeSlider = this.el('#time-slider');
    self.timeSlider.min = playback.getStartTime();
    self.timeSlider.max = playback.getEndTime();
    self.timeSlider.step = playback.getTickLen();
    self.timeSlider.value = playback.getTime();
  },

  _clockCallback: function(ms, self) {
    self.el('#cursor-date').innerHTML = L.Playback.Util.DateStr(ms);
    self.el('#cursor-time').innerHTML = L.Playback.Util.TimeStr(ms);
    self.el('#time-slider').value = ms;
  },

  _speedToSliderVal: function(speed) {
    if (speed < 1) return -10+speed*10;
    return speed - 1;    
  },

  _sliderValToSpeed: function(val) {
    if (val < 0) return parseFloat((1+val/10).toFixed(2));
    return val + 1;    
  },

  _combineDateAndTime: function(date, time) {
    var yr = date.getFullYear();
    var mo = date.getMonth();
    var dy = date.getDate();
    // the calendar uses hour and the timepicker uses hours...
    var hr = time.hours || time.hour;
    if (time.meridian === 'PM' && hr !== 12) hr += 12;
    var min = time.minutes || time.minute;
    var sec = time.seconds || time.second;
    return new Date(yr, mo, dy, hr, min, sec).getTime();    
  },

  el: function(selector){
    return this.container.querySelector(selector);
  },
  setDropDown: function(el){
    el.addEventListener('click', function(e){
      e.preventDefault();
      this.parentElement.classList.toggle('open');
    });
  }

});