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

  toggleContent(){
    if (this.contentHidden !== undefined && this.contentHidden !== null){
      this.contentHidden = !this.contentHidden;
    }
  }

}


export function TimePickerDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      cancel: '&?',
      complete: '&?',
      ngModel: '=',
      format: '=?',
      hoursLabel: '@?',
      minutesLabel: '@?',
      contentHidden: '=?'
    },
    controller: TimePickerController,
    bindToController: true,
    controllerAs: 'time',
    template:`<div class="time-picker">
      <div class="time-picker-title" ng-click="time.toggleContent()">
        <div class="time-picker-display">
          {{time.ngModel | date : time.format || 'HH:mm'}}
        </div>
      </div>
      <div class="time-picker-container" ng-class="{'time-picker-content-hidden' : time.contentHidden}">
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
      <div class="time-picker-footer time-picker-row" ng-if="time.cancel || time.complete">
        <button class="time-picker-button" ng-if="time.cancel" ng-click="time.cancel({time: time.ngModel})">Cancel</button>
        <span class="time-picker-flex"></span>
        <button class="time-picker-button" ng-if="time.complete" ng-click="time.complete({time: time.ngModel})">Done</button>
      </div>

    </div>`
  };
}
