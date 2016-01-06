import {GraphQLObjectType} from 'graphql';
import {
    CustomerEntity,
    PersonEntity,
    AddressEntity
} from '../db/index';
import {
    CustomerType,
    PersonType,
    AddressType
} from './types';
import {
    int,
    text,
    crudOf,
    creationOf
} from './helpers';
import {SchemaFactory} from '../schema/index';

const schemaFactory = new SchemaFactory(text, text);
const AddressSchema = schemaFactory.createAddressSchema();
const CustomerSchema = schemaFactory.createCustomerSchema();
const PersonSchema = schemaFactory.createPersonSchema();

export default new GraphQLObjectType({
    name: 'LimsGraphMutation',
    description: 'Commands to mutate the LIMS system model',
    fields: Object.assign(
        {},
        crudOf(CustomerType, CustomerEntity, CustomerSchema),
        crudOf(PersonType, PersonEntity, PersonSchema),
        crudOf(AddressType, AddressEntity, AddressSchema),
        {
            createCustomerWithAddress: createCustomerWithAddress()
        }
    )
});

function createCustomerWithAddress() {
    const operation = creationOf(
        CustomerType,
        CustomerEntity,
        Object.assign({}, CustomerSchema, AddressSchema),
        'Creation of customer entities with address'
    );

    operation.resolve = (_, args) => {
        return CustomerEntity.create(args).then(customer => {
            return AddressEntity.create(args).then(address => {
                return customer.setAddress(address).then(_ => customer);
            });
        });
    };

    return operation;
}
