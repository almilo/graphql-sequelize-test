import Sequelize from 'sequelize';
import {
    CustomerSchema,
    PersonSchema,
    AddressSchema
} from './entities';
import dbConfiguration from './db.json';
import createMockData from './mock-data';

export const Db = new Sequelize(
    dbConfiguration.userName,
    dbConfiguration.password,
    dbConfiguration.dbName,
    dbConfiguration.driverConfiguration
);
export const CustomerEntity = Db.define('customer', CustomerSchema);
export const PersonEntity = Db.define('person', PersonSchema);
export const AddressEntity = Db.define('address', AddressSchema);

CustomerEntity.hasOne(AddressEntity);
CustomerEntity.hasMany(PersonEntity);
PersonEntity.hasOne(AddressEntity);

export default _ => Db.sync({force: true}).then(createMockData);
