import _ from 'lodash';
import Faker from 'faker';
import {Person} from './person';
import {Address} from './address';
import {Customer} from './customer';

export function createMockData() {
    Promise.all(_.times(10, createMockAddress)).then(addresses => {
        Promise.all(_.times(10, createMockPerson)).then(people => {
            Promise.all(_.times(10, createMockCustomer)).then(customers => {
                people.forEach(person => {
                    person.setCustomer(random(customers));

                    const address = random(addresses);
                    if (address) {
                        address.addPerson(person);
                    }
                });

                customers.forEach(customer => {
                    const address = random(addresses);
                    if (address) {
                        address.addCustomer(customer);
                    }
                });
            });
        });
    }).catch(reason => {
        throw new Error(reason);
    });

    function createMockPerson() {
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

    function createMockAddress() {
        return Address.create({
            street: Faker.address.streetAddress(),
            city: Faker.address.city(),
            zip: Faker.address.zipCode(),
            country: Faker.address.country()
        });
    }

    function createMockCustomer() {
        return Customer.create({
            company: Faker.company.companyName(),
            department: Faker.company.bs(),
            website: Faker.internet.url()
        });
    }

    function random(collection) {
        const index = Math.floor(Math.random() * collection.length);

        return collection[index] || null;
    }
}
