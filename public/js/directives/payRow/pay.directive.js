angular
    .module('marketForm')
    .directive('pay', pay);

pay.$inject = [];

function pay () {
	var theDirective = {
		restrict: 'AECM',
		replace: true,
		scope: {
			data: '=',
			addressed: '='
		},
		controllerAs: 'vm',
		templateUrl: 'views/directives/payRow/pay.directive.htm',
		link: function(scope, elem, attrs) {},
		controller: payController,
		bindToController: true
	};

	payController.$inject = ['$log'];

	function payController($log) {
		var vm = this;

		//$log.info('this is the payController Directive', vm.data);
	}

	return theDirective;
}