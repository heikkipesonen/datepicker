
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
      <div class="time-picker picker-container">
        <div class="picker-title">
          <div class="picker-display">{{time.ngModel | date : time.format || 'HH:mm'}}</div>
        </div>

        <time-picker-table
          ng-model="time.ngModel"
          hoursLabel="time.hoursLabel"
          minutesLabel="time.minutesLabel">
        </time-picker-table>


        <div class="picker-footer">
          <button class="picker-button"
            ng-click="time.cancel({date: time.ngModel})">
            {{time.labelCancel || 'cancel'}}
          </button>
          <span class="picker-flex"></span>
          <button class="picker-button"
            ng-click="time.complete({time: time.ngModel})">
            {{time.labelComplete || 'complete'}}
          </button>
        </div>
      </div>`
  };
}
