(function() {
  'use strict';

  angular
    .module('datepicker')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
