import { useState, useEffect } from "react";

export const useLocation = (): [{ lat: number; lng: number }, boolean] => {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 52,
    lng: 20,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      // setError("Geolocation is not supported by your browser");
      return;
    }

    const handleError = (error: GeolocationPositionError) => {
      // setError(error.message);
      setLocation({
        lat: 52,
        lng: 20,
      });
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setIsLoading(false);
    }, handleError);
  }, []);

  return [location, isLoading];
};
