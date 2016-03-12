import MainController from './main/main.controller';
import {DatePickerController} from './components/DatePicker';
import {DatePickerDirective} from './components/DatePicker';
import {DatePickerDialogService} from './components/DatePickerDialog';
import {TimePickerDirective} from './components/TimePicker';

angular.module('DatePicker', ['ngAnimate'])
  .controller('MainController', MainController)
  .controller('DatePickerController', DatePickerController)
  .directive('datePicker', DatePickerDirective)
  .directive('timePicker', TimePickerDirective)
  .service('DatePickerDialogService', DatePickerDialogService);
