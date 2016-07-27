angular
    .module('marketForm')
    .directive('bank', bank);

bank.$inject = [];

function bank () {
	var theDirective = {
		restrict: 'AECM',
		replace: true,
		scope: {
			data: '=',
			addressed: '='
		},
		controllerAs: 'vm',
		templateUrl: 'views/directives/bankRow/bank.directive.htm',
		link: function(scope, elem, attrs) {},
		controller: bankController,
		bindToController: true
	};

	bankController.$inject = ['$log'];

	function bankController($log) {
		var vm = this;

		//$log.info('this is the rentController Directive', vm.data);
	}

	return theDirective;
}