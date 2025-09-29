# SportReserva - Plataforma de Reservas de Canchas Deportivas

Una aplicación web completa desarrollada en React con TypeScript para gestionar reservas de canchas deportivas. La aplicación incluye autenticación de usuarios, gestión de canchas, sistema de reservas, pagos simulados, y soporte al cliente.

## 🚀 Características Principales

### 🔐 Gestión de Usuarios
- Registro e inicio de sesión simulado con datos JSON
- Perfil de usuario con historial de reservas
- Gestión de métodos de pago (visualización)
- Preferencias personalizadas de deportes y ubicaciones

### 🏟️ Gestión de Canchas
- Listado de canchas con filtros avanzados (deporte, ubicación, tamaño, precio)
- Vista detallada con galería de imágenes
- Información completa: servicios, horarios, calificaciones
- Sistema de reseñas y valoraciones

### 📅 Sistema de Reservas
- Calendario interactivo para selección de fechas
- Disponibilidad en tiempo real
- Gestión de reservas (activas, completadas, canceladas)
- Historial completo de reservas del usuario

### 💳 Sistema de Pago (Frontend)
- Múltiples métodos de pago (tarjeta, PayPal)
- Aplicación de códigos promocionales
- Generación de recibos y confirmaciones
- Proceso de checkout completo

### ⭐ Valoraciones y Reseñas
- Sistema de calificación por estrellas
- Comentarios y reseñas de usuarios
- Visualización de calificaciones promedio

### 🎁 Promociones y Notificaciones
- Sistema de promociones con códigos de descuento
- Centro de notificaciones en tiempo real
- Alertas por reservas y ofertas especiales

### 🆘 Soporte al Cliente
- FAQs organizadas por categorías
- Formulario de contacto
- Múltiples canales de comunicación

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca principal de UI
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de construcción rápida
- **React Router** - Navegación SPA
- **Context API** - Gestión de estado global
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Iconos modernos

## 📁 Estructura del Proyecto

```
src/
├── components/
│   └── common/           # Componentes compartidos
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── LoadingSpinner.tsx
├── context/
│   └── AppContext.tsx    # Context API para estado global
├── data/
│   └── mockData.ts       # Datos JSON simulados
├── pages/
│   ├── Home/             # Página principal
│   ├── Courts/           # Listado de canchas
│   ├── CourtDetail/      # Detalle de cancha
│   ├── Auth/             # Login y Registro
│   ├── Profile/          # Perfil de usuario
│   ├── Bookings/         # Mis reservas
│   ├── Checkout/         # Proceso de pago
│   ├── BookingSuccess/   # Confirmación de reserva
│   └── Support/          # Soporte al cliente
├── types/
│   └── index.ts          # Definiciones de TypeScript
└── App.tsx               # Componente principal
```

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
1. Clona el repositorio
2. Instala las dependencias:
```bash
npm install
```

### Ejecución en Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

### Construcción para Producción
```bash
npm run build
```

### Vista Previa de Producción
```bash
npm run preview
```

## 📊 Datos de Demostración

### Usuarios de Prueba
- **Email:** juan@email.com
- **Email:** maria@email.com
- **Contraseña:** Cualquier contraseña es válida

### Códigos Promocionales
- `PRIMERA20` - 20% descuento primera reserva
- `HAPPY30` - 30% descuento horario 14:00-16:00
- `WEEKEND15` - 15% descuento fines de semana

## 🎨 Características de Diseño

- **Diseño Responsivo** - Optimizado para móvil, tablet y desktop
- **Sistema de Colores Consistente** - Verde deportivo, azul y naranja
- **Animaciones Suaves** - Hover states y transiciones
- **Tipografía Clara** - Jerarquía visual bien definida
- **Componentes Modernos** - Shadows, bordes redondeados
- **Accesibilidad** - Contraste adecuado y navegación por teclado

## 🔧 Funcionalidades Implementadas

### ✅ Completadas
- [x] Sistema de autenticación simulado
- [x] Gestión completa de canchas con filtros
- [x] Sistema de reservas con calendario
- [x] Proceso de pago completo (frontend)
- [x] Gestión de perfil de usuario
- [x] Sistema de notificaciones
- [x] Centro de ayuda con FAQs
- [x] Diseño responsive completo
- [x] Datos JSON estructurados
- [x] Navegación con React Router
- [x] Estado global con Context API

### 🎯 Características Destacadas
- Interfaz moderna y profesional
- Experiencia de usuario intuitiva
- Datos simulados realistas
- Código bien estructurado y tipado
- Componentes reutilizables
- Gestión de estado eficiente

## 📝 Uso de la Aplicación

1. **Registro/Login**: Crea una cuenta o inicia sesión con las credenciales de prueba
2. **Explorar Canchas**: Navega y filtra canchas por deporte, ubicación y precio
3. **Reservar**: Selecciona fecha, hora y procede al pago
4. **Gestionar Reservas**: Ve, modifica o cancela tus reservas
5. **Perfil**: Actualiza tu información y preferencias
6. **Soporte**: Consulta FAQs o contacta para ayuda

## 🤝 Contribución

Este es un proyecto de demostración. Para mejoras o sugerencias:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🎯 Estado del Proyecto

**Estado Actual**: ✅ Producción - Listo para usar

La aplicación está completamente funcional con todas las características solicitadas implementadas y probadas. Incluye datos de demostración y está optimizada para una experiencia de usuario fluida.