class getLocation {
    getCurrentLocation(resolve) {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                resolve(latitude, longitude);
            }
        );
    }
}