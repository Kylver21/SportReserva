import { User, Court, Booking, Promotion, FAQ, Notification } from '../types';

export const users: User[] = [
  {
    id: '1',
    nombre: 'Carlos Pérez',
    email: 'carlos.perez@example.com',
    telefono: '987654321',
    historial_reservas: ['1', '2'],
    preferencias: {
      deportes: ['fútbol'],
      ubicaciones_preferidas: ['Las Orquídeas', 'Centro'],
    },
    metodos_pago: [
      {
        id: '1',
        tipo: 'tarjeta',
        nombre: 'Visa **** 1234',
        detalles: 'Expira 12/25',
      },
      {
        id: '4',
        tipo: 'yape',
        nombre: 'Yape',
        detalles: '987654321',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Icono_de_la_aplicaci%C3%B3n_Yape.png',
      },
    ],
  },
  {
    id: '2',
    nombre: 'Valeria Díaz',
    email: 'valeria.diaz@example.com',
    telefono: '912345678',
    historial_reservas: ['3'],
    preferencias: {
      deportes: ['básquet'],
      ubicaciones_preferidas: ['Federico Villarreal', 'Centro'],
    },
    metodos_pago: [
      {
        id: '2',
        tipo: 'paypal',
        nombre: 'PayPal',
        detalles: 'ana.gomez@example.com',
        logo: 'https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_960_720.png',
      },
      {
        id: '5',
        tipo: 'yape',
        nombre: 'Yape',
        detalles: '912345678',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Icono_de_la_aplicaci%C3%B3n_Yape.png',
      },
    ],
  },
  {
    id: '3',
    nombre: 'Luis Rodriguez',
    email: 'luis.rodriguez@example.com',
    telefono: '945123789',
    historial_reservas: ['4'],
    preferencias: {
      deportes: ['vóley'],
      ubicaciones_preferidas: ['Carretera Industrial', 'Norte'],
    },
    metodos_pago: [
      {
        id: '3',
        tipo: 'tarjeta',
        nombre: 'MasterCard **** 5678',
        detalles: 'Expira 08/26',
      },
      {
        id: '6',
        tipo: 'paypal',
        nombre: 'PayPal',
        detalles: 'luis.rodriguez@example.com',
        logo: 'https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_960_720.png',
      },
    ],
  },
];

