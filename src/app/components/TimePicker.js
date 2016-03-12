export class TimePickerController {

}


export function TimePickerDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      ngModel: '=',
      format: '=?'
    },
    controller: TimePickerController,
    bindToController: true,
    controllerAs: 'time',
    template:`<div class="time-picker">
    <div class="time-picker-title">
      <div class="time-picker-display">
        {{time.ngModel | date : time.format || 'HH:mm'}}
      </div>
    </div>
      <div class="time-picker-inner-container">
        <div class="time-picker-hours"></div>
        <div class="time-picker-minutes"></div>
      </div>
    </div>`
  };
}
