
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var leadTypeCombo = {};	// @combobox
	var documentEvent = {};	// @document
	var leadEvent = {};	// @dataSource
// @endregion// @endlock
var calculatedValues = {
	leadTitle: function(){
		if(sources.lead.type == 'buyer'){
//			if(sources.lead.person != null){
//				return this.person.fullName;
//			} else {
				return 'New Buyer Lead';
//			}
		} else {
//			if(this.listing != null){
//				return this.listing.name;
//			} else {
				return 'New Seller Lead';
//			}
		}
	},
	anotherValue: function(){
		return "hello";
	}
}
var calculateAll = function(){
	//viewValues is a local datasource object variable
	for(value in calculatedValues){
		viewValues[value] = calculatedValues[value]();
	}
	sources.viewValues.sync();
	sources.viewValues.autoDispatch();
}
var updateLeadType = function(){
	if(sources.lead.type != null){
		console.log('updateLeadType: ' + 'type = ' + sources.lead.type);
		if(leadTypeIconFile != ''){
			leadTypeIconFile = '/images/icons/' + sources.lead.type + '.png';
			$$('leadTypeCombo').setValue(sources.lead.type);
		} else {
			leadTypeIconFile = '/images/icons/seller.png';
			$$('leadTypeCombo').setValue('seller');
		}
		sources.lead.autoDispatch();
		calculateAll();
		sources.leadTypeIconFile.sync();
	}
}

// eventHandlers// @lock

	leadTypeCombo.onmouseup = function leadTypeCombo_onmouseup (event)// @startlock
	{// @endlock
		
	};// @lock

	leadTypeCombo.change = function leadTypeCombo_change (event)// @startlock
	{// @endlock
		if(sources.lead.type != $$('leadTypeCombo').getValue() && sources.lead.type != null && $$('leadTypeCombo')._currentState == 'active'){
			console.log('leadTypeCombo.onmouseup: ' + 'type = ' + sources.lead.type + ', combo = ' + $$('leadTypeCombo').getValue());
			sources.lead.type = $$('leadTypeCombo').getValue();
			updateLeadType();
		}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock

		sources.lead.all({
			onSuccess: function(event){
				console.log('Leads loaded');
				updateLeadType();
				
			},
			onError: function(event){
				alert("Cannot contact remote server");
			}
		});
	};// @lock

	leadEvent.ontypeAttributeChange = function leadEvent_ontypeAttributeChange (event)// @startlock
	{// @endlock
		updateLeadType();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("leadTypeCombo", "onmouseup", leadTypeCombo.onmouseup, "WAF");
	WAF.addListener("leadTypeCombo", "change", leadTypeCombo.change, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("lead", "ontypeAttributeChange", leadEvent.ontypeAttributeChange, "WAF", "type");
	WAF.addListener("lead", "onleadTypeAttributeChange", leadEvent.onleadTypeAttributeChange, "WAF", "leadType");
// @endregion
};// @endlock
