const DAY_ORDER = [6,0,1,2,3,4,5];
const DAY_NAMES = ['Ma','Ti','Ke','To','Pe','La','Su'];


export class DatePickerCalendarController {
  constructor($scope) {
    'ngInject';

    this.dayNames = DAY_NAMES;

    let lastValue = 0;
    $scope.$watch(()=> this.ngModel.getMonth() + '' + this.ngModel.getFullYear(), () => {
        this.direction = this.ngModel.getTime() > lastValue ? 'picker-direction-forward' : 'picker-direction-back';
        lastValue = this.ngModel.getTime();
        this.month = [this.buildMonth(this.ngModel)];
    });
  }

  buildMonth(date) {
    let currentMonth = date.getMonth();
    let model = new Date(date.getTime());
        model.setMonth(currentMonth);
        model.setDate(1);

    let getWeek = () => Array(7).fill(false);
    let month = Array(6).fill(false).map(() => {
      return getWeek();
    });

    let currentWeek = 0;
    let firstWeekDayIndexOfMonth = DAY_ORDER[model.getDay()];
    let fillModel = new Date(model.getTime());

    while (firstWeekDayIndexOfMonth >= 0){
      fillModel.setDate(fillModel.getDate()-1);
      month[0][DAY_ORDER[fillModel.getDay()]] = new Date(fillModel.getTime());
      firstWeekDayIndexOfMonth--;
    }

    while (currentWeek < month.length){
      let currentDay = model.getDay();
      month[currentWeek][DAY_ORDER[currentDay]] = new Date(model.getTime());
      if (DAY_ORDER[currentDay] === 6){
        currentWeek++;
      }
      model.setDate(model.getDate() + 1);
    }

    return month;
  }

  isSelectedDate(day) {
    return day &&
      day.getDate() === this.ngModel.getDate() &&
      day.getMonth() === this.ngModel.getMonth() &&
      day.getFullYear() === this.ngModel.getFullYear();
  }

  isCurrentMonth(day){
    return day ? day.getMonth() === this.ngModel.getMonth() : false;
  }

  isWithinBounds(day) {
    let result = true;
    result = this.minDate ? day < this.minDate ? false : true : true;
    result = result ? this.maxDate ? day > this.maxDate ? false : true : true : false;

    return result;
  }

  setDate(day) {
    if (day && this.isWithinBounds(day)){
      this.ngModel.setDate(day.getDate());
      this.ngModel.setMonth(day.getMonth());
      this.ngModel.setFullYear(day.getFullYear());
    }
  }

}

export function DatePickerCalendarDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      ngModel: '=',
      minDate: '=?',
      maxDate: '=?'
    },
    controller: DatePickerCalendarController,
    bindToController: true,
    controllerAs: 'calendar',
    template: `
      <div class="picker-calendar picker-content" ng-class="calendar.direction">
        <div class="picker-table-wrapper" ng-repeat="month in calendar.month">
          <picker-table>
            <picker-table-header>
              <picker-table-cell  ng-repeat="dayName in ::calendar.dayNames">
                {{::dayName}}
              </picker-table-cell>
            </picker-table-header>
            <picker-table-row ng-repeat="week in ::month">
              <picker-table-cell ng-repeat="day in ::week track by $index"
                selected="calendar.isSelectedDate(day)"
                secondary="!calendar.isCurrentMonth(day)"
                disabled="!calendar.isWithinBounds(day)"
                ng-click="calendar.setDate(day)"
                >
                {{::day.getDate()}}
              </picker-table-cell>
            </picker-table-row>
          </picker-table>
        </div>
      </div>
    `
  };
}
