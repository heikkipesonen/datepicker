const RADIANS_PER_MINUTE =  (Math.PI * 2)/60;
const RADIANS_PER_HOUR =  (Math.PI * 2)/24;


export class TimePickerController {
  constructor($scope, $timeout){
    'ngInject';

    this.$timeout = $timeout;
    this.rotation = {
      minutes: 0,
      hours: 0,
      $dirty: false
    };

    this.lastHourEventAngle = null;
    this.lastMinuteEventAngle = null;

    this.$scope = $scope;

    this.$scope.$watch(()=>this.ngModel.getTime(), () => {
      if (!this._dragStarted){
        this.updateByModel()
      }
    });

    this.update();
    $scope.$on('$destroy', () => this.onDestroy);
  }

  updateByModel(){
    this.rotation.minutes = this.getAngleFromMinutes();
    this.rotation.hours = this.getAngleFromHours();
    this.rotation.$dirty = true;
  }

  getHoursFromAngle(){
    let hours = Math.floor(this.rotation.hours / RADIANS_PER_HOUR);
    return hours > 23 ? 23 : hours < 0 ? hours + 24 : hours;
  }

  getMinutesFromAngle(){
    let minutes = Math.floor(this.rotation.minutes / RADIANS_PER_MINUTE);
    return minutes > 59 ? 59 : minutes < 0 ? minutes + 60: minutes;
  }

  getAngleFromHours(){
    return this.ngModel.getHours() * RADIANS_PER_HOUR;
  }

  getAngleFromMinutes(){
    return this.ngModel.getMinutes() * RADIANS_PER_MINUTE;
  }

  update(){
    if (this.rotation.$dirty){
      this._setDisplay();
      this.$scope.$apply(()=>{
        this.ngModel.setMinutes(this.getMinutesFromAngle());
        this.ngModel.setHours(this.getHoursFromAngle());
      });
    }

    this._animationLoop = function(){
      this.update();
    }.bind(this);

    window.requestAnimationFrame(this._animationLoop);
  }

  getCursor(evt){
    if (!evt.touches){
			return {x:evt.pageX,y:evt.pageY,t:evt.timeStamp};
		} else {
			return {x:evt.touches[0].pageX, y:evt.touches[0].pageY,t:evt.timeStamp};
		}
  }

  getAngle(evt, element){
    evt.stopPropagation();

    let cursor = this.getCursor(evt);
    let position = element.getBoundingClientRect();

    var dx = position.left + position.width / 2 - cursor.x;
		var dy = position.top + position.height / 2 - cursor.y;
		var da = Math.atan2(dy,dx) + 1.5 * Math.PI;
    return da > 2 * Math.PI ? da-2*Math.PI : da;
  }

  dragStart(type){
    this.lastMinuteEventAngle = null;
    this.lastHourEventAngle = null;

    this._dragStarted = type;
  }

  minuteDrag(evt) {
    if (this._dragStarted !== 'minute') return;

    evt.stopPropagation();

    let angle = this.getAngle(evt, this.containers.minute);
    if (this.lastMinuteEventAngle === null){
      this.lastMinuteEventAngle = angle;
    }

    this.rotation.minutes += angle - this.lastMinuteEventAngle;
    this.lastMinuteEventAngle = angle;
    this.rotation.$dirty = true;
  }

  hourDrag(evt) {
    if (this._dragStarted !== 'hour') return;

    evt.stopPropagation();

    let angle = this.getAngle(evt, this.containers.hour);
    if (this.lastHourEventAngle === null){
      this.lastHourEventAngle = angle;
    }

    this.rotation.hours += angle - this.lastHourEventAngle;
    this.lastHourEventAngle = angle;
    this.rotation.$dirty = true;
  }

  dragEnd(){
    this._dragStarted = false;
    this.updateByModel();
  }

  initialize(rootElement, minuteElement, hourElement) {
    this.containers = {
      root: rootElement,
      minute: minuteElement,
      hour: hourElement
    };

    minuteElement.addEventListener('mousedown', ()=> this.dragStart('minute'));
    hourElement.addEventListener('mousedown', ()=> this.dragStart('hour'));
    minuteElement.addEventListener('mousemove', (evt) => this.minuteDrag(evt));
    hourElement.addEventListener('mousemove', (evt) => this.hourDrag(evt));

    this.mouseUpListener = function(evt){
      this.dragEnd(evt);
    }.bind(this);
    document.addEventListener('mouseup', this.mouseUpListener);

    minuteElement.addEventListener('touchstart', ()=> this.dragStart());
    hourElement.addEventListener('touchstart', ()=> this.dragStart());
    minuteElement.addEventListener('touchmove', (evt) => this.minuteDrag(evt));
    hourElement.addEventListener('touchmove', (evt) => this.hourDrag(evt));
    minuteElement.addEventListener('touchend', (evt) => this.dragEnd(evt));
    hourElement.addEventListener('touchend', (evt) => this.dragEnd(evt));

    this.updateByModel();
  }

  onDestroy(){
    window.cancelAnimationFrame(this._animationLoop);
    document.removeEventListener(this.mouseUpListener);
  }

  _setDisplay(){
    this.containers.minute.style['transform'] = `rotate3d(0,0,1, ${this.rotation.minutes}rad)`;
    this.containers.hour.style['transform'] = `rotate3d(0,0,1, ${this.rotation.hours}rad)`;
    this.rotation.$dirty = false;
  }

}


export function TimePickerDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      ngModel: '=',
      format: '=?'
    },
    link:($scope, $element, $attrs, $controller) => {
      let el = $element[0];
      $controller.initialize(
        el.querySelector('.time-picker-inner-container'),
        el.querySelector('.time-picker-minutes'),
        el.querySelector('.time-picker-hours')
      );
    },
    controller: TimePickerController,
    bindToController: true,
    controllerAs: 'time',
    template:`<div class="time-picker">
    <div class="time-picker-title">
      <div class="time-picker-display">
        {{time.ngModel | date : time.format || 'HH:mm'}}
      </div>
    </div>
      <div class="time-picker-inner-container">
        <div class="time-picker-minutes">
          <div class="time-picker-minutes-indicator time-picker-indicator"></div>
        </div>
        <div class="time-picker-hours">
          <div class="time-picker-hours-indicator time-picker-indicator"></div>
        </div>
      </div>
    </div>`
  };
}
