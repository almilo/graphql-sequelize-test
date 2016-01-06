import {
    text,
    email
} from './helpers';
import {SchemaFactory} from '../schema/index';

const schemaFactory = new SchemaFactory(text, email);

export const AddressSchema = schemaFactory.createAddressSchema();
export const CustomerSchema = schemaFactory.createCustomerSchema();
export const PersonSchema = schemaFactory.createPersonSchema();