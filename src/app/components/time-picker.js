
export class TimePickerController {
  constructor(){
    'ngInject';

  }


  toggleContent(){
    if (this.contentHidden !== undefined && this.contentHidden !== null){
      this.contentHidden = !this.contentHidden;
    }
  }

}


export function TimePickerDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      cancel: '&?',
      complete: '&?',
      ngModel: '=',
      format: '=?',
      hoursLabel: '@?',
      minutesLabel: '@?',
      contentHidden: '=?'
    },
    controller: TimePickerController,
    bindToController: true,
    controllerAs: 'time',
    template:`
    <div>
      <picker-container class="time-picker">
        <picker-title>
          <picker-display>{{time.ngModel | date : time.format || 'HH:mm'}}</picker-display>
        </picker-title>
        <picker-content>

        <time-picker-table
          ng-model="time.ngModel"
          hoursLabel="time.hoursLabel"
          minutesLabel="time.minutesLabel">
        </time-picker-table>

        </picker-content>
        <picker-footer>
          <picker-button
            ng-click="time.cancel({date: time.ngModel})">
            {{time.labelCancel || 'cancel'}}
          </picker-button>
          <span class="picker-flex"></span>
          <picker-button
            ng-click="time.complete({time: time.ngModel})">
            {{time.labelComplete || 'complete'}}
          </picker-button>
        </picker-footer>
      </picker-container>
    </div>`
  };
}
