import React from "react";
import {todos} from '../__mocks__/mock_todos';
import { haversine, toRadians } from "../functions";
import ToDoTitle from '../Components/ToDo/ToDoTitle';
import ToDoContent from '../Components/ToDo/ToDoContent';
import ToDoEdit from '../Components/ToDoEdit';
import ToDoAdd from '../Components/ToDoAdd';
import ToDoMap from '../Components/ToDoMap';
import renderer from 'react-test-renderer';

describe("Test ToDoTitle component", ()=> {
    const tree = renderer.create(<ToDoTitle data={todos[0]} />);
    const tree2 = renderer.create(<ToDoTitle data={todos[4]} />);
    const instance = tree.getInstance()

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

    test("State is the same everytime we load", () => {
          const todoEditState = { months :[
            "januar",
            "februar",
            "mars",
            "april",
            "mai",
            "juni",
            "juli",
            "august",
            "september",
            "oktober",
            "november",
            "desember"
          ],
          prioColors: ["#8FC93A", "#E4CC37", "#CC2936"],
        }
        expect(instance.state.prioColors).toEqual(todoEditState.prioColors)
        expect(instance.state.months).toEqual(todoEditState.months)
    })
})

describe("Test ToDoContent component", ()=> {
    const tree = renderer.create(<ToDoContent data={todos[0]} currentLocation={{latitude:10, longitude:10}} />);
    
    test("ToDoContent snapshot testing", () => {
        expect(tree).toMatchSnapshot();
    })
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

/*
describe("Test ToDoEdit compoennt", () => {
    jest.mock("TextInput", () => {
        const RealComponent = require.requireActual('TextInput')
        const React = require("react")

        class TextInput extends React.Component {
            render() {
                React.createElement("TextInput", this.props, this.props.children)
            }
        }
        TextInput.propTypes = RealComponent.propTypes
        return TextInput

        return {
            TextInput: {
                colors: jest.fn().mockReturnValue({}),
                props: jest.fn().mockReturnValue({}),
                theme: jest.fn(() => {}),
                Theme: jest.fn(() => {}),
             },
            Theme: jest.fn(() => {})
            {
                dark: boolean,
                roundness: number,
                colors: {
                  primary: string,
                  background: string,
                  surface: string,
                  accent: string,
                  error: string,
                  text: string,
                  disabled: string,
                 placeholder: string,
                  backdrop: string,
                },
                fonts: {
                  regular: string,
                  medium: string,
                  light: string,
                  thin: string,
                },
            };
               
        }
    })
    const navigation = { getParam: jest.fn(x => todos[0]) }
    const tree = renderer.create(<ToDoEdit data={todos[0]} navigation={navigation}/>);
    const instance = tree.getInstance()
    
    test("", () => {
        //console.log(instance.state)
        expect(instance.state.description).toBe("Drøm")
    })
})
*/

/*
describe("Test ToDoEdit compoennt", () => {
    const navigation = { getParam: jest.fn(x => todos[0]) }
    const tree = renderer.create(<ToDoAdd data={todos[0]} navigation={navigation} />);
    console.log(navigation)
    console.log(tree)
    
    test("ToDoTitle snapshot test", () => {
        expect(tree).toMatchSnapshot();
    })
})
*/
/*
describe("Test ToDoMap compoennt", () => {
    jest.mock("react-native-paper", () => {
        return {
            colors
        }
    }

    )
    const navigation = { getParam: jest.fn(x => todos[0]) }
    const tree = renderer.create(<ToDoMap data={todos[0]} navigation={navigation}/>);
    const instance = tree.getInstance()
    
    test("ToDoTitle snapshot test", () => {
        expect(tree).toMatchSnapshot();
    })
    test("", () => {
        console.log(instance.state)
    })
})
*/