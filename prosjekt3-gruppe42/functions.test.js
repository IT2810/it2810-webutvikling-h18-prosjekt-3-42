import {toRadians, haversine} from './functions.js'

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
