export function pickerContainer(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `<div class="picker-container" ng-transclude></div>`
  };
}

export function pickerTitle(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `<div class="picker-title picker-row" ng-transclude></div>`
  };
}
export function pickerFooter(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `<div class="picker-footer picker-row" ng-transclude></div>`
  };
}

export function pickerButton(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `<button class="picker-button" ng-transclude></button>`
  };
}

export function pickerDisplay(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `<div class="picker-display" ng-transclude></div>`
  };
}

export function pickerContent(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `<div class="picker-content" ng-transclude></div>`
  };
}

export function pickerSection(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `<div class="picker-section" ng-transclude></div>`
  };
}

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
