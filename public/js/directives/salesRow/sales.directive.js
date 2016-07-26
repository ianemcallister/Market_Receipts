angular
    .module('marketForm')
    .directive('sales', sales);

sales.$inject = [];

function sales () {
	var theDirective = {
		restrict: 'AECM',
		replace: true,
		scope: {
			data: '=',
			addressed: '='
		},
		controllerAs: 'vm',
		templateUrl: 'views/directives/salesRow/sales.directive.htm',
		link: function(scope, elem, attrs) {},
		controller: salesController,
		bindToController: true
	};

	salesController.$inject = ['$log'];

	function salesController($log) {
		var vm = this;

		//$log.info('this is the salesController Directive', vm.data);
	}

	return theDirective;
}