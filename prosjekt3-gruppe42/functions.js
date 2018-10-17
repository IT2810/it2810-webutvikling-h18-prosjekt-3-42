// Math stuff
// Finds the distance between two points on a globe with the size of earth
// https://www.movable-type.co.uk/scripts/latlong.html
export const haversine = function (currentLocation, location) {
  const R = 6371e3
  const theta_1 = toRadians(currentLocation.latitude)
  const theta_2 = toRadians(location.latitude)
  const delta_theta = toRadians(location.latitude - currentLocation.latitude)
  const delta_lambda = toRadians(location.longitude - currentLocation.longitude)

  const a = Math.sin(delta_theta / 2) * Math.sin(delta_theta / 2) + Math.cos(theta_1) * Math.cos(theta_2) * Math.sin(delta_lambda / 2) * Math.sin(delta_lambda / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const d = R * c

  return d
}

// Converts degrees to radians
export const toRadians = function (number) {
  return number * (Math.PI / 180)
}

// Sorts by the key used to make them. In our case the keys are the timestamp when they were made
export function sortKey(x, y) {
  return parseInt(x.key) - parseInt(y.key);
}

// Sorts by the title such that "a" > "b" and "ab" > "b"
export function sortTitle(x, y) {
  return x.title === y.title ? 0 : x.title > y.title ? 1 : -1;
}

// Sorts by the priority of our objects to make the more important ones go to the top
export function sortPriority(x, y) {
  return y.priority - x.priority;
}

// Sorts by date such that the ones which need to be finished earlier is put first
export function sortDate(x, y) {
  return (
    new Date(x.date.year, x.date.month, x.date.day) -
    new Date(y.date.year, y.date.month, y.date.day)
  );
}