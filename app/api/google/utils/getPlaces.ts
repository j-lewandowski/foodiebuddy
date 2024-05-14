const getPlaces = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=distance&keyword=restaurant&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );
    if (response.ok) {
      return await response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getPlaces;
