import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, DollarSign, ArrowLeft } from 'lucide-react';

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  // Verificar autenticación
  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate('/login');
      return;
    }
  }, [state.isAuthenticated, navigate]);

  useEffect(() => {
    // Cargar datos de localStorage si no están en el estado
    if (state.userBookings.length === 0) {
      const storedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      if (storedBookings.length > 0) {
        dispatch({ type: 'LOAD_BOOKINGS', payload: storedBookings });
      }
    }

    if (state.courts.length === 0) {
      const storedCourts = JSON.parse(localStorage.getItem('courts') || '[]');
      if (storedCourts.length > 0) {
        dispatch({ type: 'LOAD_COURTS', payload: storedCourts });
      }
    }
  }, [dispatch, state.userBookings.length, state.courts.length]);

  const booking = state.userBookings.find(b => b.id === id);
  const court = booking ? state.courts.find(c => c.id === booking.cancha_id) : null;

  if (!state.isAuthenticated) {
    return null; // El useEffect manejará la redirección
  }

  if (!booking || !court) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Reserva no encontrada</h2>
          <p className="text-gray-600 mb-4">No se pudo encontrar la reserva con el ID proporcionado.</p>
          <button
            onClick={() => navigate('/bookings')}
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Mis Reservas</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header con botón de retorno */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/bookings')}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver a Mis Reservas</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Detalles de la Reserva</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {court && (
              <div className="md:w-64 h-48 md:h-auto">
                <img
                  src={court.fotos[0]}
                  alt={court.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {court?.nombre || 'Cancha no encontrada'}
                  </h3>
                  <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                    booking.estado === 'activa' ? 'bg-green-100 text-green-800' :
                    booking.estado === 'completada' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    <span className="capitalize">{booking.estado}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Fecha</p>
                      <p className="font-medium">
                        {new Date(booking.fecha).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Horario</p>
                      <p className="font-medium">
                        {booking.hora_inicio} - {booking.hora_fin}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {court && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Ubicación</p>
                        <p className="font-medium capitalize">{court.deporte} • {court.ubicacion}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Precio Total</p>
                      <p className="font-semibold text-green-600">S/{booking.precio_total}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-1">Método de Pago</p>
                <p className="font-medium">{booking.metodo_pago}</p>
              </div>

              {court && court.servicios && court.servicios.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Servicios Incluidos</h4>
                  <div className="flex flex-wrap gap-2">
                    {court.servicios.map((servicio, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {servicio}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Información adicional de la cancha */}
        {court && (
          <div className="mt-6 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Información de la Cancha</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Deporte</p>
                <p className="font-medium capitalize">{court.deporte}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tamaño</p>
                <p className="font-medium">{court.tamaño}</p>
              </div>
            </div>
            {court.descripcion && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">Descripción</p>
                <p className="text-gray-700">{court.descripcion}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}