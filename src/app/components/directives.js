export function pickerTable(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `<div class="picker-table" ng-transclude></div>`
  };
}
export function pickerTableHeader(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `<div class="picker-table-header picker-table-row picker-row" ng-transclude></div>`
  };
}

export function pickerTableRow(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `<div class="picker-table-row picker-row" ng-transclude></div>`
  };
}

export function pickerTableCell(){
  return {
    restrict: 'E',
    scope: {
      selected: '=?',
      secondary: '=?',
      disabled: '=?'
    },
    replace: true,
    transclude: true,
    template: `
      <div class="picker-table-cell"
        ng-class="{
          'picker-table-cell-selected' : selected,
          'picker-table-cell-secondary' : secondary,
          'picker-table-cell-disabled' : disabled
        }"
        ng-transclude>
      </div>`
  };
}

export function pickerSubtitle(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `<div class="picker-subtitle" ng-transclude></div>`
  };
}
