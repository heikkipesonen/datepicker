const TEMPLATE = `
<div class="date-picker-dialog-container">
  <div class="date-picker-dialog-overlay" ng-click="cancelDialog()"></div>
  <div class="date-picker-dialog">
    <date-picker ng-model="ngModel"></date-picker>
  </div>
</div>
`;


export class DatePickerDialogService {
  constructor($animate, $compile, $rootScope, $q) {
    this.$animate = $animate;
    this.$compile = $compile;
    this.$rootScope = $rootScope;
    this.$q = $q;

    console.log(document.body)
    this._rootElement = document.body;

    this.dialogs = [];
  }

  pick(model) {
    let d = this.$q.defer();
    let scope = this.$rootScope.$new();
        scope.ngModel = new Date(model.getTime());

        scope.complete = () => {
          d.resolve(scope.ngModel);
        };

        scope.cancelDialog = () => {
          d.reject();
        };

    let element = this.$compile(TEMPLATE)(scope);

    this.dialogs.push(element);

    this.$animate.enter(element, this._rootElement, this._rootElement.lastChild);

    d.promise.finally(() => {
      this.$animate.leave(element);
    })

    return d.promise;
  }
}
