"use strict";
(function () {
debugger;
	angular.module("peopleApp", ["ngRoute"])
		.config(["$routeProvider","$locationProvider", function ($routeProvider,$locationProvider) {
		 $locationProvider.hashPrefix('');
		$routeProvider.when("/", {
			templateUrl: "../SiteAssets/New_Folder/Angular - 1st/templates/people/all.html",
			controller: "allPeopleCtrl"
		}).when("/addPerson", {
			templateUrl: "../SiteAssets/New_Folder/Angular - 1st/templates/people/add.html",
			controller: "addPersonCtrl"
		}).when("/editPerson/:personId", {
			templateUrl: "../SiteAssets/New_Folder/Angular - 1st/templates/people/edit.html",
			controller: "editPersonCtrl"
		});
		//$locationProvider.html5Mode(true);
	}]);
})();