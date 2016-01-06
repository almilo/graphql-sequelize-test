import {GraphQLObjectType} from 'graphql';
import {
    PersonEntity,
    CustomerEntity
} from '../db/index';
import {
    PersonType,
    CustomerType
} from './types';
import {collectionOf} from './helpers';

export default new GraphQLObjectType({
    name: 'LimsGraph',
    fields: {
        people: collectionOf(PersonType, PersonEntity),
        customers: collectionOf(CustomerType, CustomerEntity)
    }
});
