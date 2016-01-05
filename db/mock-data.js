import _ from 'lodash';
import Faker from 'faker';
import {Person} from './person';
import {Address} from './address';
import {Customer} from './customer';

export function createMockData() {
    _.times(10, _ => person());
    _.times(10, _ => address());
    _.times(10, _ => customer());

    function person() {
        return Person.create({
            salutation: Faker.name.prefix(),
            firstname: Faker.name.firstName(),
            lastname: Faker.name.lastName(),
            role: Faker.name.jobDescriptor(),
            fax: Faker.phone.phoneNumberFormat(),
            phone: Faker.phone.phoneNumberFormat(),
            mobile: Faker.phone.phoneNumberFormat(),
            email: Faker.internet.email()
        });
    }

    function address() {
        return Address.create({
            street: Faker.address.streetAddress(),
            city: Faker.address.city(),
            zip: Faker.address.zipCode(),
            country: Faker.address.country()
        });
    }

    function customer() {
        return Customer.create({
            company: Faker.company.companyName(),
            department: Faker.company.bs(),
            website: Faker.internet.url()
        });
    }
}
