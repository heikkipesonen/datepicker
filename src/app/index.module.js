/* global malarkey:false, toastr:false, moment:false */
import config from './index.config';

angular.module('DatePicker', ['ngAnimate'])
  .config(config)
  .run(runBlock)
