const DAY_ORDER = [6,0,1,2,3,4,5];

export class DatePickerController {

  constructor($scope) {
    'ngInject';

    $scope.$watch(()=> this.ngModel.getMonth() + '' + this.ngModel.getFullYear(), () => {
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
    this.direction = 'picker-direction-forward';
    this.ngModel.setMonth(this.ngModel.getMonth()+1);
  }

  prevMonth(){
    this.direction = 'picker-direction-back';
    this.ngModel.setMonth(this.ngModel.getMonth()-1);
  }

  setDate(day) {
    if (day){
      this.direction = day > this.ngModel ? 'picker-direction-forward' : 'picker-direction-back';

      this.ngModel.setDate(day.getDate());
      this.ngModel.setMonth(day.getMonth());
      this.ngModel.setFullYear(day.getFullYear());
    }
  }
}

export function DatePickerDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      displayFormat: '=?',
      ngModel: '='
    },
    controller: DatePickerController,
    bindToController: true,
    controllerAs: 'picker',
    require: 'ngModel',
    template: `
      <div class="date-picker">
        <div class="date-picker-title date-picker-row">
          <button class="date-picker-button" ng-click="picker.prevMonth()"></button>
          <div class="date-picker-display date-picker-flex">
            {{picker.ngModel | date : picker.displayFormat || 'dd.MM.yyyy'}}
          </div>
          <button class="date-picker-button" ng-click="picker.nextMonth()"></button>
        </div>
        <div class="date-picker-cells-wrapper" ng-class="picker.direction">
          <div class="date-picker-calendar" ng-repeat="calendar in picker.month">
            <div class="date-picker-week date-picker-cell-row" ng-repeat="week in calendar track by $index">
              <div class="date-picker-day date-picker-cell"
                ng-class="{
                  'date-picker-cell-selected' : picker.isSelectedDate(day),
                  'date-picker-cell-another-month' : !picker.isCurrentMonth(day)
                }"
                ng-click="picker.setDate(day)"
                ng-repeat="day in week track by $index">
                {{day.getDate()}}
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  };
}
