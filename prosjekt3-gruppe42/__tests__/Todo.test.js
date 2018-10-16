import React from "react";
import {todos} from '../__mocks__/mock_todos';
import ToDo from '../__mocks__/__alt__ToDo';
import renderer from 'react-test-renderer';

// jest.mock('react-native-paper/Surface', () => {
//     const React = require('react');
//     // const View = require('react')
//     const Surface = props => React.crateElement('View', props, props.children);
//     return Surface;
// })


// describe("Test snapshot of todos", () => {
//     const navigation = {navigate: jest.fn()};
//     test("something", () => {
//         expect(renderer.create(
//             <ToDo
//                 data = {todos[0]}
//                 navigation = {navigation}
//                 currentLocation = {{latitude: 10, longitude: 10}} />
//         )).toMatchSnapshot();
//     })
// });
