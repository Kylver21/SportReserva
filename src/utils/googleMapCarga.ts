let googleMapsPromise: Promise<void> | null = null;

export const cargarGoogleMapsAPI = (): Promise<void> => {
  if (!googleMapsPromise) {
    googleMapsPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Error al cargar la API de Google Maps'));
      document.body.appendChild(script);
    });
  }
  return googleMapsPromise;
};