// MODULE
var marketForm = angular.module('marketForm', []);

// CONTROLLERS
marketForm.controller('mainController', ['$scope', 'marketValues', function ($scope, marketValues) {

	//view variables
	$scope.allData = marketValues.returnAllValues();
	$scope.validations = marketValues.returnAllValidations();
    $scope.submitNow = false;
    $scope.submitBtn = {
        classes: {
            'btn-success':false,
            'btn-warning':true
        }
    };

	//watcher
    $scope.$watch('validations', function(newVal, oldVal) {
    	
    	//add approved changes to the model
    	updateDataModel(newVal, oldVal);

    	//check all validations
    	if(everythingValid()) {
    		//unlock the submit button
            $scope.submitBtn.classes['btn-success'] = true;
            $scope.submitBtn.classes['btn-warning'] = false;
    		//notify the user
            //console.log('returned true');

    	} else {
    		//lock the submit button
            $scope.submitBtn.classes['btn-success'] = false;
            $scope.submitBtn.classes['btn-warning'] = true;
            //notify the user
    		//console.log('returned false');
    	}

    }, true);

    $scope.$watch('submitNow', function(newVal, oldVal) {
        validateSubmission(newVal, oldVal);
    }, true);

    //functions
    function findUpdatedField(newVal, oldVal) {
    	var returnField = '';

    	//loop through all objects
    	Object.keys(newVal).forEach(function(key) {
    		var newField = newVal[key].approved;
    		var oldField = oldVal[key].approved;
    		if(newField !== oldField) returnField = key;
    	});

    	return returnField;
    }

    function updateDataModel(newVal, oldVal) {

    	//figure out which record changed
    	var updateField = findUpdatedField(newVal, oldVal);
    	
    	if(updateField !== '') {

            console.log(newVal[updateField]);
	    	//if the suggestion was changed
	    	if(newVal[updateField].changed) {
	    		//save the new value
	    		$scope.allData[updateField].approvedValue = newVal[updateField].newValue;
	    		//save the notes
	    		$scope.allData[updateField].changeNotes = newVal[updateField].changeNotes;
                //throw the flag
                $scope.allData[updateField].changed = true;
	    	} else {
	    		//just save the suggested value
	    		$scope.allData[updateField].approvedValue = $scope.allData[updateField].suggestion;
	    	}
	    	
    	}
    	
    }	

    function everythingValid() {
    	var allValid = true;
    	Object.keys($scope.validations).forEach(function(field) {
    		//console.log($scope.validations[field]);
    		var isValid = $scope.validations[field].approved;
    		if(!isValid) allValid = false;
    	});
    	return allValid;
    };

    function validateSubmission(newVal, oldVal) {
        //make sure there was a change
        if(newVal !== oldVal) {

            //make sure everything is unlocked
            if($scope.submitBtn.classes['btn-success']) {

                console.log('submitting the form', $scope.allData);
            }

        }

    }

}]);



