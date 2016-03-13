
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
    <div>
      <picker-container class="date-picker">
        <picker-title class="picker-column">
          <picker-button ng-click="picker.prevMonth()">-</picker-button>
          <picker-display>{{picker.ngModel | date : picker.displayFormat || 'dd.MM.yyyy'}}</picker-display>
          <picker-button ng-click="picker.nextMonth()">+</picker-button>
        </picker-title>
        <date-picker-calendar ng-model="picker.ngModel" max-date="picker.maxDate" min-date="picker.minDate"></date-picker-calendar>
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
