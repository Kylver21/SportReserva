import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, DollarSign, Download, Share } from 'lucide-react';
import jsPDF from 'jspdf';

export default function BookingSuccess() {
  const location = useLocation();
  const { booking, court } = location.state || {};

  if (!booking || !court) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No se encontraron detalles de la reserva
          </h2>
          <Link to="/courts" className="text-green-600 hover:text-green-700">
            Volver a canchas
          </Link>
        </div>
      </div>
    );
  }

  const handleDownloadReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('BOLETA DE VENTA ELECTRÓNICA', 20, 20);
    doc.setFontSize(12);
    doc.text(`Reserva ID: ${booking.id}`, 20, 40);
    doc.text(`Fecha: ${new Date(booking.fecha).toLocaleDateString('es-ES')}`, 20, 50);
    doc.text(`Horario: ${booking.hora_inicio} - ${booking.hora_fin}`, 20, 60);
    doc.text(`Cancha: ${court.nombre}`, 20, 70);
    doc.text(`Ubicación: ${court.ubicacion}`, 20, 80);
    doc.text(`Deporte: ${court.deporte}`, 20, 90);
    doc.text(`Tamaño: ${court.tamaño}`, 20, 100);
    doc.text(`Total Pagado: S/${booking.precio_total}`, 20, 110);
    doc.text(`Método de Pago: ${booking.metodo_pago}`, 20, 120);

    doc.save(`Reserva_${booking.id}.pdf`);
  };

  const handleShareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mi reserva en SportReserva',
        text: `He reservado ${court.nombre} para ${new Date(booking.fecha).toLocaleDateString()} a las ${booking.hora_inicio}`,
        url: window.location.href,
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Reserva Confirmada!
          </h1>
          <p className="text-gray-600">
            Tu reserva ha sido procesada exitosamente. Te hemos enviado un email de confirmación.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-green-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Reserva #{booking.id}</h2>
                <p className="text-green-100">Confirmada el {new Date().toLocaleDateString('es-ES')}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">S/{booking.precio_total}</div>
                <div className="text-green-100 text-sm">Pagado con {booking.metodo_pago}</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Court Info */}
              <div>
                <img
                  src={court.fotos[0]}
                  alt={court.nombre}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{court.nombre}</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{court.ubicacion}</span>
                  </div>
                  <div className="capitalize">
                    <strong>Deporte:</strong> {court.deporte}
                  </div>
                  <div>
                    <strong>Tamaño:</strong> {court.tamaño}
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Detalles de la Reserva</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Fecha</div>
                      <div className="text-gray-600">
                        {new Date(booking.fecha).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-medium">Horario</div>
                      <div className="text-gray-600">
                        {booking.hora_inicio && booking.hora_fin ? `${booking.hora_inicio} - ${booking.hora_fin}` : 'Horario no disponible'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Total Pagado</div>
                      <div className="text-gray-600">S/{booking.precio_total}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Descargar Recibo</span>
          </button>
          
          <button
            onClick={handleShareBooking}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Share className="w-5 h-5" />
            <span>Compartir</span>
          </button>

          <Link
            to="/bookings"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span>Ver Mis Reservas</span>
          </Link>
        </div>

        {/* Important Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Información Importante
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Llega 10 minutos antes de tu horario reservado</li>
            <li>• Presenta tu confirmación en recepción</li>
            <li>• Puedes cancelar hasta 2 horas antes sin costo</li>
            <li>• En caso de lluvia, contacta al establecimiento</li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">¿Qué sigue?</h3>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/courts"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Reservar Otra Cancha
            </Link>
            <Link
              to="/profile"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Ver Mi Perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}