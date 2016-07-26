angular
    .module('marketForm')
    .directive('submitBtn', submitBtn);

submitBtn.$inject = [];

function submitBtn () {
	var theDirective = {
		restrict: 'AECM',
		replace: true,
		scope: {
			state: '=',
			submit: '='
		},
		controllerAs: 'vm',
		templateUrl: 'directives/submitBtn/submitBtn.directive.htm',
		link: function(scope, elem, attrs) {
		},
		controller: submitBtnController,
		bindToController: true
	};

	submitBtnController.$inject = ['$log'];

	function submitBtnController($log) {
		var vm = this;
		
		$log.info('this is the submitBtn Directive', vm);

		//view methods
		vm.clickSubmit = function() {
			console.log('clicking the button');
			vm.submit = true;
		}
	};


	return theDirective;
}