export const courts: Court[] = [
  {
    id: 'court-001',
    nombre: 'El Bunker Sport',
    deporte: 'fútbol',
    ubicacion: 'Urb Las Orquídeas, Trujillo 13011',
    coordenadas: { lat: -8.1116, lng: -79.0288 },
    fotos: [
      'https://www.sportpoint.pe/wp-content/uploads/2023/03/Futbol-7-Cancha-3-1.jpg',
      'https://pqs.pe/wp-content/uploads/2015/01/pastosintetico-lacanchita-futbol7-3.jpg',
      'https://www.rubberandgrass.cl/wp-content/uploads/2024/03/Construccion-de-Canchas-de-Futbol-en-Chile.jpg',
    ],
    portada: 'https://www.sportpoint.pe/wp-content/uploads/2023/03/Futbol-7-Cancha-3-1.jpg',
    calificacion: 4.0,
    reseñas: [
      {
        id: 'review-001',
        usuario_nombre: 'Carlos',
        comentario: 'Lindo campo para hacer deporte y distraerse un rato con los amigos.',
        calificacion: 5,
        fecha: '2025-09-20',
      },
    ],
    disponibilidad: [
      { fecha: '2025-09-27', horarios: ['9:00 - 23:00'] },
    ],
    descripcion: 'Cancha de fútbol con césped sintético de alta calidad.',
    servicios: ['Vestuarios', 'Duchas', 'Estacionamiento'],
    tamaño: 'Mediana',
    precio_hora: 50,
  },
  {
    id: 'court-002',
    nombre: 'Club Deportivo Juventud Talentos',
    deporte: 'fútbol',
    ubicacion: 'Villa Gol Sport Center, Av. Federico Villarreal, Trujillo 13006',
    coordenadas: { lat: -8.1122, lng: -79.0299 },
    fotos: [
      'https://deporplaza.com/wp-content/uploads/2023/03/Cancha-De-Futbol-6-Campo-De-Marte.jpg',
      'https://canchasfutbol.com/wp-content/uploads/2024/08/Cancha-de-Noche-en-DeporPlaza-Campo-de-Marte.jpg',
      'https://alquilatucancha-public.s3.sa-east-1.amazonaws.com/production/public/clubs/bg/deporplaza-lima.jpeg?803696',
    ],
    portada: 'https://deporplaza.com/wp-content/uploads/2023/03/Cancha-De-Futbol-6-Campo-De-Marte.jpg',
    calificacion: 4.8,
    reseñas: [
      {
        id: 'review-002',
        usuario_nombre: 'Ana',
        comentario: 'EXCELENTE ACADEMIA',
        calificacion: 5,
        fecha: '2025-09-21',
      },
    ],
    disponibilidad: [
      { fecha: '2025-09-27', horarios: ['9:00 - 23:00'] },
    ],
    descripcion: 'Cancha de fútbol con césped natural y medidas profesionales.',
    servicios: ['Vestuarios', 'Estacionamiento'],
    tamaño: 'Grande',
    precio_hora: 60,
  },
  {
    id: 'court-003',
    nombre: 'Lions Trujillo',
    deporte: 'baloncesto',
    ubicacion: 'Carr. Industrial Mz A, Trujillo 13008',
    coordenadas: { lat: -8.1133, lng: -79.0305 },
    fotos: [
      'https://deporplaza.com/wp-content/uploads/2023/03/Cancha-De-Basket-Depor-Plaza.jpg',
      'https://www.pinturasmontana.com/wp-content/uploads/2013/10/CanchaMultiple.jpg',
      'https://niberma.es/wp-content/uploads/2022/05/tipos-pintura-pavimentos-deportivos.jpg',
    ],
    portada: 'https://deporplaza.com/wp-content/uploads/2023/03/Cancha-De-Basket-Depor-Plaza.jpg',
    calificacion: 4.5,
    reseñas: [
      {
        id: 'review-003',
        usuario_nombre: 'Carlos',
        comentario: 'Local de entrenamiento y competencia deportiva, para basket y voley.',
        calificacion: 4,
        fecha: '2025-09-22',
      },
    ],
    disponibilidad: [
      { fecha: '2025-09-27', horarios: ['9:00 - 23:00'] },
    ],
    descripcion: 'Cancha de baloncesto con superficie de madera y aros regulables.',
    servicios: ['Vestuarios', 'Duchas'],
    tamaño: 'Mediana',
    precio_hora: 45,
  },
  {
    id: 'court-004',
    nombre: 'ADDEIN Basket',
    deporte: 'baloncesto',
    ubicacion: 'Sede Colegio AGUA VIVA, Los Diamantes 250, Trujillo 13011',
    coordenadas: { lat: -8.1144, lng: -79.0311 },
    fotos: [
      'https://www.parqueygrama.com/wp-content/uploads/2018/11/construccion-de-cancha-multiple.jpg',
      'https://www.parqueygrama.com/wp-content/uploads/2018/12/cancha-mult-medidas.png',
      'https://www.parqueygrama.com/wp-content/uploads/2017/04/construccion_cancha_multiple_plazuela_del_mar_03.jpg',
    ],
    portada: 'https://www.parqueygrama.com/wp-content/uploads/2018/11/construccion-de-cancha-multiple.jpg',
    calificacion: 5.0,
    reseñas: [
      {
        id: 'review-004',
        usuario_nombre: 'Ana',
        comentario: 'Se interesan que todos aprendan.',
        calificacion: 5,
        fecha: '2025-09-23',
      },
    ],
    disponibilidad: [
      { fecha: '2025-09-27', horarios: ['9:00 - 23:00'] },
    ],
    descripcion: 'Cancha de baloncesto al aire libre, con iluminación y medidas oficiales.',
    servicios: ['Estacionamiento'],
    tamaño: 'Grande',
    precio_hora: 55,
  },
  {
    id: 'court-005',
    nombre: 'Centro Deportivo San Fernando',
    deporte: 'vóley',
    ubicacion: 'Leandro Alviña 301, Trujillo 13001',
    coordenadas: { lat: -8.1155, lng: -79.0322 },
    fotos: [
      'https://countryclubvilla.org.pe/wp-content/uploads/2023/03/volley-ball4.jpg',
      'https://countryclubvilla.org.pe/wp-content/uploads/2023/03/volley-ball1.jpg',
      'https://i.ytimg.com/vi/_oayWcSxRfo/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLBs3BPphM_JzruM9N49GnHFQpMJXA',
    ],
    portada: 'https://countryclubvilla.org.pe/wp-content/uploads/2023/03/volley-ball4.jpg',
    calificacion: 4.7,
    reseñas: [],
    disponibilidad: [
      { fecha: '2025-09-27', horarios: ['9:00 - 23:00'] },
    ],
    descripcion: 'Complejo deportivo con canchas de fútbol, vóley y básquet.',
    servicios: ['Vestuarios', 'Duchas', 'Estacionamiento'],
    tamaño: 'Variable',
    precio_hora: 40,
  },
  {
    id: 'court-006',
    nombre: 'Complejo Deportivo Mansiche',
    deporte: 'vóley',
    ubicacion: 'Av Mansiche 379, Trujillo 13001',
    coordenadas: { lat: -8.1166, lng: -79.0333 },
    fotos: [
      'https://lh5.googleusercontent.com/p/AF1QipNlJjTShfUUpkKOVBI8SP6i1EbjlMimJIqNb100=w800-h500-k-no',
      'https://i.ytimg.com/vi/7N8-MbSHqZ0/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgXChSMA8=&rs=AOn4CLC8oihdxD257AgE3IDToHBJLt3ZoQ',
      'https://i.ytimg.com/vi/jdwX1cl7mMc/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgXihTMA8=&rs=AOn4CLCwpdqQS49-N6tIGOxFzhvMY60G6A',
    ],
    portada: 'https://lh5.googleusercontent.com/p/AF1QipNlJjTShfUUpkKOVBI8SP6i1EbjlMimJIqNb100=w800-h500-k-no',
    calificacion: 4.9,
    reseñas: [],
    disponibilidad: [
      { fecha: '2025-09-27', horarios: ['9:00 - 23:00'] },
    ],
    descripcion: 'Cancha de vóley profesional, con piso sintético y buena iluminación.',
    servicios: ['Vestuarios', 'Duchas', 'Estacionamiento'],
    tamaño: 'Grande',
    precio_hora: 70,
  },
];

