const MINUTE_STEP = 5;

export class TimePickerTableController {
  constructor(){
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

}

export function TimePickerTableDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      ngModel: '=',
      hoursLabel: '@?',
      minutesLabel: '@?'
    },
    controller: TimePickerTableController,
    controllerAs: 'time',
    bindToController: true,
    template: `
      <div class="picker-content">
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
      </div>
      `
  };
}
