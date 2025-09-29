import { createContext, useContext, useReducer, useEffect } from 'react';
import { User, Court, Booking, Promotion, FAQ } from '../types';
import { courts, bookings, promotions, faqs } from '../data/mockData';

interface AppState {
  currentUser: User | null;
  isAuthenticated: boolean;
  courts: Court[];
  bookings: Booking[];
  userBookings: Booking[];
  promotions: Promotion[];
  faqs: FAQ[];
  notifications: Notification[];
  searchFilters: {
    deporte: string;
    ubicacion: string;
    tamaño: string;
    precioMax: number;
  };
}

type AppAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER'; payload: User }
  | { type: 'UPDATE_FILTERS'; payload: Partial<AppState['searchFilters']> }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'CANCEL_BOOKING'; payload: string }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'LOAD_BOOKINGS'; payload: Booking[] }
  | { type: 'LOAD_COURTS'; payload: Court[] }
  | { type: 'LOAD_NOTIFICATIONS'; payload: Notification[] };

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const initialState: AppState = {
  currentUser: null,
  isAuthenticated: false,
  courts,
  bookings,
  userBookings: [],
  promotions,
  faqs,
  notifications: [
    {
      id: '1',
      title: 'Bienvenido a SportReserva',
      message: 'Gracias por registrarte en nuestra aplicación. ¡Explora y reserva tu cancha ideal!',
      date: new Date().toISOString().split('T')[0],
      read: false,
    },
  ],
  searchFilters: {
    deporte: '',
    ubicacion: '',
    tamaño: '',
    precioMax: 1000,
  },
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        userBookings: bookings.filter(b => b.usuario_id === action.payload.id),
      };
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        userBookings: [],
      };
    case 'REGISTER':
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
      };
    case 'UPDATE_FILTERS':
      return {
        ...state,
        searchFilters: { ...state.searchFilters, ...action.payload },
      };
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
        userBookings: state.currentUser 
          ? [...state.userBookings, action.payload]
          : state.userBookings,
      };
    case 'CANCEL_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map(b => 
          b.id === action.payload ? { ...b, estado: 'cancelada' as const } : b
        ),
        userBookings: state.userBookings.map(b => 
          b.id === action.payload ? { ...b, estado: 'cancelada' as const } : b
        ),
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'LOAD_BOOKINGS':
      return {
        ...state,
        userBookings: action.payload,
      };
    case 'LOAD_COURTS':
      return {
        ...state,
        courts: action.payload,
      };
    case 'LOAD_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Simular persistencia en localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [state.currentUser]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}