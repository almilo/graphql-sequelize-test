import {
    text,
    email
} from './helpers';

export const AddressSchema = {
    street: text(true),
    city: text(true),
    zip: text(true),
    country: text(true)
};

export const CustomerSchema = {
    company: text(true),
    department: text(true),
    website: text(true)
};

export const PersonSchema = {
    salutation: text(true),
    firstname: text(true),
    lastname: text(true),
    role: text(),
    fax: text(),
    phone: text(),
    mobile: text(),
    email: email()
};
