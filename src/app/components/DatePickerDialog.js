const TEMPLATE = `
<div class="date-picker-dialog-container">
  <div class="date-picker-dialog-overlay" ng-click="cancelDialog()"></div>
  <div class="date-picker-dialog">
    {{PARTIAL}}
  </div>
</div>
`;

const DATE_PICKER = `<date-picker ng-model="ngModel" complete="completeDialog(date)" cancel="cancelDialog()"></date-picker>`;
const TIME_PICKER = `<time-picker ng-model="ngModel" complete="completeDialog(time)" cancel="cancelDialog()"></time-picker>`;

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

  _createScope(model){
    let d = this.$q.defer();
    let scope = this.$rootScope.$new();
        scope.promise = d.promise;
        scope.ngModel = new Date(model.getTime());

    scope.completeDialog = (date) => {
      model.setTime(date.getTime());
      d.resolve(scope.ngModel);
    };

    scope.cancelDialog = () => {
      d.reject(scope.ngModel);
    };

    return scope;
  }

  _show(scope, template) {
    let element = this.$compile(template)(scope);
    this.currentZIndex++
    element[0].style.zIndex = this.currentZIndex;

    this.dialogs.push(element);

    scope.promise.finally(() => {
      this.dialogs.splice(this.dialogs.indexOf(element), 1);
      if (this.dialogs.length === 0){
        this.currentZIndex = START_Z_INDEX;
      }

      this.$animate.leave(element);
    });

    return this.$animate.enter(element, this._rootElement, this._rootElement.lastChild);
  }

  pickTime(model){
    let scope = this._createScope(model);
    this._show(scope, TEMPLATE.replace('{{PARTIAL}}', DATE_PICKER));
    return scope.promise;
  }

  pickDate(model) {
    let scope = this._createScope(model);
    this._show(scope, TEMPLATE.replace('{{PARTIAL}}', TIME_PICKER));
    return scope.promise;
  }
}
