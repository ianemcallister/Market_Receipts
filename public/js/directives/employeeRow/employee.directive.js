angular
    .module('marketForm')
    .directive('employeeSelection', employeeSelection);

employeeSelection.$inject = [];

function employeeSelection () {
	var theDirective = {
		restrict: 'AECM',
		replace: true,
		scope: {
			data: '=',
			addressed: '='
		},
		controllerAs: 'vm',
		templateUrl: 'directives/employeeRow/employee.directive.htm',
		link: function(scope, elem, attrs) {},
		controller: employeeSelectionController,
		bindToController: true
	};

	employeeSelectionController.$inject = ['$log'];

	function employeeSelectionController($log) {
		var vm = this;

		//$log.info('this is the employeeSelectionController Directive', vm.data);
	}

	return theDirective;
}