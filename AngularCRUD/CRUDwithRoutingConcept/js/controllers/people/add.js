"use strict";
(function () {
	angular.module("peopleApp")
		.controller("addPersonCtrl", ["$scope","baseSvc","peopleService","$location", function ($scope,baseService,peopleService,$location) {
		debugger;
		var autoCompleteQuery = "/_api/web/siteusers";
		baseService.getRequest(autoCompleteQuery)
				   .then(function(response){
				   		var Titlearray = response.data.d.results;
				   		var userTitleList = new Array();
				   		if(Titlearray.length>0)
						{
							for(var i=0;i<Titlearray.length;i++)
							{
								userTitleList.push(Titlearray[i].Title+"-"+Titlearray[i].Id);			  		   		
							}
						}
						 $('#EmpManager').autocomplete({
							minLength: 1,
							source:userTitleList
						});	
				   });
		var getdrpdwnQuery = "/_api/web/lists/GetByTitle('EmployeeDetails')/fields?$filter=EntityPropertyName eq 'Department'";
		baseService.getRequest(getdrpdwnQuery)
			   .then(function(response){
			   	  var Dropdownarray = response.data.d.results;
				  if(Dropdownarray.length>0)
			     {
			            $scope.Departments = Dropdownarray[0].Choices.results;
			     }  			   
			   });
		$scope.addPerson = function (person) {
		debugger;
			peopleService.addNew(person)
			.then(function(response){
				console.log(response);
				$location.path("/");
			});
			
		};
	}]);
})();