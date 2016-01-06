import _ from 'lodash';
import Faker from 'faker';
import {
    PersonEntity,
    AddressEntity,
    CustomerEntity
} from './index';

export default function createMockData() {
    return Promise.all(_.times(10, createMockAddress)).then(addresses => {
            return Promise.all(_.times(10, createMockPerson)).then(people => {
                    return Promise.all(_.times(10, createMockCustomer)).then(customers => setRelations(customers, people, addresses));
                }
            );
        });

    function setRelations(customers, people, addresses) {
        return Promise.all(people.map(person => {
            return person.setAddress(random(addresses)).then(_ => random(customers).addPerson(person));
        })).then(_ => Promise.all(customers.map(customer => customer.setAddress(random(addresses)))));
    }

    function createMockPerson() {
        return PersonEntity.create({
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

    function createMockAddress() {
        return AddressEntity.create({
            street: Faker.address.streetAddress(),
            city: Faker.address.city(),
            zip: Faker.address.zipCode(),
            country: Faker.address.country()
        });
    }

    function createMockCustomer() {
        return CustomerEntity.create({
            company: Faker.company.companyName(),
            department: Faker.company.bs(),
            website: Faker.internet.url()
        });
    }

    function random(collection) {
        const index = Math.floor(Math.random() * (collection.length - 1));

        return collection[index];
    }
}
