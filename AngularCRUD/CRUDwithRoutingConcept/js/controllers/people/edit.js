"use strict";
(function () {
	angular.module("peopleApp")
		.controller("editPersonCtrl", ["$scope","baseSvc", "peopleService", "$routeParams","$location", 
			function ($scope, baseService,peopleService, $routeParams,$location) {
			debugger;
			var autoCompleteQuery = "/_api/web/siteusers";
			var getdrpdwnQuery = "/_api/web/lists/GetByTitle('EmployeeDetails')/fields?$filter=EntityPropertyName eq 'Department'";
			baseService.getRequest(getdrpdwnQuery)
			   .then(function(response){
			   	  var Dropdownarray = response.data.d.results;
				  if(Dropdownarray.length>0)
				     {
			            $scope.Departments = Dropdownarray[0].Choices.results;
				     }  			   
			   });
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
				peopleService.getById($routeParams.personId)
					.then(function (response) {
					$scope.person = {
						personId : response.data.d.ID,
						firstName: response.data.d.FirstName,
						lastName: response.data.d.LastName,
						address: response.data.d.Address.replace(/<(?:.|\n)*?>/gm, ''),
						contactno: response.data.d.ContactNumber,
						email: response.data.d.Email,
						dept: response.data.d.Department,
						manager: response.data.d.Manager.Title
					};
					$scope.editPerson = function(person){
						peopleService.update(person)
						.then(function(response){
							$location.path("/");
						});
					};
				});
				
	}]);
})();