const DAY_ORDER = [1,2,3,4,5,6,0];

class DatePickerController {

  constructor($scope) {
    'ngInject';
    $scope.$watch(()=> this.ngModel.getMonth() + '' + this.ngModel.getFullYear(), (newValue, oldValue) => {
        this.month = this.buildMonth(this.ngModel)
    });
  }

  buildMonth(date) {
    let currentMonth = date.getMonth();
    let model = new Date();
        model.setMonth(currentMonth);
        model.setDate(1);

    let getWeek = () => Array(7).fill(false);
    let currentWeek = getWeek();
    let month = [];

    while (model.getMonth() === currentMonth){
      let currentDay = model.getDay();

      currentWeek[DAY_ORDER[currentDay]] = new Date(model.getTime());

      if (DAY_ORDER[currentDay] === 6){
        month.push(currentWeek);
        currentWeek = getWeek();
      }

      model.setDate(model.getDate() + 1);
    }

    if (month.indexOf(currentWeek) < 0){
      month.push(currentWeek);
    }

    return month;
  }

  isSelectedDate(day) {
    return day &&
      day.getDate() === this.ngModel.getDate() &&
      day.getMonth() === this.ngModel.getMonth() &&
      day.getFullYear() === this.ngModel.getFullYear();
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
    link: () => {
      console.log('pere');
    },
    template: `
      <div class="date-picker">
        <div class="date-picker-controls date-picker-row">
          <button class="date-picker-button" ng-click="picker.prevMonth()"></button>
          <div class="date-picker-display date-picker-flex">
            {{picker.ngModel | date : picker.displayFormat || 'dd.MM.yyyy'}}
          </div>
          <button class="date-picker-button" ng-click="picker.nextMonth()"></button>
        </div>
        <div class="date-picker-calendar date-picker-cells-wrapper">
          <div class="date-picker-week date-picker-cell-row" ng-repeat="week in picker.month track by $index">
            <div class="date-picker-day date-picker-cell"
              ng-class="{'date-picker-cell-selected' : picker.isSelectedDate(day)}"
              ng-click="picker.setDate(day)"
              ng-repeat="day in week track by $index">
              {{day.getDate()}}
            </div>
          </div>
        </div>
      </div>
    `
  };
}
