angular
    .module('marketForm')
    .directive('imageUpload', imageUpload);

imageUpload.$inject = [];

function imageUpload () {
	var theDirective = {
		restrict: 'AECM',
		replace: true,
		templateUrl: 'directives/imageRow/image.directive.htm',
		link: function(scope, elem, attrs) {},
		controller: imageUploadController,
		bindToController: true
	};

	imageUploadController.$inject = ['$log'];

	function imageUploadController($log) {
		var vm = this;

		$log.info('this is the imageUploadController Directive', vm.data);
	}

	return theDirective;
}