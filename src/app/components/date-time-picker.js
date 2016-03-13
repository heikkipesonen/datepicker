export class DateTimePickerController{

}

export function DateTimePickerDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      ngModel: '='
    },
    controller: DateTimePickerController,
    bindToController: true,
    controllerAs: 'datetime',
    template: `
      <div class="date-time-picker picker-container">
        <picker-title>
          <picker-display>{{datetime.ngModel | date : datetime.format || 'dd.MM.yyyy HH:mm'}}</picker-display>
        </picker-title>
        <div class="date-time-picker-content picker-column">
          <div class="date-picker">
            <date-picker-calendar ng-model="datetime.ngModel"></date-picker-calendar>
          </div>
          <div class="time-picker">
            <time-picker-table ng-model="datetime.ngModel"></time-picker-table>
          </div>
        </div>
        <picker-footer></picker-footer>
      </div>
    `
  }
}
