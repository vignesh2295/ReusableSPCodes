"use strict";
(function () {
	angular.module("peopleApp")
		.controller("allPeopleCtrl", ["$scope", "peopleService","$filter",
		function ($scope, peopleService,$filter) {
		debugger;
			peopleService.getAll()
				.then(function (response) {
				response.data.d.results.forEach(function(customer) {
		            customer["Address"] = customer["Address"].replace(/<(?:.|\n)*?>/gm, '');
		        });
                $scope.people = response.data.d.results;
                $scope.rowLimit = 3; 
                $scope.currentPage = 0;
                $scope.searchText = '';
				$scope.sortColumn = "Modified";
	            $scope.reverseSort = false;
	
	            $scope.sortData = function (column) {
	                $scope.reverseSort = ($scope.sortColumn == column) ?
	                    !$scope.reverseSort : false;
	                $scope.sortColumn = column;
	            }
	
	            $scope.getSortClass = function (column) {
	
	                if ($scope.sortColumn == column) {
	                    return $scope.reverseSort
	                      ? 'arrow-down'
	                      : 'arrow-up';
	                }
	
	                return '';
	            }
	            $scope.getData = function () {
			      return $filter('filter')($scope.people, $scope.searchText)
			    }
			    $scope.numberOfPages=function(){
			        return Math.ceil($scope.getData().length/$scope.rowLimit);                
			    }
            });
			$scope.removePerson = function(person){
				peopleService.remove(person.ID)
				.then(function(response){
					var personIndex = $scope.people.indexOf(person);
					$scope.people.splice(personIndex,1);
				});
			};
		}])
		.filter('startFrom', function() {
		    return function(input, start) {
		        start = +start; //parse to int
		        return input.slice(start);
		    }
		});
})();