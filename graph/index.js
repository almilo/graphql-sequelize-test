import {GraphQLSchema} from 'graphql';
import initDb from '../db/index';
import query from './query';

export default _ => initDb().then(_ => new GraphQLSchema({query}));
