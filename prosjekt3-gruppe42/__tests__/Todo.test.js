import React from "react";
import {todos} from '../__mocks__/mock_todos';
import { haversine, toRadians } from "../functions";
import ToDoTitle from '../Components/ToDo/ToDoTitle';
import ToDoContent from '../Components/ToDo/ToDoContent';
import renderer from 'react-test-renderer';

describe("Test ToDoTitle component", ()=> {
    const tree = renderer.create(<ToDoTitle data={todos[0]} />);
    const tree2 = renderer.create(<ToDoTitle data={todos[4]} />);
    test("ToDoTitle snapshot test", () => {

        expect(tree).toMatchSnapshot();
    })

    test("Todo title should be in ToDoTitle", ()=> {
        expect(tree.toJSON().children[0]).toBe(todos[0].title);
    });

    test("Todo date should match date in ToDoTitle", ()=> {
        expect(tree.toJSON().children[3]).toEqual(expect.stringMatching(/[0-9]+.\s\w+\s\([0-9]{4}\)/))
    });

    test("Todo completed status should match in ToDoTitle", ()=> {
        expect(tree.toJSON().children[5]).toBe(" ");
        expect(tree2.toJSON().children[5]).not.toBe(" ");

    })
})

describe("Test ToDoContent component", ()=> {
    const tree = renderer.create(<ToDoContent data={todos[0]} currentLocation={{latitude:10, longitude:10}} />);
    test("Todo description should match description in ToDoContent ", ()=>{
        expect(tree.toJSON().children[1].children[0]).toBe(todos[0].description);
        // console.log(tree.toJSON().children[1].children[0])
    })

    test("ToDoContent distance should match distance between currentLocation and todo-location", ()=> {
        let p = /\d+/;
        let distance = p.exec(tree.toJSON().children[0].children[0])[0];
        expect(distance).toBe(String(Math.round((haversine(todos[0].location[0], {latitude:10, longitude:10}))/1000)))
    })
})
