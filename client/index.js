angular.module('graphql', [])
    .factory('graphqlService', graphqlServiceFactory)
    .controller('queryController', queryControllerFactory);

function graphqlServiceFactory($http, $q) {
    return function (query, vars) {
        var data = {
                query: query || '{}',
                vars: vars || {}
            },
            config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };

        return $http.post('api/graphql', data, config).then(extractData);

        function extractData(response) {
            if (response.data.errors) {
                return $q.reject(response.data.errors);
            }

            return response.data.data;
        }
    }
}

function queryControllerFactory($scope, graphqlService) {
    $scope.model = {
        query: '{}',
        vars: '{}',
        result: undefined
    };

    $scope.sendQuery = function (query, vars) {
        graphqlService(query, vars && JSON.parse(vars))
            .then(mapDataToResult)
            .catch(mapErrorsToResult);

        function mapDataToResult(data) {
            $scope.model.result = data;
        }

        function mapErrorsToResult(errors) {
            $scope.model.result = errors;
        }
    }
}
