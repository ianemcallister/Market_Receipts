angular
    .module('marketForm')
    .directive('dateSelection', dateSelection);

dateSelection.$inject = [];

function dateSelection () {
	var theDirective = {
		restrict: 'AECM',
		replace: true,
		scope: {
			data: '=',
			addressed: '='
		},
		controllerAs: 'vm',
		templateUrl: 'views/directives/dateRow/date.directive.htm',
		link: function(scope, elem, attrs) {},
		controller: dateSelectionController,
		bindToController: true
	};

	dateSelectionController.$inject = ['$log'];

	function dateSelectionController($log) {
		var vm = this;

		//$log.info('this is the dateSelectionController Directive', vm.data);
	}

	return theDirective;
}