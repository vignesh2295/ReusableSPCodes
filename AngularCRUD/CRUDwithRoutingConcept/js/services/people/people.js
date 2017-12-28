"use strict";
(function(){
	angular.module("peopleApp")
	.factory("peopleService",["baseSvc",function(baseService){
		var listEndPoint = '/_api/web/lists';
		var getAll = function(){
		debugger;
			var query = listEndPoint + "/GetByTitle('EmployeeDetails')/Items?$select=ID,FirstName,LastName,Address,ContactNumber,Email,Department,Manager/Title,Modified&$expand=Manager";
			return baseService.getRequest(query);
		};
		var addNew = function(person){
			var data = {
				__metadata: { 'type': 'SP.Data.EmployeeDetailsListItem' },
				FirstName : person.firstName,
				LastName : person.lastName,
				Address : person.address,
				ContactNumber : person.contactno,
				Email : person.email,
				Department : person.dept,
				ManagerId : person.manager.split("-")[1]
			};
			var url = listEndPoint + "/GetByTitle('EmployeeDetails')/Items";
			return baseService.postRequest(data,url);
		};
		var getById = function(personId){
			var query = listEndPoint + "/GetByTitle('EmployeeDetails')/Items("+personId+")?$select=ID,FirstName,LastName,Address,ContactNumber,Email,Department,Manager/Title&$expand=Manager";
			return baseService.getRequest(query);
		};
		var update = function (person){
			var data = {
				__metadata: { 'type': 'SP.Data.EmployeeDetailsListItem' },
				FirstName : person.firstName,
				LastName : person.lastName,
				Address : person.address,
				ContactNumber : person.contactno,
				Email : person.email,
				Department : person.dept,
				ManagerId : person.manager.split("-")[1]
			};
			var url = listEndPoint + "/GetByTitle('EmployeeDetails')/GetItemById("+person.personId+")";
			return baseService.updateRequest(data,url);
		};
		var remove = function(personId){
			var url = listEndPoint + "/GetByTitle('EmployeeDetails')/GetItemById("+personId+")";
			return baseService.deleteRequest(url);
		};
		return{
			getAll:getAll,
			addNew:addNew,
			getById:getById,
			update:update,
			remove:remove
		};
	}]);
})();