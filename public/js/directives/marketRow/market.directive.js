angular
    .module('marketForm')
    .directive('marketSelection', marketSelection);

marketSelection.$inject = [];

function marketSelection () {
	var theDirective = {
		restrict: 'AECM',
		replace: true,
		scope: {
			data: '=',
			addressed: '='
		},
		controllerAs: 'vm',
		templateUrl: 'directives/marketRow/market.directive.htm',
		link: function(scope, elem, attrs) {},
		controller: marketSelectionController,
		bindToController: true
	};

	marketSelectionController.$inject = ['$log'];

	function marketSelectionController($log) {
		var vm = this;

		//$log.info('this is the marketSelectionController Directive', vm.data);
	}

	return theDirective;
}