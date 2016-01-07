import {GraphQLSchema} from 'graphql';
import initDb from '../db/index';
import query from './query';
import mutation from './mutation';

export default _ => initDb().then(_ => new GraphQLSchema({query, mutation}));
