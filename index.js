import Express from 'express';
import GraphQLHTTP from 'express-graphql';
import initSchema from './graph/index';

const APPLICATION_PORT = 3000;

initSchema()
    .then(Schema => {
        Express()
            .use('/graphql', GraphQLHTTP({
                schema: Schema,
                pretty: true,
                graphiql: true
            }))
            .listen(APPLICATION_PORT, _ => console.log('GraphQL server is now running on port:', APPLICATION_PORT));
    })
    .catch(reason => {
        throw new Error(reason)
    });
