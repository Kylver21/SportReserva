import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { CreditCard, Calendar, Clock, MapPin, Check } from 'lucide-react';
import { PAYMENT_METHODS } from '../../data/mockData';

export default function Checkout() {
  const { state, dispatch } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: '',
    paypalEmail: '',
  });

  const booking = location.state?.booking;

  useEffect(() => {
    if (!booking) {
      console.error('Booking data is missing. Redirecting to courts page.');
      navigate('/courts');
      return;
    }

    if (!state.isAuthenticated) {
      console.error('User is not authenticated. Redirecting to login page.');
      navigate('/login');
    }
  }, [booking, state.isAuthenticated, navigate]);

  const court = booking ? state.courts.find(c => c.id === booking.courtId) : null;
  const subtotal = booking?.price || 0;
  const discount = appliedPromo ? (subtotal * appliedPromo.descuento) / 100 : 0;
  const total = subtotal - discount;

  const handleApplyPromo = () => {
    const promo = state.promotions.find(p => p.codigo === promoCode && p.activa);
    if (promo) {
      setAppliedPromo(promo);
    } else {
      alert('Código de promoción no válido');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  const validateForm = () => {
    if (paymentMethod === 'tarjeta') {
      return (
        formData.cardNumber.trim() !== '' &&
        formData.cardName.trim() !== '' &&
        formData.cardExpiry.trim() !== '' &&
        formData.cardCVV.trim() !== ''
      );
    } else if (paymentMethod === 'paypal') {
      return formData.paypalEmail.trim() !== '';
    }
    return true; // For Yape, no additional validation is required
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    setIsProcessing(true);

    // Simular procesamiento de pago
    setTimeout(() => {
      const newBooking = {
        id: Date.now().toString(),
        usuario_id: state.currentUser!.id,
        cancha_id: booking.courtId,
        fecha: booking.date,
        hora_inicio: booking.time,
        hora_fin: `${parseInt(booking.time.split(':')[0]) + 1}:${booking.time.split(':')[1]}`,
        estado: 'activa' as const,
        precio_total: total,
        metodo_pago: paymentMethod === 'tarjeta' ? 'Tarjeta' : paymentMethod === 'paypal' ? 'PayPal' : 'Yape',
        created_at: new Date().toISOString().split('T')[0],
      };

      dispatch({ type: 'ADD_BOOKING', payload: newBooking });

      // Generar notificación de reserva
      const notification = {
        id: Date.now().toString(),
        title: 'Reserva Confirmada',
        message: `Tu reserva en ${court?.nombre || 'Cancha no encontrada'} para el ${booking.date} a las ${booking.time} ha sido confirmada.`,
        date: new Date().toISOString().split('T')[0],
        read: false,
      };

      dispatch({ type: 'ADD_NOTIFICATION', payload: notification });

      navigate('/booking-success', { state: { booking: newBooking, court } });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Confirmar Reserva</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Method Selection */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="tarjeta"
                      checked={paymentMethod === 'tarjeta'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-green-600"
                    />
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span>Tarjeta de Crédito/Débito</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-green-600"
                    />
                    <div className="flex items-center space-x-2">
                      <img
                        src={PAYMENT_METHODS.PAYPAL.logo}
                        alt="Logo de PayPal"
                        className="w-6 h-6 object-contain"
                      />
                      <span>PayPal</span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="yape"
                      checked={paymentMethod === 'yape'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-green-600"
                    />
                    <div className="flex items-center space-x-2">
                      <img
                        src={PAYMENT_METHODS.YAPE.logo}
                        alt="Logo de Yape"
                        className="w-6 h-6 object-contain"
                      />
                      <span>Yape</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Card Details */}
              {paymentMethod === 'tarjeta' && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Detalles de la Tarjeta</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número de Tarjeta
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre en la Tarjeta
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cardName}
                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                        placeholder="Juan Pérez"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de Vencimiento
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        placeholder="MM/AA"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cardCVV}
                        onChange={(e) => setFormData({ ...formData, cardCVV: e.target.value })}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PayPal Details */}
              {paymentMethod === 'paypal' && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">PayPal</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email de PayPal
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.paypalEmail}
                      onChange={(e) => setFormData({ ...formData, paypalEmail: e.target.value })}
                      placeholder="tu@email.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              )}

              {/* Yape Details */}
              {paymentMethod === 'yape' && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Pago con Yape</h3>
                  <div className="flex justify-center">
                    <img
                      src={PAYMENT_METHODS.YAPE.qr}
                      alt="QR de Yape"
                      className="w-32 h-32 md:w-40 md:h-40 object-contain"
                    />
                  </div>
                  <div className="flex justify-center mt-4">
                    <img
                      src={PAYMENT_METHODS.YAPE.logo}
                      alt="Logo de Yape"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Escanea el código QR con tu aplicación Yape para completar el pago.
                  </p>
                </div>
              )}

              {/* Promo Code */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Código de Promoción</h3>
                {!appliedPromo ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Ingresa tu código"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">
                        {appliedPromo.titulo} - {appliedPromo.descuento}% descuento
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      Remover
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Resumen de Reserva</h2>
              
              {court && (
                <div className="mb-4">
                  <img
                    src={court.fotos[0]}
                    alt={court.nombre}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold">{court.nombre}</h3>
                  <div className="flex items-center space-x-1 text-gray-600 text-sm mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{court.ubicacion}</span>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{new Date(booking.date).toLocaleDateString('es-ES')}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{booking.time} (1 hora)</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>S/{subtotal}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento ({appliedPromo.descuento}%):</span>
                    <span>-S/{discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>S/{total}</span>
                </div>
              </div>

              <button
                onClick={(e) => handleSubmit(e as any)}
                disabled={isProcessing}
                className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors ${
                  isProcessing
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isProcessing ? 'Procesando Pago...' : `Pagar S/${total}`}
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Tu pago está protegido con encriptación SSL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}