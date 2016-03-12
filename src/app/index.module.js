import config from './index.config';

import MainController from './main/main.controller';
import {DatePickerDirective} from './components/DatePicker';
import {DatePickerDialogService} from './components/DatePickerDialog';
import {TimePickerDirective} from './components/TimePicker';

angular.module('DatePicker', ['ngAnimate'])
  .config(config)
  .controller('MainController', MainController)
  .directive('datePicker', DatePickerDirective)
  .directive('timePicker', TimePickerDirective)
  .service('DatePickerDialogService', DatePickerDialogService);
