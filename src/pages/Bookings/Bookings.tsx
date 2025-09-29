import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, DollarSign, Filter, CheckCircle, XCircle } from 'lucide-react';

export default function Bookings() {
  const { state, dispatch } = useApp();
  const [filter, setFilter] = useState<'todas' | 'activa' | 'completada' | 'cancelada'>('todas');

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Debes iniciar sesión para ver tus reservas
          </h2>
        </div>
      </div>
    );
  }

  const filteredBookings = state.userBookings.filter(booking => {
    if (filter === 'todas') return true;
    return booking.estado === filter;
  });

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      dispatch({ type: 'CANCEL_BOOKING', payload: bookingId });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activa':
        return 'bg-green-100 text-green-800';
      case 'completada':
        return 'bg-blue-100 text-blue-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'activa':
        return <Clock className="w-4 h-4" />;
      case 'completada':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelada':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Reservas</h1>
            <p className="text-gray-600">Gestiona todas tus reservas de canchas</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center space-x-1 mb-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filtrar por estado:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'todas', label: 'Todas', count: state.userBookings.length },
              { key: 'activa', label: 'Activas', count: state.userBookings.filter(b => b.estado === 'activa').length },
              { key: 'completada', label: 'Completadas', count: state.userBookings.filter(b => b.estado === 'completada').length },
              { key: 'cancelada', label: 'Canceladas', count: state.userBookings.filter(b => b.estado === 'cancelada').length },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map((booking) => {
              const court = state.courts.find(c => c.id === booking.cancha_id);
              const isUpcoming = new Date(booking.fecha) > new Date() && booking.estado === 'activa';
              
              return (
                <div key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="md:flex">
                    {court && (
                      <div className="md:w-48 h-48 md:h-auto">
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
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {court?.nombre || 'Cancha no encontrada'}
                          </h3>
                          <div className="flex items-center space-x-4 text-gray-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">
                                {new Date(booking.fecha).toLocaleDateString('es-ES', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">
                                {booking.hora_inicio} - {booking.hora_fin}
                              </span>
                            </div>
                          </div>
                          {court && (
                            <div className="flex items-center space-x-1 text-gray-600 mb-2">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm capitalize">{court.deporte} • {court.ubicacion}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.estado)}`}>
                            {getStatusIcon(booking.estado)}
                            <span className="capitalize">{booking.estado}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-semibold text-green-600">
                              S/{booking.precio_total}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            Pagado con {booking.metodo_pago}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2">
                          {isUpcoming && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                            >
                              Cancelar Reserva
                            </button>
                          )}
                          {booking.estado === 'completada' && (
                            <button
                              onClick={() => window.location.href = `/courts/${booking.cancha_id}`}
                              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                            >
                              Reservar de Nuevo
                            </button>
                          )}
                          <button
                            onClick={() => window.location.href = `/booking-details/${booking.id}`}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                          >
                            Ver Detalles
                          </button>
                        </div>
                      </div>

                      {booking.estado === 'completada' && Array.isArray(court?.reseñas) && court.reseñas.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Reseñas de la Cancha</h4>
                          <ul className="space-y-2">
                            {court.reseñas.map((review) => (
                              <li key={review.id} className="bg-gray-100 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-sm font-medium text-gray-900">{review.usuario_nombre}</span>
                                  <span className="text-xs text-gray-500">{new Date(review.fecha).toLocaleDateString('es-ES')}</span>
                                </div>
                                <p className="text-sm text-gray-700">{review.comentario}</p>
                                <div className="mt-2">
                                  {[...Array(review.calificacion)].map((_, i) => (
                                    <span key={i} className="text-yellow-500">★</span>
                                  ))}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'todas' ? 'No tienes reservas' : `No tienes reservas ${filter}s`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'todas' 
                ? 'Haz tu primera reserva y comienza a disfrutar de nuestras canchas'
                : `No se encontraron reservas con estado ${filter}`
              }
            </p>
            {filter === 'todas' && (
              <button
                onClick={() => window.location.href = '/courts'}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Explorar Canchas
              </button>
            )}
          </div>
        )}

        {/* Summary Stats */}
        {filteredBookings.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {state.userBookings.filter(b => b.estado === 'completada').length}
              </div>
              <div className="text-gray-600">Reservas Completadas</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {state.userBookings.filter(b => b.estado === 'activa').length}
              </div>
              <div className="text-gray-600">Reservas Activas</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                S/{state.userBookings.reduce((total, booking) => total + booking.precio_total, 0)}
              </div>
              <div className="text-gray-600">Total Gastado</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}