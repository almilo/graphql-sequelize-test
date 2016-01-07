import _ from 'lodash';
import Faker from 'faker';
import {
    PersonEntity,
    AddressEntity,
    CustomerEntity
} from './index';

export default function createMockData() {
    return Promise.all([
        Promise.all(_.times(10, createMockAddress)),
        Promise.all(_.times(10, createMockPerson)),
        Promise.all(_.times(10, createMockCustomer))
    ]).then(([addresses, people, customers]) => setRelations(addresses, people, customers));

    function setRelations(addresses, people, customers) {
        const allOperations = people
            .map(assignAddressToPersonAndPersonToCustomer)
            .concat(customers.map(assignAddressToCustomer));

        return Promise.all(allOperations);

        function assignAddressToPersonAndPersonToCustomer(person) {
            return person.setAddress(random(addresses)).then(_ => {
                random(customers).addPerson(person);

                return person;
            });
        }

        function assignAddressToCustomer(customer) {
            return customer.setAddress(random(addresses)).then(_ => customer);
        }
    }

    function createMockPerson() {
        return PersonEntity.create({
            salutation: Faker.name.prefix(),
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
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
