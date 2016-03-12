const TEMPLATE = `
<div class="date-picker-dialog-container">
  <div class="date-picker-dialog-overlay" ng-click="cancelDialog()"></div>
  <div class="date-picker-dialog">
    <date-picker ng-model="ngModel" complete="completeDialog(date)" cancel="cancelDialog()"></date-picker>
  </div>
</div>
`;

const START_Z_INDEX = 1000;

export class DatePickerDialogService {
  constructor($animate, $compile, $rootScope, $q) {
    this.$animate = $animate;
    this.$compile = $compile;
    this.$rootScope = $rootScope;
    this.$q = $q;

    this._rootElement = document.body;

    this.dialogs = [];
    this.currentZIndex = START_Z_INDEX;
  }

  pick(model) {
    let d = this.$q.defer();
    let scope = this.$rootScope.$new();
        scope.ngModel = new Date(model.getTime());

        scope.completeDialog = (date) => {
          model.setTime(date.getTime());
          console.log(date);
          d.resolve(scope.ngModel);
        };

        scope.cancelDialog = () => {
          d.reject();
        };



    let element = this.$compile(TEMPLATE)(scope);
    element[0].style.zIndex = this.currentZIndex + 1;

    this.dialogs.push(element);
    this.$animate.enter(element, this._rootElement, this._rootElement.lastChild);

    d.promise.finally(() => {
      this.dialogs.splice(this.dialogs.indexOf(element), 1);
      if (this.dialogs.length === 0){
        this.currentZIndex = START_Z_INDEX;
      }

      this.$animate.leave(element);
    });

    return d.promise;
  }
}
