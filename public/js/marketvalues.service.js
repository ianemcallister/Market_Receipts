angular
    .module('marketForm')
    .factory('marketValues', marketValues);

marketValues.$inject = ['$log'];

/* @ngInject */
function marketValues($log) {

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
		returnAllValues: returnAllValues,
		returnAllValidations:returnAllValidations
	};

	function returnAllValues() {
		return allValues
	};

	function returnAllValidations() {
		return {
			market: { changed:false, approved:false, changeNotes: '', newValue:''},
			employee:  { changed:false, approved:false, changeNotes: '', newValue:''},
			date:  { changed:false, approved:false, changeNotes: '', newValue:''},
			sales:  { changed:false, approved:false, changeNotes: '', newValue:''},
			rent:  { changed:false, approved:false, changeNotes: '', newValue:''},
			pay:  { changed:false, approved:false, changeNotes: '', newValue:''},
			due:  { changed:false, approved:false, changeNotes: '', newValue:''}
		}
	}
	
	return marketValuesService;

}