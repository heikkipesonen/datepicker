import config from './index.config';

import runBlock from './index.run';
import MainController from './main/main.controller';
import {DatePickerDirective} from './components/DatePicker';

angular.module('DatePicker', ['ngAnimate'])
  .config(config)
  .controller('MainController', MainController)
  .directive('datePicker', DatePickerDirective)
  .run(runBlock);
