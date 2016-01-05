import {Db} from './db';
import {Address} from './address';
import {Person} from './person';
import {Customer} from './customer';
import {createMockData} from './mock-data';

Address.belongsToMany(Person, {through: 'address_person'});
Address.belongsToMany(Customer, {through: 'address_customer'});
Person.belongsTo(Customer);

Db.sync({force: true}).then(createMockData);