export const bookings: Booking[] = [
  {
    id: '1',
    usuario_id: '1',
    cancha_id: '1',
    fecha: '2025-10-25',
    hora_inicio: '19:00',
    hora_fin: '20:00',
    estado: 'activa',
    precio_total: 45,
    metodo_pago: 'Yape',
    created_at: '2025-01-13',
  },
  {
    id: '2',
    usuario_id: '1',
    cancha_id: '3',
    fecha: '2025-10-20',
    hora_inicio: '20:00',
    hora_fin: '21:00',
    estado: 'completada',
    precio_total: 50,
    metodo_pago: 'Tarjeta',
    created_at: '2025-01-10',
  },
  {
    id: '3',
    usuario_id: '2',
    cancha_id: '2',
    fecha: '2025-10-26',
    hora_inicio: '18:30',
    hora_fin: '19:30',
    estado: 'activa',
    precio_total: 40,
    metodo_pago: 'PayPal',
    created_at: '2025-01-12',
  },
  {
    id: '4',
    usuario_id: '3',
    cancha_id: '5',
    fecha: '2025-10-27',
    hora_inicio: '17:00',
    hora_fin: '18:00',
    estado: 'activa',
    precio_total: 35,
    metodo_pago: 'PayPal',
    created_at: '2025-01-14',
  },
];

export const promotions: Promotion[] = [
  {
    id: '1',
    titulo: 'Promoción 2x1 en canchas de fútbol',
    descripcion: 'Reserva dos horas y paga solo una en canchas seleccionadas de fútbol',
    descuento: 50,
    codigo: 'FUTBOL2X1',
    vigencia: '2025-10-31',
    imagen: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400',
    activa: true,
  },
  {
    id: '2',
    titulo: '10% de descuento en tu primera reserva',
    descripcion: 'Válido para nuevos usuarios en cualquier cancha deportiva',
    descuento: 10,
    codigo: 'BIENVENIDO10',
    vigencia: '2025-12-31',
    imagen: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400',
    activa: true,
  },
  {
    id: '3',
    titulo: 'Descuento Happy Hour Básquet',
    descripcion: 'Reserva de 14:00 a 16:00 con 30% descuento en canchas de básquet',
    descuento: 30,
    codigo: 'HAPPY30',
    vigencia: '2025-11-30',
    imagen: 'https://images.pexels.com/photos/2291004/pexels-photo-2291004.jpeg?auto=compress&cs=tinysrgb&w=400',
    activa: true,
  },
  {
    id: '4',
    titulo: 'Fin de Semana Deportivo',
    descripcion: '15% descuento en reservas de fin de semana para todas las disciplinas',
    descuento: 15,
    codigo: 'WEEKEND15',
    vigencia: '2025-12-31',
    imagen: 'https://images.pexels.com/photos/7009345/pexels-photo-7009345.jpeg?auto=compress&cs=tinysrgb&w=400',
    activa: true,
  },
];

