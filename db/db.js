import Sequelize from 'sequelize';

const USERNAME = 'lims',
    PASSWORD = 'lims',
    DB = 'lims',
    CONFIGURATION = {
        dialect: 'postgres',
        host: 'localhost'
    };

export const Db = new Sequelize(
    USERNAME,
    PASSWORD,
    DB,
    CONFIGURATION
);
