import './css/index.css';
import angular from 'angular';
import graphqlQueryComponent from './component';
import graphqlServiceFactory from './graphql-service';

export default angular.module('graphql-query-component', ['ui.codemirror'])
    .factory('graphqlService', graphqlServiceFactory)
    .component('graphqlQueryComponent', graphqlQueryComponent);
