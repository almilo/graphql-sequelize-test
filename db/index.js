import {Db} from './db';
import {createMockData} from './mock-data';

Db.sync({force: true}).then(createMockData);
