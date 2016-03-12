const MINUTE_STEP = 5;

export class TimePickerController {
  constructor($scope){
    'ngInject';

    this.minutes = Array(60/MINUTE_STEP).fill(false).map((value, index)=> index * MINUTE_STEP);
    this.hours = Array(24).fill(false).map((value, index) => index);
  }

  isSelectedHour(hour){
    return hour === this.ngModel.getHours();
  }

  isSelectedMinute(minute){
    return minute === this.ngModel.getMinutes();
  }

  setHour(hour){
    this.ngModel.setHours(hour);
  }

  setMinutes(minutes){
    this.ngModel.setMinutes(minutes);
  }

}


export function TimePickerDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      ngModel: '=',
      format: '=?',
      hoursLabel: '@?',
      minutesLabel: '@?'
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
      <div class="time-picker-container">
        <div class="time-picker-inner-container">
          <div class="time-picker-subtitle">
            {{time.hoursLabel ||  'hours'}}
          </div>

          <div class="time-picker-hours time-picker-section">
            <div
            class="time-picker-hour time-picker-cell"
            ng-repeat="hour in ::time.hours"
            ng-class="{'time-picker-cell-selected' : time.isSelectedHour(hour)}"
            ng-click="time.setHour(hour)">
              {{::hour}}
            </div>
          </div>

          <div class="time-picker-subtitle">
            {{time.minutesLabel ||  'minutes'}}
          </div>
          <div class="time-picker-minutes time-picker-section">
            <div
              class="time-picker-minute time-picker-cell"
              ng-repeat="minute in ::time.minutes"
              ng-class="{'time-picker-cell-selected' : time.isSelectedMinute(minute)}"
              ng-click="time.setMinutes(minute)">
              {{::minute}}
            </div>
          </div>
        </div>
      </div>
    </div>`
  };
}
