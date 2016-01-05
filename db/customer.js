import {Db} from './db';
import {
    stringField
} from './helpers';

export const Customer = Db.define('customer', {
    company: stringField(true),
    department: stringField(true),
    website: stringField(true)
});
