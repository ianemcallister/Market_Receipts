angular
    .module('marketForm')
    .directive('till', till);

till.$inject = [];

function till () {
	var theDirective = {
		restrict: 'AECM',
		replace: true,
		scope: {
			data: '=',
			addressed: '='
		},
		controllerAs: 'vm',
		templateUrl: 'views/directives/tillRow/till.directive.htm',
		link: function(scope, elem, attrs) {},
		controller: tillController,
		bindToController: true
	};

	tillController.$inject = ['$log'];

	function tillController($log) {
		var vm = this;

		//$log.info('this is the rentController Directive', vm.data);
	}

	return theDirective;
}