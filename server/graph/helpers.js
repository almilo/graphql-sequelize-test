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

export const collectionOf = (type, entity, findById = true) => {
    const args = findById ? _.merge({}, {id: id()}, defaultListArgs()) : defaultListArgs();

    return {
        type: listOf(type),
        args,
        resolve: resolver(entity)
    }
};

export const id = () => ({type: GraphQLInt});

export const int = (required = false) => ({
    type: required ? new GraphQLNonNull(GraphQLInt) : GraphQLInt
});

export const text = (required = false) => ({
    type: required ? new GraphQLNonNull(GraphQLString) : GraphQLString
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

export const creationOf = (type, entity, args, description) => ({
    type,
    args,
    description: description || `Creation of ${entity.name} entities`,
    resolve: (_, args) => entity.create(args)
});

export const modificationOf = (type, entity, args, description) => ({
    type,
    args,
    description: description || `Modification of ${entity.name} entities`,
    resolve: (_, args) => entity.update(args)
});

export const deletionOf = (type, entity, args, description) => ({
    type,
    args,
    description: description || `Deletion of ${entity.name} entities`,
    resolve: (_, args) => entity.findById(args.id).then(instance => instance.destroy().then(_ => instance))
});

export const crudOf = (type, entity, schema) => {
    const crudOperations = {};

    crudOperations[`create${type.name}`] = creationOf(type, entity, schema);
    crudOperations[`update${type.name}`] = modificationOf(type, entity, schema);
    crudOperations[`delete${type.name}`] = deletionOf(type, entity, {id: int(true)});

    return crudOperations;
};
