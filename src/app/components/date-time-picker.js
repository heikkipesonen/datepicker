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
        <div class="picker-title">
          <div class="picker-display">
            {{datetime.ngModel | date : datetime.format || 'dd.MM.yyyy HH:mm'}}
          </div>
        </div>
        <div class="date-time-picker-content picker-column">
          <div class="date-picker">
            <date-picker-calendar ng-model="datetime.ngModel"></date-picker-calendar>
          </div>
          <div class="time-picker">
            <time-picker-table ng-model="datetime.ngModel"></time-picker-table>
          </div>
        </div>
        <div class="picker-footer"></div>
      </div>
    `
  };
}
