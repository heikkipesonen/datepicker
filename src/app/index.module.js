import MainController from './main/main.controller';
import {DatePickerDirective} from './components/date-picker';
import {DatePickerCalendarDirective} from './components/date-picker-calendar';
import {DateTimePickerDirective} from './components/date-time-picker';
import {DatePickerDialogService} from './components/picker-dialog';
import {TimePickerDirective} from './components/time-picker';
import {TimePickerTableDirective} from './components/time-picker-table';
import * as picker from './components/directives';

angular.module('DatePicker', ['ngAnimate'])
  .controller('MainController', MainController)
  .service('DatePickerDialogService', DatePickerDialogService)

  .directive('datePicker', DatePickerDirective)
  .directive('datePickerCalendar', DatePickerCalendarDirective)
  .directive('timePicker', TimePickerDirective)
  .directive('timePickerTable', TimePickerTableDirective)
  .directive('dateTimePicker', DateTimePickerDirective)

  .directive('pickerTable', picker.pickerTable)
  .directive('pickerTableHeader', picker.pickerTableHeader)
  .directive('pickerTableRow', picker.pickerTableRow)
  .directive('pickerTableCell', picker.pickerTableCell)
  .directive('pickerSubtitle', picker.pickerSubtitle);
