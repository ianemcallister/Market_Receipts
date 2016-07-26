angular
    .module('marketForm')
    .directive('rent', rent);

rent.$inject = [];

function rent () {
	var theDirective = {
		restrict: 'AECM',
		replace: true,
		scope: {
			data: '=',
			addressed: '='
		},
		controllerAs: 'vm',
		templateUrl: 'views/directives/rentRow/rent.directive.htm',
		link: function(scope, elem, attrs) {},
		controller: rentController,
		bindToController: true
	};

	rentController.$inject = ['$log'];

	function rentController($log) {
		var vm = this;

		//$log.info('this is the rentController Directive', vm.data);
	}

	return theDirective;
}