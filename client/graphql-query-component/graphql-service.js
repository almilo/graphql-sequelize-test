import {
    buildClientSchema,
    introspectionQuery
} from 'graphql/utilities';

export default function ($http, $q) {
    return {
        getClientSchema,
        executeQuery
    };

    function getClientSchema() {
        return executeQuery(introspectionQuery).then(schema => buildClientSchema(schema));
    }

    function executeQuery(query, variables) {
        const data = {
                query: query || '{}',
                variables: variables || '{}'
            },
            config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };

        return $http.post('api/graphql', data, config).then(extractResult);

        function extractResult(response) {
            return response.data.errors ? $q.reject(response.data.errors) : response.data.data;
        }
    }
}
