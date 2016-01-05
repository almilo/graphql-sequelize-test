import {Db} from './db';
import {
    stringField
} from './helpers';

export const Address = Db.define('address', {
    street: stringField(true),
    city: stringField(true),
    zip: stringField(true),
    country: stringField(true)
});
