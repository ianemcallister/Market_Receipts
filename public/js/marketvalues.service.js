angular
    .module('marketForm')
    .factory('marketValues', marketValues);

marketValues.$inject = ['$log', '$http'];

/* @ngInject */
function marketValues($log, $http) {

	var allValues = {
		market: {
			approvedValue: '',
			changed: false,
			changeNotes: '',
			suggestion: 'Bixby Park - Tuesday',
			details: ["This report was prepared specifically for this market."]
		},
		employee: {
			approvedValue: '',
			changed: false,
			changeNotes: '',
			suggestion: 'Kevin Luna',
			details: ["Kevin was scheduled to work this market."]
		},
		date: {
			approvedValue: '',
			changed: false,
			changeNotes: '',
			suggestion: '7/26/16',
			details: ["This report was generated on 7/26/16 for this market on 7/26/16."]
		},
		sales: {
			approvedValue: '',
			changed: false,
			changeNotes: '',
			suggestion: '$635.00',
			details: [
				"Gross Sales:",
				"Total Discounts:",
				"Net Sales:"
			]
		},
		rent: {
			approvedValue: '',
			changed: false,
			changeNotes: '',
			suggestion: '$64.00',
			details: [
				"Gross Sales:",
				"Market Percentage:",
				"Percentage Fee:",
				"Flat Fee:",
				"Total Market Rent:"
			]
		},
		pay: {
			approvedValue: '',
			changed: false,
			changeNotes: '',
			suggestion: '$127.00', 
			details: [
				"Total Market Hours (10:00 AM - 2:00 PM): 4 hrs",
				"Hourly Guaranteed Rate: $10/hr",
				"Hourly Guaranteed Subtotal: $40.00",
				"Commission Rate: 20%",
				"Commission Subtotal: $127.00",
				"Commission ($127.00) > Hourly ($40.00)",
				"Pay From Guarantee: $40.00",
				"Pay From Commission: $87.00",
				"Total Pay: $127.00"
			]
		},
		due: {
			approvedValue: '',
			changed: false,
			changeNotes: '',
			suggestion: '$444.00',
			details: [
				"Net Sales: $635.00",
				"Market Fee: -$64.00",
				"Employee Pay: -$127.00",
				"Total Due To Ah-Nuts: $444.00"
			]
		}
	};

	var marketValuesService = {
		_get:_get,
		_post:_post,
		submitReceipt:submitReceipt,
		returnAllValues: returnAllValues,
		returnSuggestions:returnSuggestions,
		returnAllValidations:returnAllValidations
	};

	function _get(url) {
		return new Promise(function(resolve, reject) {

			$http({
				method: 'GET',
				url: url
			}).then(function successCallback(response) {
				
				resolve(response.data);
				
			}, function errorCallback(error) {
				reject(error);
			});

		});
	}

	function _post(data) {
		$log.info('got this in _post', data);

		return new Promise(function(resolve, reject) {

			var result = $http.post('/api/submitForm/marketReceipt', data)
			.then(function successCallback(response) {
				console.log('got this response', response);
				resolve('success');
			}, function errorCallback(error) {
				console.log('got this error', error);
				resolve('error');
			});

		});
	}

	function returnAllValues() {
		return allValues
	};

	function returnSuggestions(params) {
		console.log('got these params', params);

		return new Promise(function(resolve, reject) {
			_get('/api/getData/' + params.location + "/" + params.date).then(function(result) {
				console.log('result', result);
				resolve(result);
			}).catch(function(e) {
				console.log("error:", e);
			});
		})
	}

	function returnAllValidations() {
		return {
			market: { changed:false, approved:false, changeNotes: '', newValue:''},
			employee:  { changed:false, approved:false, changeNotes: '', newValue:''},
			date:  { changed:false, approved:false, changeNotes: '', newValue:''},
			sales:  { changed:false, approved:false, changeNotes: '', newValue:''},
			till:  { changed:false, approved:false, changeNotes: '', newValue:''},
			rent:  { changed:false, approved:false, changeNotes: '', newValue:''},
			pay:  { changed:false, approved:false, changeNotes: '', newValue:''},
			bank:  { changed:false, approved:false, changeNotes: '', newValue:''},
			due:  { changed:false, approved:false, changeNotes: '', newValue:''}
		}
	}

	function submitReceipt(data) {
		var service = this;
		//notify the user
		$log.info('got this', data);

		
		return new Promise(function(resolve, reject) {

			//submit form
			service._post(data).then(function(response) {
				//notify the user
				//console.log('response:', response);
				//when success is achieved redirect
				resolve(response);
			}).catch(function(err) {
				//console.log('Error:', err);
				reject(err);
			});

		});
	}
	
	return marketValuesService;

}