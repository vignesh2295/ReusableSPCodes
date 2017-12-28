/// <reference path="../SiteAssets/New_Folder/angular.js" />

var listName = "AngularCRUD";
var spApp = angular
                .module("spApp", [])
                .controller("viewItemsController", function ($scope, $http,$log) {
                debugger;
                    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+ listName +"')/items?$select=Name,Age,Gender,Salary,ID";
                    $http(
                    {
                        method: "GET",
                        url: url,
                        headers: { "accept": "application/json;odata=verbose" }
                    }
                    ).then(function (response, status, headers, config) {
                        $scope.employees = response.data.d.results;
                        $log.info(response);
                    },function (reason, status, headers, config) {
                    
                    });                    
                })

                .controller("addItemsController", function ($scope, $http) {
                    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+ listName +"')/items";
                    var vm = $scope;
                    vm.addEmployee = function () {
                    debugger;
                        return $http({
                            headers: { "Accept": "application/json; odata=verbose", "X-RequestDigest": jQuery("#__REQUESTDIGEST").val() },
                            method: "POST",
                            url: url,
                            data: {
                                'Name': vm.name,
                                'Age': vm.age,
                                'Gender': vm.gender,
                                'Salary': vm.salary
                            }
                        })
                        .then(saveEmployee)
                        .catch(function (message) {
                            console.log("addEmployee() error: " + message);
                        });
                        function saveEmployee(data, status, headers, config) {
                            alert("Item Added Successfully");
                            vm.name = "";
                            vm.age = "";
                            vm.gender = "";
                            vm.salary = "";
                        }
                    }
                })

                .controller("editItemsController", function ($scope, $http) {
                    debugger;
                    var vm = $scope;                    
                    vm.editEmployee = function () {
                     debugger;
                        var data = {
                            '__metadata': {
                                'type': 'SP.Data.'+ listName +'ListItem'
                            },
                            'Name': vm.name,
                            'Age': vm.age,
                            'Gender': vm.gender,
                            'Salary': vm.salary
                        };
                        return $http({
                            headers: {
                                "Accept": "application/json; odata=verbose",
                                "Content-Type": "application/json; odata=verbose",
                                "X-HTTP-Method": "MERGE",
                                "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
                                "Content-Length": data.length,
                                'IF-MATCH': "*"
                            },
                            method: "POST",
                            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+ listName +"')/items(" + vm.itemId + ")",
                            data: data
                        })
                        .then(saveEmployee)
                        .catch(function (message) {
                            console.log("editEmployee() error: " + message);
                        });
                        function saveEmployee(data, status, headers, config) {
                            alert("Item Edited Successfully");
                            return data.data.d;
                        }
                    }
                })

                .controller("delItemsController", function ($scope, $http) {
                    
                    var vm = $scope;                    

                    vm.delEmployee = function () {
                        return $http({
                            headers: {
                                "X-HTTP-Method": "DELETE",
                                "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
                                'IF-MATCH': "*"
                            },
                            method: "POST",
                            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+ listName +"')/items(" + vm.itemId + ")"
                        })
                        .then(saveEmployee)
                        .catch(function (message) {
                            console.log("delEmployee() error: " + message);
                        });
                        function saveEmployee(data, status, headers, config) {
                            alert("Item Deleted Successfully");
                            return data.data.d;
                        }
                    }
                });
                
