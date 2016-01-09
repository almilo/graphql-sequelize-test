import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import graphqlHttp from 'express-graphql';
import initSchema from './graph/index';

const APPLICATION_PORT = 3000;

initSchema()
    .then(schema => {
        express()
            .use(express.static(path.join(__dirname, '..', 'dist')))
            .use(bodyParser.json())
            .use('/api/graphql', graphqlHttp({schema, pretty: true, graphiql: true}))
            .listen(APPLICATION_PORT, _ => console.log('GraphQL server is now running on port:', APPLICATION_PORT));
    })
    .catch(reason => {
        throw new Error(reason)
    });
