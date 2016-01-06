import Sequelize from 'sequelize';

export const text = (required = false) => ({
    type: Sequelize.STRING,
    allowNull: !required
});

export const email = (required = false) => ({
    type: Sequelize.STRING,
    allowNull: !required,
    validate: {
        isEmail: true
    }
});
