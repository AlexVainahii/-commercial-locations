export function getDistance(originRoute, destinationRoute) {
  const earthRadius = 6371; // Радіус Землі в кілометрах

  const dLat = toRadians(destinationRoute.lat - originRoute.lat);
  const dLon = toRadians(destinationRoute.lng - originRoute.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(originRoute.lat)) *
      Math.cos(toRadians(destinationRoute.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance.toFixed(1);
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
export function getZoom(distance) {
  if (distance > 1800) {
    return 1;
  }
  if (distance > 1400) {
    return 2;
  }
  if (distance > 1000) {
    return 3;
  }

  if (distance > 500) {
    return 4;
  }
  return 12;
}
