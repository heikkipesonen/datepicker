describe('datepicker', function(){
  beforeEach(module('DatePicker'));

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.ngModel = new Date();
    scope.ngModel.setMonth(2);
    scope.ngModel.setDate(1);
    scope.ngModel.setFullYear(2016);
    DatePickerController = $controller('DatePickerController', {
      $scope: scope
    });
  }));

  it('should generate calendar', function (){
    var calendar = DatePickerController.buildMonth(scope.ngModel);
    expect(calendar.length).toBe(5);
    expect(calendar[0][0].getDate().toBe(29));
  });

});
