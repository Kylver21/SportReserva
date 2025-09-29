import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { MapPin, Star, Users, Wifi, Car, Coffee, Lightbulb, ChevronLeft } from 'lucide-react';
import { cargarGoogleMapsAPI } from '../../utils/googleMapCarga';

declare global {
  interface Window {
    google: any;
  }
}

function Map({ location }: { location: { lat: number; lng: number } }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  useEffect(() => {
    cargarGoogleMapsAPI()
      .then(() => setIsGoogleLoaded(true))
      .catch((error) => console.error('Error loading Google Maps API:', error));
  }, []);

  useEffect(() => {
    if (isGoogleLoaded && mapRef.current && window.google) {
      const mapElement = mapRef.current;
      if (mapElement instanceof HTMLElement) {
        const map = new window.google.maps.Map(mapElement, {
          center: location,
          zoom: 15,
        });

        new window.google.maps.Marker({
          position: location,
          map,
        });
      } else {
        console.error('mapRef.current is not a valid HTMLElement');
      }
    }
  }, [isGoogleLoaded, location]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
}

export default function CourtDetail() {
  const { id } = useParams();
  const { state } = useApp();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const court = state.courts.find(c => c.id === id);

  if (!court) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancha no encontrada</h2>
          <Link to="/courts" className="text-green-600 hover:text-green-700">
            Volver a canchas
          </Link>
        </div>
      </div>
    );
  }

  const courtLocation = court.coordenadas || { lat: -8.1116, lng: -79.0288 }; // Coordenadas de Trujillo como predeterminadas

  const serviceIcons: { [key: string]: React.ReactNode } = {
    'Vestuarios': <Users className="w-5 h-5" />,
    'Duchas': <Users className="w-5 h-5" />,
    'Estacionamiento': <Car className="w-5 h-5" />,
    'Iluminación LED': <Lightbulb className="w-5 h-5" />,
    'Wifi': <Wifi className="w-5 h-5" />,
    'Cafetería': <Coffee className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/courts" className="hover:text-green-600 flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Canchas
          </Link>
          <span>/</span>
          <span className="text-gray-900">{court.nombre}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="mb-4">
                <img
                  src={court.fotos[selectedImage]}
                  alt={court.nombre}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {court.fotos.map((foto, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-green-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={foto}
                      alt={`Vista ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Court Info */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{court.nombre}</h1>
                  <div className="flex items-center space-x-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {court.deporte}
                    </span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{court.ubicacion}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-xl font-bold">{court.calificacion}</span>
                    <span className="text-gray-500">({court.reseñas.length} reseñas)</span>
                  </div>
                  <p className="text-3xl font-bold text-green-600">S/{court.precio_hora}/h</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{court.descripcion}</p>

              {/* Services */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Servicios incluidos</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {court.servicios.map((servicio, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      {serviceIcons[servicio] || <Users className="w-5 h-5" />}
                      <span className="text-sm text-gray-700">{servicio}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <strong>Tamaño:</strong> {court.tamaño}
                </div>
                <div>
                  <strong>Deporte:</strong> <span className="capitalize">{court.deporte}</span>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Reseñas</h3>
              {court.reseñas.length > 0 ? (
                <div className="space-y-4">
                  {court.reseñas.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{review.usuario_nombre}</h4>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm">{review.calificacion}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-1">{review.comentario}</p>
                      <span className="text-xs text-gray-500">{review.fecha}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Aún no hay reseñas para esta cancha.</p>
              )}
            </div>
          </div>
          <div className="lg:col-span-1">
            {/* Booking Panel */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Reserva tu cancha</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]} // Prevent past dates
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
                    <option key={hour} value={`${hour}:00`}>{`${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">S/{court.precio_hora}</span>
                <button
                  onClick={() => navigate('/checkout', {
                    state: {
                      booking: {
                        courtId: court.id,
                        date: selectedDate,
                        time: selectedTime,
                        price: court.precio_hora,
                      },
                    },
                  })}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Reservar ahora
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Al reservar, aceptas nuestras{' '}
                <Link to="/terms" className="text-green-600 hover:text-green-700">
                  políticas de cancelación
                </Link>{' '}
                y{' '}
                <Link to="/privacy" className="text-green-600 hover:text-green-700">
                  políticas de privacidad
                </Link>.
              </p>
            </div>

            {/* Removed Contact Info Section */}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Ubicación de la cancha</h3>
          <div className="bg-white rounded-xl shadow-md p-6">
            <Map location={courtLocation} />
          </div>
        </div>
      </div>
    </div>
  );
}
