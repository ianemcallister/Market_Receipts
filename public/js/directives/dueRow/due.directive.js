angular
    .module('marketForm')
    .directive('due', due);

due.$inject = [];

function due () {
	var theDirective = {
		restrict: 'AECM',
		replace: true,
		scope: {
			data: '=',
			addressed: '='
		},
		controllerAs: 'vm',
		templateUrl: 'directives/dueRow/due.directive.htm',
		link: function(scope, elem, attrs) {},
		controller: dueController,
		bindToController: true
	};

	dueController.$inject = ['$log'];

	function dueController($log) {
		var vm = this;

		//$log.info('this is the dueController Directive', vm.data, vm.addressed);
	}

	return theDirective;
}