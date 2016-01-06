import _ from 'lodash';
import {
    resolver,
    defaultListArgs,
    attributeFields
} from 'graphql-sequelize';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} from 'graphql';

export const typeFrom = (entity, excludes = [], fields = {}) => {
    return new GraphQLObjectType({
        name: _.capitalize(entity.name),
        description: `Represents a ${entity.name.toLowerCase()}`,
        fields: fieldsFrom(entity, excludes, fields)
    });
};

export const listOf = (type) => new GraphQLList(type);

export const collectionOf = (type, entity) => ({
    type: listOf(type),
    args: defaultListArgs(),
    resolve: resolver(entity)
});

function fieldsFrom(type, excludes = [], fields = {}) {
    const updateFields = ['createdAt', 'updatedAt'],
        mergedFields = _.merge(
            {},
            attributeFields(type, {exclude: updateFields.concat(excludes)}),
            fields
        );

    _.forEach(mergedFields, (field, fieldName) => {
        field.description = field.description || `The ${fieldName} of a ${type.name}`;
    });

    return mergedFields;
}
