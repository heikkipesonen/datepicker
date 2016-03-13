const MINUTE_STEP = 5;

export class TimePickerController {
  constructor(){
    'ngInject';

    this.minutes = this.toRows(Array(60/MINUTE_STEP).fill(false).map((value, index)=> index * MINUTE_STEP), 6);
    this.hours = this.toRows(Array(24).fill(false).map((value, index) => index), 6);
  }

  toRows(source, count) {
    let rows = [];
    let row = [];

    source.forEach((item) => {

      row.push(item);

      if (row.length === count) {
        rows.push(row);
        row = [];
      }
    });

    if (rows.indexOf(row) < 0){
      rows.push(row);
    }

    return rows;
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
    template:`
    <div>
      <picker-container class="time-picker">
        <picker-title>
          <picker-display>{{time.ngModel | date : time.format || 'HH:mm'}}</picker-display>
        </picker-title>
        <picker-content>
          <picker-subtitle>
            {{time.hoursLabel ||  'hours'}}
          </picker-subtitle>
          <picker-table>
            <picker-table-row ng-repeat="row in ::time.hours">
              <picker-table-cell
                selected="time.isSelectedHour(hour)"
                ng-repeat="hour in ::row"
                ng-click="time.setHour(hour)">
                 {{::hour}}
              </picker-table-cell>
            </picker-table-row>
          </picker-table>
          <picker-subtitle>
            {{time.minutesLabel ||  'minutes'}}
          </picker-subtitle>
          <picker-table>
            <picker-table-row ng-repeat="row in ::time.minutes">
              <picker-table-cell
                selected="time.isSelectedMinute(minute)"
                ng-repeat="minute in ::row"
                ng-click="time.setMinutes(minute)">
                 {{::minute}}
              </picker-table-cell>
            </picker-table-row>
          </picker-table>
        </picker-content>
        <picker-footer>
          <picker-button
            ng-click="time.cancel({date: time.ngModel})">
            {{time.labelCancel || 'cancel'}}
          </picker-button>
          <span class="picker-flex"></span>
          <picker-button
            ng-click="time.complete({time: time.ngModel})">
            {{time.labelComplete || 'complete'}}
          </picker-button>
        </picker-footer>
      </picker-container>
    </div>`
  };
}
