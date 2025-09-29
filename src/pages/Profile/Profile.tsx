import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Mail, Phone, CreditCard, Calendar, CreditCard as Edit3, Save, X } from 'lucide-react';

export default function Profile() {
  const { state } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: state.currentUser?.nombre || '',
    telefono: state.currentUser?.telefono || '',
  });

  if (!state.currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Debes iniciar sesión para ver tu perfil
          </h2>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // Aquí normalmente actualizarías el usuario en el contexto
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      nombre: state.currentUser?.nombre || '',
      telefono: state.currentUser?.telefono || '',
    });
    setIsEditing(false);
  };

  const recentBookings = state.userBookings.slice(0, 3);
  const completedBookings = state.userBookings.filter(b => b.estado === 'completada').length;
  const activeBookings = state.userBookings.filter(b => b.estado === 'activa').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancelar</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline w-4 h-4 mr-1" />
                    Nombre completo
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{state.currentUser.nombre}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-1" />
                    Email
                  </label>
                  <p className="text-gray-900 py-2">{state.currentUser.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Teléfono
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{state.currentUser.telefono}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                <CreditCard className="inline w-5 h-5 mr-2" />
                Métodos de Pago
              </h2>
              {state.currentUser.metodos_pago.length > 0 ? (
                <div className="space-y-3">
                  {state.currentUser.metodos_pago.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          method.tipo === 'tarjeta' ? 'bg-blue-100' : 'bg-yellow-100'
                        }`}>
                          <CreditCard className={`w-5 h-5 ${
                            method.tipo === 'tarjeta' ? 'text-blue-600' : 'text-yellow-600'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium">{method.nombre}</p>
                          <p className="text-sm text-gray-500">{method.detalles}</p>
                        </div>
                      </div>
                      <button className="text-green-600 hover:text-green-700 text-sm">
                        Editar
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No tienes métodos de pago registrados</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Agregar Método de Pago
                  </button>
                </div>
              )}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                <Calendar className="inline w-5 h-5 mr-2" />
                Reservas Recientes
              </h2>
              {recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking) => {
                    const court = state.courts.find(c => c.id === booking.cancha_id);
                    return (
                      <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{court?.nombre}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(booking.fecha).toLocaleDateString()} - {booking.hora_inicio}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              booking.estado === 'activa' 
                                ? 'bg-green-100 text-green-800'
                                : booking.estado === 'completada'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {booking.estado}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">S/{booking.precio_total}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No tienes reservas recientes
                </p>
              )}
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Estadísticas</h2>
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">{completedBookings}</p>
                  <p className="text-sm text-gray-600">Reservas completadas</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">{activeBookings}</p>
                  <p className="text-sm text-gray-600">Reservas activas</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-3xl font-bold text-orange-600">
                    S/{state.userBookings.reduce((total, booking) => total + booking.precio_total, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Total gastado</p>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Preferencias</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Deportes Favoritos</h3>
                  {state.currentUser.preferencias.deportes.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {state.currentUser.preferencias.deportes.map((deporte, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full capitalize">
                          {deporte}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No has seleccionado deportes favoritos</p>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Ubicaciones Preferidas</h3>
                  {state.currentUser.preferencias.ubicaciones_preferidas.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {state.currentUser.preferencias.ubicaciones_preferidas.map((ubicacion, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {ubicacion}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No has seleccionado ubicaciones preferidas</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}