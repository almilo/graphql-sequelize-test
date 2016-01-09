import './index.css';
import 'expose?jQuery!jquery';
import angular from 'angular';
import graphqlQueryComponent from './graphql-query-component/index';

angular.module('graphql', [graphqlQueryComponent.name]);