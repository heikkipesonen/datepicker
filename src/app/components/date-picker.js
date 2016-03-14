
export class DatePickerController {

  constructor() {
    'ngInject';
  }

  nextMonth(){
    this.ngModel.setMonth(this.ngModel.getMonth()+1);
  }

  prevMonth(){
    this.ngModel.setMonth(this.ngModel.getMonth()-1);
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
      <div class="picker-container date-picker">
        <div class="picker-title picker-column">
          <button class="picker-button" ng-click="picker.prevMonth()">-</button>
          <div class="picker-display">{{picker.ngModel | date : picker.displayFormat || 'dd.MM.yyyy'}}</div>
          <button class="picker-button" ng-click="picker.nextMonth()">+</button>
        </div>
        <date-picker-calendar ng-model="picker.ngModel" max-date="picker.maxDate" min-date="picker.minDate"></date-picker-calendar>
        <div class="picker-footer">
          <button class="picker-button"
            ng-click="picker.cancel({date: picker.ngModel})">
            {{picker.labelCancel || 'cancel'}}
          </button>
          <span class="picker-flex"></span>
          <button class="picker-button"
            ng-click="picker.complete({date: picker.ngModel})">
            {{picker.labelComplete || 'complete'}}
          </button>
        </div>
      </div>
    `
  };
}
