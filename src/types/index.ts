export interface User {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  historial_reservas: string[];
  preferencias: {
    deportes: string[];
    ubicaciones_preferidas: string[];
  };
  metodos_pago: PaymentMethod[];
}

export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface Court {
  id: string;
  nombre: string;
  deporte: string;
  ubicacion: string;
  precio_hora: number;
  disponibilidad: Availability[];
  fotos: string[];
  calificacion: number;
  reseñas: Review[];
  descripcion: string;
  servicios: string[];
  tamaño: string;
  coordenadas: Coordenadas;
  portada: string;
}

export interface Booking {
  id: string;
  usuario_id: string;
  cancha_id: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado: 'activa' | 'completada' | 'cancelada';
  precio_total: number;
  metodo_pago: string;
  created_at: string;
}

export interface Promotion {
  id: string;
  titulo: string;
  descripcion: string;
  descuento: number;
  codigo: string;
  vigencia: string;
  imagen: string;
  activa: boolean;
}

export interface Review {
  id: string;
  usuario_nombre: string;
  calificacion: number;
  comentario: string;
  fecha: string;
}

export interface Availability {
  fecha: string;
  horarios: string[];
}

export interface PaymentMethod {
  id: string;
  tipo: 'tarjeta' | 'paypal' | 'efectivo' | 'yape';
  nombre: string;
  detalles: string;
  logo?: string;
}

export interface FAQ {
  id: string;
  pregunta: string;
  respuesta: string;
  categoria: string;
}

export interface Notification {
  id: string;
  titulo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
  tipo: 'reserva' | 'promocion' | 'general';
}