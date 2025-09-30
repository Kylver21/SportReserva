import { useState, useEffect } from 'react';
import { Bell, X, Check, Calendar, Gift, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function EnhancedNotificationBell() {
  const { state, dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  const unreadNotifications = state.notifications.filter(n => !n.read);

  // Animación cuando llegan nuevas notificaciones
  useEffect(() => {
    if (unreadNotifications.length > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [unreadNotifications.length]);

  const handleMarkAsRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };

  const handleMarkAllAsRead = () => {
    state.notifications.forEach(notification => {
      if (!notification.read) {
        dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notification.id });
      }
    });
  };

  const getNotificationIcon = (tipo: string) => {
    switch (tipo) {
      case 'reserva':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'promocion':
        return <Gift className="w-5 h-5 text-orange-500" />;
      case 'alerta':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationStyle = (tipo: string, read: boolean) => {
    const baseStyle = "p-4 rounded-lg border-l-4 hover:bg-gray-50 transition-colors";
    
    if (read) {
      return `${baseStyle} bg-gray-50 border-l-gray-300`;
    }

    switch (tipo) {
      case 'reserva':
        return `${baseStyle} bg-blue-50 border-l-blue-500`;
      case 'promocion':
        return `${baseStyle} bg-orange-50 border-l-orange-500`;
      case 'alerta':
        return `${baseStyle} bg-red-50 border-l-red-500`;
      default:
        return `${baseStyle} bg-blue-50 border-l-blue-500`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hoy';
    if (diffDays === 2) return 'Ayer';
    if (diffDays <= 7) return `Hace ${diffDays - 1} días`;
    
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative focus:outline-none p-2 rounded-full transition-all ${
          animate ? 'animate-bounce' : ''
        } hover:bg-gray-100`}
      >
        <Bell className={`w-6 h-6 text-gray-600 transition-transform ${
          unreadNotifications.length > 0 ? 'text-green-600' : ''
        }`} />
        
        {unreadNotifications.length > 0 && (
          <span className={`absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1 ${
            animate ? 'animate-pulse' : ''
          }`}>
            {unreadNotifications.length > 99 ? '99+' : unreadNotifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Notifications Panel */}
          <div className="absolute right-0 mt-2 w-80 bg-white shadow-2xl rounded-xl border z-50 max-h-96 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
              <div className="flex items-center space-x-2">
                {unreadNotifications.length > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-xs text-green-600 hover:text-green-700 font-medium"
                  >
                    Marcar todas como leídas
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {state.notifications.length > 0 ? (
                <div className="p-2 space-y-2">
                  {state.notifications
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((notification) => (
                    <div
                      key={notification.id}
                      className={getNotificationStyle('general', notification.read)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon('general')}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className={`text-sm font-medium ${
                              notification.read ? 'text-gray-700' : 'text-gray-900'
                            }`}>
                              {notification.title}
                            </h4>
                            
                            {!notification.read && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="ml-2 p-1 hover:bg-white rounded-full transition-colors"
                                title="Marcar como leída"
                              >
                                <Check className="w-4 h-4 text-green-500" />
                              </button>
                            )}
                          </div>
                          
                          <p className={`text-sm mt-1 ${
                            notification.read ? 'text-gray-500' : 'text-gray-700'
                          }`}>
                            {notification.message}
                          </p>
                          
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-400">
                              {formatDate(notification.date)}
                            </span>
                            
                            {!notification.read && (
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">No tienes notificaciones</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Te notificaremos sobre tus reservas y ofertas especiales
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {state.notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                <button className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium">
                  Ver todas las notificaciones
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}