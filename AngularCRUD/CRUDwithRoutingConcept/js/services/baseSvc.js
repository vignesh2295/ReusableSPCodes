"use strict";
(function () {
    angular.module("peopleApp")
        .factory("baseSvc", ["$http", "$q", function ($http, $q) {
        var baseUrl = _spPageContextInfo.webAbsoluteUrl;
        var getRequest = function (query) {
        debugger;
            var deferred = $q.defer();
            $http({
                url: baseUrl + query,
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                }
            }).then(function (result) {
                deferred.resolve(result);
            },function (result, status) {
                deferred.reject(status);
            });
            return deferred.promise;
        };
        var postRequest = function (data, url) {
            var deferred = $q.defer();
            $http({
                url: baseUrl + url,
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify(data)
            }).then(function (result) {
                deferred.resolve(result);
            },function (result, status) {
                deferred.reject(status);
            });
            return deferred.promise;
        };
        var updateRequest = function (data, url) {
            var deferred = $q.defer();
            $http({
                url: baseUrl + url,
                method: "PATCH",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
                    "content-Type": "application/json;odata=verbose",
                    "X-Http-Method": "PATCH",
                    "If-Match": "*"
                },
                data: JSON.stringify(data)
            }).then(function (result) {
                deferred.resolve(result);
            },function (result, status) {
                deferred.reject(status);
            });
            return deferred.promise;
        };
        var deleteRequest = function(url){
            var deferred = $q.defer();
            $http({
                url: baseUrl + url,
                method: "DELETE",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "X-RequestDigest":document.getElementById("__REQUESTDIGEST").value,
                    "IF-MATCH": "*"
                }
            }).then(function (result) {
                    deferred.resolve(result);
                },function (result, status) {
                    deferred.reject(status);
                });
            return deferred.promise;
        };
        return {
            getRequest: getRequest,
            postRequest: postRequest,
            updateRequest: updateRequest,
            deleteRequest:deleteRequest
        };
    }]);
})();