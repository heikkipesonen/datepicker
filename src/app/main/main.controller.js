class MainController {
  constructor ($scope, DatePickerDialogService) {
    'ngInject';
    $scope.pickerModel = new Date();
    $scope.pick = () => {
      DatePickerDialogService.pick($scope.pickerModel);
    }
  }
}

export default MainController;
