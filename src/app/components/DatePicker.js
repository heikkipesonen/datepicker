const DAY_ORDER = [6,0,1,2,3,4,5];
const DAY_NAMES = ['Ma','Ti','Ke','To','Pe','La','Su'];

export class DatePickerController {

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
    let currentWeek = getWeek();
    let month = [];

    let firstWeekDayIndexOfMonth = DAY_ORDER[model.getDay()];
    let fillModel = new Date(model.getTime());

    while (firstWeekDayIndexOfMonth >= 0){
      currentWeek[DAY_ORDER[fillModel.getDay()]] = new Date(fillModel.getTime());
      fillModel.setDate(fillModel.getDate()-1);
      firstWeekDayIndexOfMonth--;
    }

    while (model.getMonth() === currentMonth){
      let currentDay = model.getDay();

      currentWeek[DAY_ORDER[currentDay]] = new Date(model.getTime());

      if (DAY_ORDER[currentDay] === 6){
        month.push(currentWeek);
        currentWeek = getWeek();
      }

      model.setDate(model.getDate() + 1);
    }

    if (month.indexOf(currentWeek) < 0 && DAY_ORDER[model.getDay()-1] !== 6){
      month.push(currentWeek);

      let firstInvalidDay =  DAY_ORDER[model.getDay()];
      fillModel = new Date(model.getTime());

      while (firstInvalidDay <= 6){
        currentWeek[DAY_ORDER[fillModel.getDay()]] = new Date(fillModel.getTime());
        fillModel.setDate(fillModel.getDate()+1);
        firstInvalidDay++;
      }
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

  nextMonth(){
    this.ngModel.setMonth(this.ngModel.getMonth()+1);
  }

  prevMonth(){
    this.ngModel.setMonth(this.ngModel.getMonth()-1);
  }

  setDate(day) {
    if (day && this.isWithinBounds(day)){
      this.ngModel.setDate(day.getDate());
      this.ngModel.setMonth(day.getMonth());
      this.ngModel.setFullYear(day.getFullYear());
    }
  }

  toggleContent(){
    if (this.contentHidden !== undefined && this.contentHidden !== null){
      this.contentHidden = !this.contentHidden;
    }
  }
}

export function DatePickerDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      labelComplete: '@?',
      displayFormat: '@?',
      complete: '&?',
      cancel: '&?',
      ngModel: '=',
      maxDate: '=',
      minDate: '=',

      contentHidden: '=?'
    },
    controller: DatePickerController,
    bindToController: true,
    controllerAs: 'picker',
    require: 'ngModel',
    template: `
    <div>
      <picker-container class="date-picker">
        <picker-title class="picker-column">
          <picker-button ng-click="picker.prevMonth()">-</picker-button>
          <picker-display>{{picker.ngModel | date : picker.displayFormat || 'dd.MM.yyyy'}}</picker-display>
          <picker-button ng-click="picker.nextMonth()">+</picker-button>
        </picker-title>


        <picker-content ng-class="picker.direction" class="picker-calendar">
          <div class="picker-table-wrapper" ng-repeat="calendar in picker.month">
            <picker-table>
              <picker-table-header>
                <picker-table-cell  ng-repeat="day in ::picker.dayNames">
                  {{::day}}
                </picker-table-cell>
              </picker-table-header>
              <picker-table-row ng-repeat="week in ::calendar">
                <picker-table-cell ng-repeat="day in ::week"
                  selected="picker.isSelectedDate(day)"
                  secondary="!picker.isCurrentMonth(day)"
                  disabled="!picker.isWithinBounds(day)"
                  ng-click="picker.setDate(day)"
                  >
                  {{::day.getDate()}}
                </picker-table-cell>
              </picker-table-row>
            </picker-table>
          </div>
        </picker-content>


        <picker-footer>
          <picker-button
            ng-click="picker.cancel({date: picker.ngModel})">
            {{picker.labelCancel || 'cancel'}}
          </picker-button>
          <span class="picker-flex"></span>
          <picker-button
            ng-click="picker.complete({date: picker.ngModel})">
            {{picker.labelComplete || 'complete'}}
          </picker-button>
        </picker-footer>
      </picker-container>
    </div>
    `
  };
}
