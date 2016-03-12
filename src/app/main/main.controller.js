class MainController {
  constructor ($scope, DatePickerDialogService) {
    'ngInject';

    $scope.pickerModel = new Date();

    $scope.pickTime = () => {
      DatePickerDialogService.pickTime($scope.pickerModel);
    };

    $scope.pickDate = () => {
      DatePickerDialogService.pickDate($scope.pickerModel);
    };
  }
}

export default MainController;
