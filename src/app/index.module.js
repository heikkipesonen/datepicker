import MainController from './main/main.controller';
import {DatePickerDirective} from './components/DatePicker';
import {DatePickerDialogService} from './components/DatePickerDialog';
import {TimePickerDirective} from './components/TimePicker';
import * as picker from './components/directives';

angular.module('DatePicker', ['ngAnimate'])
  .controller('MainController', MainController)
  .directive('datePicker', DatePickerDirective)
  .directive('timePicker', TimePickerDirective)
  .service('DatePickerDialogService', DatePickerDialogService)

  .directive('pickerTitle', picker.pickerTitle)
  .directive('pickerFooter', picker.pickerFooter)
  .directive('pickerButton', picker.pickerButton)
  .directive('pickerDisplay', picker.pickerDisplay)
  .directive('pickerContent', picker.pickerContent)
  .directive('pickerSection', picker.pickerSection)
  .directive('pickerTable', picker.pickerTable)
  .directive('pickerTableHeader', picker.pickerTableHeader)
  .directive('pickerTableRow', picker.pickerTableRow)
  .directive('pickerTableCell', picker.pickerTableCell)
  .directive('pickerSubtitle', picker.pickerSubtitle)
  .directive('pickerContainer', picker.pickerContainer);
