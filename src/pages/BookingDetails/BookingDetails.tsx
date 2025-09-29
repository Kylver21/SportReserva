import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Booking } from '../../types';

export default function BookingDetails() {
  const { id } = useParams();
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Cargar datos de localStorage
    const storedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    const storedCourts = JSON.parse(localStorage.getItem('courts') || '[]');

    // Validar si hay datos en localStorage
    if (storedBookings.length > 0) {
      dispatch({ type: 'LOAD_BOOKINGS', payload: storedBookings });
    } else {
      console.error('No se encontraron reservas en localStorage. Por favor, realice una reserva.');
    }

    if (storedCourts.length > 0) {
      dispatch({ type: 'LOAD_COURTS', payload: storedCourts });
    } else {
      console.error('No se encontraron canchas en localStorage. Por favor, agregue canchas.');
    }
  }, [dispatch]);

  const booking = state.userBookings.find(b => b.id === id);
  const court = booking ? state.courts.find(c => c.id === booking.cancha_id) : null;

  if (!booking) {
    console.error(`No se encontró la reserva con ID: ${id}`);
  }

  if (!court && booking) {
    console.error(`No se encontró la cancha con ID: ${booking.cancha_id}`);
  }

  // Restricciones de reserva
  // Declarar el tipo de parámetro para isBookingConflict
  const isBookingConflict = (newBooking: Booking) => {
    return state.userBookings.some(b => 
      b.cancha_id === newBooking.cancha_id && 
      b.fecha === newBooking.fecha && 
      ((newBooking.hora_inicio >= b.hora_inicio && newBooking.hora_inicio < b.hora_fin) || 
       (newBooking.hora_fin > b.hora_inicio && newBooking.hora_fin <= b.hora_fin))
    );
  };

  // Ejemplo de uso de isBookingConflict
  if (booking && isBookingConflict(booking)) {
    console.error('Conflicto de reserva detectado. No se puede reservar la misma cancha en el mismo horario.');
  }

  // Sistema de valoraciones
  const addReview = (courtId: string, review: { usuario: string; calificacion: number; comentario: string; fecha: string }) => {
    const storedCourts: any[] = JSON.parse(localStorage.getItem('courts') || '[]');
    const courtIndex = storedCourts.findIndex((c: any) => c.id === courtId);

    if (courtIndex !== -1) {
      storedCourts[courtIndex].reseñas.push(review);
      localStorage.setItem('courts', JSON.stringify(storedCourts));
      console.log('Reseña añadida con éxito.');
    } else {
      console.error('No se encontró la cancha para añadir la reseña.');
    }
  };

  // Ejemplo de uso de addReview
  if (court) {
    addReview(court.id, {
      usuario: 'Usuario 1',
      calificacion: 5,
      comentario: 'Excelente cancha, muy bien mantenida.',
      fecha: new Date().toISOString(),
    });
  }

  // Notificaciones push
  const sendNotification = (title: string, message: string) => {
    const notifications: any[] = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push({ title, message, timestamp: new Date().toISOString() });
    localStorage.setItem('notifications', JSON.stringify(notifications));
    console.log('Notificación enviada:', title);
  };

  // Ejemplo de uso de sendNotification
  if (booking) {
    sendNotification('Reserva confirmada', `Tu reserva para ${court?.nombre} el ${booking.fecha} a las ${booking.hora_inicio} ha sido confirmada.`);
  }

  if (!booking || !court) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Reserva no encontrada</h2>
          <p className="text-gray-600">No se pudo encontrar la reserva con el ID proporcionado.</p>
          <Link to="/bookings" className="text-green-600 hover:text-green-700">
            Volver a Mis Reservas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {court?.nombre || 'Cancha no encontrada'}
              </h3>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
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
                <div className="flex items-center space-x-1 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm capitalize">{court.deporte} • {court.ubicacion}</span>
                </div>
              )}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}