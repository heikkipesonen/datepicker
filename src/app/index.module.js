import config from './index.config';

import runBlock from './index.run';
import MainController from './main/main.controller';
import {DatePickerDirective} from './components/DatePicker';
import {TimePickerDirective} from './components/TimePicker';

angular.module('DatePicker', ['ngAnimate'])
  .config(config)
  .controller('MainController', MainController)
  .directive('datePicker', DatePickerDirective)
  .directive('timePicker', TimePickerDirective)
  .run(runBlock);
