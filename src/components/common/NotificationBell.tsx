import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function NotificationBell() {
  const { state, dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const handleMarkAsRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative focus:outline-none"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {state.notifications.filter((n) => !n.read).length > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {state.notifications.filter((n) => !n.read).length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Notificaciones</h3>
            {state.notifications.length > 0 ? (
              <ul className="space-y-2">
                {state.notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-3 rounded-lg ${notification.read ? 'bg-gray-100' : 'bg-blue-50'}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{notification.title}</span>
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Marcar como leído
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                    <span className="text-xs text-gray-400">{notification.date}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No hay notificaciones.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}