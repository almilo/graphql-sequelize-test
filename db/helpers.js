import Sequelize from 'sequelize';

export const stringField = (required = false) => ({
    type: Sequelize.STRING,
    allowNull: !required
});

export const emailField = (required = false) => ({
    type: Sequelize.STRING,
    allowNull: !required,
    validate: {
        isEmail: true
    }
});
