import {
    PersonEntity,
    AddressEntity,
    CustomerEntity
} from '../db/index';
import {
    typeFrom,
    listOf
} from './helpers';

export const AddressType = typeFrom(AddressEntity);

export const PersonType = typeFrom(
    PersonEntity,
    ['customerId'],
    {
        address: {
            type: AddressType,
            resolve: person => person.getAddress()
        }
    }
);

export const CustomerType = typeFrom(
    CustomerEntity,
    undefined,
    {
        address: {
            type: AddressType,
            resolve: customer => customer.getAddress()
        },
        people: {
            type: listOf(PersonType),
            resolve: customer => customer.getPeople()
        }
    }
);
