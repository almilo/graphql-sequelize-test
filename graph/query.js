import {GraphQLObjectType} from 'graphql';
import {
    PersonEntity,
    CustomerEntity,
    AddressEntity
} from '../db/index';
import {
    PersonType,
    CustomerType,
    AddressType
} from './types';
import {collectionOf} from './helpers';

export default new GraphQLObjectType({
    name: 'LimsGraphQuery',
    description: 'Query model for the LIMS system',
    fields: {
        people: collectionOf(PersonType, PersonEntity),
        customers: collectionOf(CustomerType, CustomerEntity),
        addresses: collectionOf(AddressType, AddressEntity)
    }
});
