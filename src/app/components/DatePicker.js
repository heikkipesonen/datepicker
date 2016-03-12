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

  nextMonth(){
    this.ngModel.setMonth(this.ngModel.getMonth()+1);
  }

  prevMonth(){
    this.ngModel.setMonth(this.ngModel.getMonth()-1);
  }

  setDate(day) {
    if (day){
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
      contentHidden: '=?'
    },
    controller: DatePickerController,
    bindToController: true,
    controllerAs: 'picker',
    require: 'ngModel',
    template: `
      <div class="date-picker">
        <div class="date-picker-title date-picker-row">
          <button class="date-picker-button" ng-click="picker.prevMonth()">-</button>
          <div class="date-picker-display date-picker-flex"  ng-click="picker.toggleContent()">
            {{picker.ngModel | date : picker.displayFormat || 'dd.MM.yyyy'}}
          </div>
          <button class="date-picker-button" ng-click="picker.nextMonth()">+</button>
        </div>

        <div class="date-picker-container" ng-class="{'date-picker-content-hidden' : picker.contentHidden}">
          <div class="date-picker-cells-wrapper" ng-class="picker.direction">
            <div class="date-picker-calendar" ng-repeat="calendar in picker.month">
              <div class="date-picker-day-names date-picker-cell-row">
                <div class="date-picker-day-name-cell" ng-repeat="day in ::picker.dayNames">
                  {{::day}}
                </div>
              </div>
              <div class="date-picker-week date-picker-cell-row" ng-repeat="week in ::calendar">
                <div class="date-picker-day date-picker-cell"
                  ng-class="{
                    'date-picker-cell-selected' : picker.isSelectedDate(day),
                    'date-picker-cell-another-month' : !picker.isCurrentMonth(day)
                  }"
                  ng-click="picker.setDate(day)"
                  ng-repeat="day in ::week">
                  {{::day.getDate()}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="date-picker-footer date-picker-row" ng-if="picker.cancel || picker.complete">
          <button class="date-picker-button" ng-if="picker.cancel" ng-click="picker.cancel({date: picker.ngModel})">Cancel</button>
          <span class="date-picker-flex"></span>
          <button class="date-picker-button" ng-if="picker.complete" ng-click="picker.complete({date: picker.ngModel})">Done</button>
        </div>
      </div>
    `
  };
}
