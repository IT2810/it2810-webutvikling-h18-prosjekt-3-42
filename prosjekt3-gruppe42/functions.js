// Math stuff
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

export const toRadians = function (number) {
  return number * (Math.PI / 180)
}