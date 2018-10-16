import {toRadians, haversine, sortKey, sortTitle, sortDate, sortPriority} from '../functions.js'
import {todos} from '../__mocks__/mock_todos'

describe("Test helper functions in functions.js", () => {
    test('toRadians should correctly convert degrees', () => {
        expect(toRadians(180)).toBe(Math.PI);
        expect(toRadians(360)).toBe((2*Math.PI));
        expect(toRadians(0)).toBe(0);
        expect(toRadians("180")).toBe(Math.PI);
        expect(toRadians("test")).toBe(NaN);
    });

    test('Haversine should correctly find distance between two sets of coordinates', () => {
        let currentLocation = {latitude:10, longitude:10};

        let location = {latitude: 9.5, longitude:2.5}
        expect(Math.round(haversine(currentLocation, location))).toBe(823775);
        expect(haversine(currentLocation, currentLocation)).toBe(0);
        currentLocation = {latitude: -10, longitude: -10};
        expect(Math.round(haversine(currentLocation, location))).toBe(2571909);
        location = {latitude: -9.5, longitude: -2.5};
        expect(Math.round(haversine(currentLocation, location))).toBe(823775);
    })
});

describe("Test sorting functions, in functions.js", () => {
    const unsortedTodos = [];
    todos.forEach(x => unsortedTodos.push(x));

    test('sortKey should put earliest key on top', () => {
        expect(todos.sort(sortKey)[0]).toMatchObject(unsortedTodos[2]);
        expect(todos.sort(sortKey)[todos.length - 1]).toMatchObject(unsortedTodos[4]);
    });
    test('sortTitle should sort todos alphabetically', () => {
        expect(todos.sort(sortTitle)[0]).toMatchObject(unsortedTodos[4]);
        expect(todos.sort(sortTitle)[todos.length - 1]).toMatchObject(unsortedTodos[2]);
    });

    test('sortDate should put earliest date on top', () => {
        expect(todos.sort(sortDate)[0]).toMatchObject(unsortedTodos[1]);
        expect(todos.sort(sortDate)[todos.length - 1]).toMatchObject(unsortedTodos[3]);
    });

    test('sortPriority should put highest date on top', () => {
        expect(todos.sort(sortPriority)[0]).toMatchObject(unsortedTodos[0]);
        expect(todos.sort(sortPriority)[todos.length - 1]).toMatchObject(unsortedTodos[2]);
    });
})
