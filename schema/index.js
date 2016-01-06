export class SchemaFactory {
    constructor(text, email) {
        this.text = text;
        this.email = email;
    }

    createAddressSchema() {
        return {
            street: this.text(true),
            city: this.text(true),
            zip: this.text(true),
            country: this.text(true)
        };
    }

    createCustomerSchema() {
        return {
            company: this.text(true),
            department: this.text(true),
            website: this.text(true)
        };
    }

    createPersonSchema() {
        return {
            salutation: this.text(true),
            firstName: this.text(true),
            lastName: this.text(true),
            role: this.text(),
            fax: this.text(),
            phone: this.text(),
            mobile: this.text(),
            email: this.email()
        };
    }
}