export const faqs: FAQ[] = [
  {
    id: '1',
    pregunta: '¿Cómo puedo hacer una reserva?',
    respuesta: 'Puedes hacer una reserva navegando a la sección de canchas, seleccionando la cancha deseada y eligiendo fecha y hora disponible. El proceso es muy sencillo y rápido.',
    categoria: 'Reservas',
  },
  {
    id: '2',
    pregunta: '¿Puedo cancelar mi reserva?',
    respuesta: 'Sí, puedes cancelar tu reserva hasta 2 horas antes del horario reservado desde tu perfil. No se aplicarán cargos por cancelación si se hace dentro del tiempo permitido.',
    categoria: 'Cancelaciones',
  },
  {
    id: '3',
    pregunta: '¿Qué métodos de pago aceptan?',
    respuesta: 'Aceptamos tarjetas de crédito/débito, PayPal, Yape, Plin y pagos en efectivo en el establecimiento. Todos los precios están en soles peruanos.',
    categoria: 'Pagos',
  },
  {
    id: '4',
    pregunta: '¿Las canchas incluyen equipamiento?',
    respuesta: 'Algunas canchas incluyen equipamiento básico como balones y redes. Consulta los detalles de cada cancha para más información específica sobre los servicios incluidos.',
    categoria: 'Equipamiento',
  },
  {
    id: '5',
    pregunta: '¿Están abiertas las canchas los fines de semana?',
    respuesta: 'Sí, la mayoría de nuestras canchas están disponibles los fines de semana. Algunas incluso funcionan 24 horas como El Bunker Sport.',
    categoria: 'Horarios',
  },
  {
    id: '6',
    pregunta: '¿Hay descuentos para reservas grupales?',
    respuesta: 'Sí, ofrecemos descuentos especiales para grupos y reservas recurrentes. También tenemos promociones 2x1 en canchas de fútbol y descuentos de fin de semana.',
    categoria: 'Promociones',
  },
];

export const notifications: Notification[] = [
  {
    id: '1',
    titulo: 'Reserva Confirmada',
    mensaje: 'Tu reserva en El Bunker Sport para mañana a las 19:00 ha sido confirmada',
    fecha: '2025-01-13',
    leida: false,
    tipo: 'reserva',
  },
  {
    id: '2',
    titulo: 'Nueva Promoción 2x1',
    mensaje: 'Aprovecha la promoción 2x1 en canchas de fútbol con el código FUTBOL2X1',
    fecha: '2025-01-12',
    leida: false,
    tipo: 'promocion',
  },
  {
    id: '3',
    titulo: 'Recordatorio de Partido',
    mensaje: 'No olvides tu partido de básquet mañana en Lions Trujillo',
    fecha: '2025-01-14',
    leida: true,
    tipo: 'general',
  },
  {
    id: '4',
    titulo: 'Descuento Happy Hour',
    mensaje: '30% de descuento en básquet de 14:00 a 16:00 - Código: HAPPY30',
    fecha: '2025-01-15',
    leida: false,
    tipo: 'promocion',
  },
];

// Constantes para métodos de pago con sus respectivos logos y recursos
export const PAYMENT_METHODS = {
  YAPE: {
    name: 'Yape',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Icono_de_la_aplicaci%C3%B3n_Yape.png',
    qr: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_bXJZxqCiABRTKm3FM7zK1Has_-tzvNhhEQ&s',
    type: 'yape',
    color: '#722F8F',
    instructions: 'Escanea el código QR con la app Yape para completar tu pago'
  },
  PAYPAL: {
    name: 'PayPal',
    logo: 'https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_960_720.png',
    type: 'paypal',
    color: '#0070BA',
    instructions: 'Serás redirigido a PayPal para completar tu pago de forma segura'
  },
  TARJETA: {
    name: 'Tarjeta de Crédito/Débito',
    logo: 'https://cdn-icons-png.flaticon.com/512/349/349221.png',
    type: 'tarjeta',
    color: '#28A745',
    instructions: 'Ingresa los datos de tu tarjeta para procesar el pago'
  },
  EFECTIVO: {
    name: 'Efectivo',
    logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png',
    type: 'efectivo',
    color: '#FFC107',
    instructions: 'Paga en efectivo directamente en el establecimiento'
  }
};

