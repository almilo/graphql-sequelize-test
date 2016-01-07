import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import {graphql} from 'graphql';
import graphqlHttp from 'express-graphql';
import initSchema from './graph/index';

const APPLICATION_PORT = 3000;

initSchema()
    .then(schema => {
        express()
            .use(express.static(path.join(__dirname, '..', 'client')))
            .use(bodyParser.json())
            .use('/graphiql', graphqlHttp({schema, pretty: true, graphiql: true}))
            .post('/api/graphql', graphqlHandler(schema))
            .listen(APPLICATION_PORT, _ => console.log('GraphQL server is now running on port:', APPLICATION_PORT));
    })
    .catch(reason => {
        throw new Error(reason)
    });

function graphqlHandler(schema) {
    return (req, res) => {
        const {query, vars} = req.body;

        graphql(schema, query, null, vars)
            .then(result => res.send(result))
            .catch(errors => res.send(errors));
    }
}
