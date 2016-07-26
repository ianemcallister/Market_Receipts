angular
    .module('marketForm')
    .directive('inputField', inputField);

inputField.$inject = [];

function inputField () {
	var theDirective = {
		restrict: 'AECM',
		replace: true,
		scope: {
			title: '@',
			suggestion: '@',
			details: '=',
			addressed: '='
		},
		templateUrl: 'directives/inputField/input.directive.htm',
		link: function(scope, elem, attrs) {},
		controllerAs: 'vm',
		controller: inputFieldController,
		bindToController: true
	};

	inputFieldController.$inject = ['$log', '$scope'];

	function inputFieldController($log, $scope) {
		var vm = this;

		var validChangeNotes = false;

		//view variables
		vm.showDetails = false;
		vm.showChangeNotes = false;
		vm.tempInputValue = '';
		vm.tempChaneNotesValue = '';
		vm.validationBtn = {
			text:"OK?",
			classes: {
				"btn-primary":true,
				"btn-warning":false,
				"btn-success":false
			}
		}
		
		//view functions
		vm.approve = function() {
			
			if(vm.tempInputValue == '') {
				//if they didn't change the value, just validate
				
				//update the flag
				vm.addressed.approved = true;

				//console.log('vm.suggestion', vm.suggestion);

				//save the new value
				vm.addressed.newValue = vm.suggestion;

				//change the value
				//$log.info(vm.addressed);

				//change the color
				vm.validationBtn.classes["btn-primary"] = false;
				vm.validationBtn.classes["btn-warning"] = false;
				vm.validationBtn.classes["btn-success"] = true;	

				//update the test
				vm.validationBtn.text = '✓';
							
			} else {
				//if they did change the value, check for notes to support
				//if the change notes are valid
				if(validChangeNotes) {
					//update the flag
					vm.addressed.approved = true;

					//save the new value
					vm.addressed.newValue = vm.tempInputValue;

					//change the value
					$log.info(vm.addressed);

					//change the color
					vm.validationBtn.classes["btn-primary"] = false;
					vm.validationBtn.classes["btn-warning"] = false;
					vm.validationBtn.classes["btn-success"] = true;

					vm.validationBtn.text = '✓';

				} 

			}

		};

		vm.validate = function() {
			if(vm.tempInputValue !== '') {
				//open the notes if necessary
				vm.showChangeNotes = true;
				
				//update the changed value
				vm.addressed.changed = true;

				if(validChangeNotes) {
					vm.validationBtn.classes["btn-primary"] = true;
					vm.validationBtn.classes["btn-warning"] = false;
					vm.validationBtn.classes["btn-success"] = false;					
				} else {
					vm.validationBtn.classes["btn-primary"] = false;
					vm.validationBtn.classes["btn-warning"] = true;
					vm.validationBtn.classes["btn-success"] = false;					
				}
				//make sure the text is correct
				vm.validationBtn.text = 'OK?';

			} else {
				//close the notes
				vm.showChangeNotes = false;
				//market value is not changed
				vm.addressed.changed = false;
				//update the validation button 
				vm.validationBtn.classes["btn-primary"] = true;
				vm.validationBtn.classes["btn-warning"] = false;
				vm.validationBtn.classes["btn-success"] = false;
				//make sure the text is correct
				vm.validationBtn.text = 'OK?';
			}
		};

		vm.saveNotes = function() {
			if(vm.tempInputValue !== '') {
				//save value for later
				vm.addressed.changeNotes = vm.tempChaneNotesValue;
				//if they gave a substantive answer then unlock the button
				if(vm.tempChaneNotesValue.length > 5) {
					//unlock
					validChangeNotes = true;
					//update the validation button 
					vm.validationBtn.classes["btn-primary"] = true;
					vm.validationBtn.classes["btn-warning"] = false;
					vm.validationBtn.classes["btn-success"] = false;
				} else {
					//otherwise lock it
					validChangeNotes = false;
					//update the validation button 
					vm.validationBtn.classes["btn-primary"] = false;
					vm.validationBtn.classes["btn-warning"] = true;
					vm.validationBtn.classes["btn-success"] = false;
				}

			} else {
				//reset to blank
				vm.addressed.changeNotes = '';
			}
		}

		//$log.info('this is the inputFieldController Directive', vm.title, vm.suggestion, vm.details);
	}

	return theDirective;
}