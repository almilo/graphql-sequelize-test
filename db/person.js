import {Db} from './db';
import {
    emailField,
    stringField
} from './helpers';

export const Person = Db.define('person', {
    salutation: stringField(true),
    firstname: stringField(true),
    lastname: stringField(true),
    role: stringField(),
    fax: stringField(),
    phone: stringField(),
    mobile: stringField(),
    email: emailField()
});
