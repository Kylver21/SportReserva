# 🏆 SportReserva - Plataforma de Reservas de Canchas Deportivas

Una aplicación web completa y moderna desarrollada en React con TypeScript para gestionar reservas de canchas deportivas. La aplicación incluye autenticación de usuarios, gestión de canchas con carrusel de ofertas, sistema de categorización por deportes, reservas en tiempo real, pagos simulados, notificaciones push avanzadas y soporte al cliente completo.

> **Última Actualización**: Septiembre 2025 - Versión 2.0 con navegación SPA mejorada, carousel de promociones, categorización de canchas, notificaciones push avanzadas y corrección de errores de autenticación.

## 🚀 Características Principales

### 🔐 Gestión de Usuarios Avanzada
- Sistema de autenticación persistente con localStorage
- Registro e inicio de sesión con validación en tiempo real
- Perfil de usuario personalizable con historial completo
- Gestión de métodos de pago (Yape, PayPal, Tarjeta)
- Preferencias personalizadas de deportes y ubicaciones
- Navegación protegida con redirección automática

### 🏟️ Gestión de Canchas Inteligente
- **Carrusel de Ofertas**: Promociones destacadas con navegación automática
- **Categorización por Deportes**: Filtros visuales con iconos por deporte
- Filtros avanzados multidimensionales (deporte, ubicación, tamaño, precio)
- Vista detallada con galería interactiva de imágenes
- Información completa: servicios, horarios, calificaciones, reseñas
- Sistema de búsqueda en tiempo real

### 📅 Sistema de Reservas Completo
- Calendario interactivo con disponibilidad en tiempo real
- Validación de conflictos de horarios automática
- Gestión completa de estados: activas, completadas, canceladas
- Historial detallado con estadísticas de uso
- Navegación fluida sin recargas de página (SPA)
- Detalles completos de cada reserva con información expandida

### 💳 Sistema de Pago Integral (Frontend)
- **Integración con Yape**: QR simulado y logo oficial
- **PayPal Integration**: Proceso completo de checkout
- Aplicación automática de códigos promocionales
- Cálculo dinámico de precios y descuentos
- Generación de recibos detallados y confirmaciones
- Validación de CVE en dependencias para seguridad

### 🔔 Notificaciones Push Avanzadas
- **Sistema Enhanced**: Categorización inteligente de notificaciones
- Animaciones fluidas y estados visuales
- Notificaciones en tiempo real por reservas, promociones y sistema
- Centro de notificaciones con historial completo
- Marcado de leído/no leído con persistencia
- Badges de conteo visual

### ⭐ Sistema de Valoraciones Social
- Calificaciones por estrellas con promedio visual
- Comentarios y reseñas detalladas de usuarios
- Sistema de reputación y confianza
- Moderación automática de contenido

### 🎁 Promociones y Ofertas Dinámicas
- **Carrusel Automático**: Rotación de ofertas destacadas
- Códigos de descuento con validación temporal
- Promociones categorizadas por tipo y vigencia
- Sistema de recompensas por fidelidad

### 🆘 Soporte al Cliente Integral
- FAQs organizadas por categorías dinámicas
- Formulario de contacto con validación
- Múltiples canales de comunicación (WhatsApp, Email, Teléfono)
- Sistema de tickets de soporte simulado

## 🛠️ Stack Tecnológico

### Frontend Core
- **React 18.3.1** - Biblioteca principal con Hooks y Context API
- **TypeScript 5.5.3** - Tipado estático para mayor robustez
- **Vite 5.4.2** - Build tool ultra-rápido con HMR
- **React Router DOM 7.9.2** - Navegación SPA avanzada

### Styling & UI
- **Tailwind CSS 3.4.1** - Framework utility-first
- **Lucide React 0.344.0** - Iconos modernos SVG
- **PostCSS 8.4.35** - Procesamiento CSS avanzado
- **Autoprefixer 10.4.18** - Compatibilidad cross-browser

### Development & Quality
- **ESLint 9.9.1** - Linting con reglas React y TypeScript
- **TypeScript ESLint 8.3.0** - Reglas específicas TS
- **Vite Plugin React 4.3.1** - Integración React optimizada

### Additional Libraries
- **Supabase JS 2.57.4** - Preparado para backend futuro
- **jsPDF 3.0.3** - Generación de documentos PDF

## 📁 Arquitectura de Componentes

### 🏗️ Estructura Detallada
```
src/
├── components/
│   └── common/                    # Componentes reutilizables
│       ├── Header.tsx            # Navegación principal con notificaciones
│       ├── Footer.tsx            # Pie de página con enlaces
│       ├── LoadingSpinner.tsx    # Indicador de carga
│       ├── NotificationBell.tsx  # Notificaciones básicas (legacy)
│       ├── EnhancedNotificationBell.tsx  # Sistema avanzado de notificaciones
│       ├── Carousel.tsx          # Carrusel de promociones con auto-slide
│       ├── PromotionCard.tsx     # Tarjetas de ofertas con gradientes
│       └── CategoryFilter.tsx    # Filtros por categoría deportiva
├── context/
│   └── AppContext.tsx            # Estado global con Context API + localStorage
├── data/
│   └── mockData.ts               # Datos simulados con URLs web para deploy
├── pages/
│   ├── Home/
│   │   └── Home.tsx              # Landing con carrusel y promociones
│   ├── Courts/
│   │   └── Courts.tsx            # Listado con filtros por deporte
│   ├── CourtDetail/
│   │   └── CourtDetail.tsx       # Vista detallada con galería
│   ├── Auth/
│   │   ├── Login.tsx             # Autenticación con validación
│   │   └── Register.tsx          # Registro con formulario completo
│   ├── Profile/
│   │   └── Profile.tsx           # Perfil de usuario editable
│   ├── Bookings/
│   │   └── Bookings.tsx          # Mis reservas con filtros y estados
│   ├── BookingDetails/
│   │   └── BookingDetails.tsx    # Detalles completos de reserva
│   ├── Checkout/
│   │   └── Checkout.tsx          # Proceso de pago con validaciones
│   ├── BookingSuccess/
│   │   └── BookingSuccess.tsx    # Confirmación de reserva exitosa
│   └── Support/
│       └── Support.tsx           # Centro de ayuda con FAQs
├── types/
│   └── index.ts                  # Definiciones TypeScript completas
├── utils/
│   └── googleMapCarga.ts         # Utilidades para mapas (preparado)
├── App.tsx                       # Router principal y layout
└── main.tsx                      # Entry point con React 18
```

### 🧩 Componentes Principales

#### **🎠 Carousel Component**
- **Función**: Carrusel automático de promociones
- **Características**: Auto-slide, navegación manual, indicadores
- **Responsive**: Adaptable a móvil y desktop
- **Props**: promotions[], autoSlideInterval, showDots

#### **🏷️ CategoryFilter Component**  
- **Función**: Filtrado visual por deportes
- **Características**: Iconos emoji, contador de canchas, estados activos
- **Deportes**: Fútbol, Básquet, Tenis, Paddle, Vóley
- **Estado**: Sincronizado con filtros de búsqueda

#### **🔔 EnhancedNotificationBell Component**
- **Función**: Sistema avanzado de notificaciones
- **Características**: Categorización, animaciones, contadores
- **Tipos**: Reservas, Promociones, Sistema
- **Persistencia**: LocalStorage con estado read/unread

#### **💳 PromotionCard Component**
- **Función**: Tarjetas visuales de ofertas
- **Características**: Gradientes, badges de expiración, CTAs
- **Estados**: Activa, Próxima a expirar, Expirada
- **Animaciones**: Hover effects y transiciones

#### **📱 Responsive Layout**
- **Header**: Navegación adaptativa con menú hamburguesa
- **Footer**: Enlaces organizados por secciones
- **Grid Systems**: Flexbox y CSS Grid para layouts
- **Breakpoints**: sm, md, lg, xl con Tailwind CSS

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

## 📊 Datos de Demostración Completos

### 👥 Usuarios de Prueba
```javascript
// Credenciales válidas (cualquier contraseña funciona)
const testUsers = [
  { email: "juan@email.com", nombre: "Juan Pérez" },
  { email: "maria@email.com", nombre: "María García" },
  { email: "carlos@email.com", nombre: "Carlos López" },
  { email: "ana@email.com", nombre: "Ana Martínez" }
];
```

### 🎁 Códigos Promocionales Activos
```javascript
const promoCodes = [
  {
    codigo: "PRIMERA20",
    descuento: 20,
    descripcion: "20% descuento en tu primera reserva",
    vigencia: "2025-12-31"
  },
  {
    codigo: "HAPPY30", 
    descuento: 30,
    descripcion: "30% descuento horario 14:00-16:00",
    vigencia: "2025-10-31"
  },
  {
    codigo: "WEEKEND15",
    descuento: 15,
    descripcion: "15% descuento fines de semana",
    vigencia: "2025-11-30"
  },
  {
    codigo: "STUDENT25",
    descuento: 25,
    descripcion: "25% descuento estudiantes",
    vigencia: "2025-12-31"
  }
];
```

### 🏟️ Canchas Disponibles por Deporte
- **⚽ Fútbol**: 6 canchas (Estadio Central, Cancha Norte, etc.)
- **🏀 Básquet**: 4 canchas (Pabellón A, Cancha Techada, etc.) 
- **🎾 Tenis**: 5 canchas (Tenis Club, Arcilla Roja, etc.)
- **🏓 Paddle**: 3 canchas (Paddle Premium, Doble Cristal, etc.)
- **🏐 Vóley**: 2 canchas (Playa Arena, Techada Pro)

### 💳 Métodos de Pago Integrados
- **Yape**: QR simulado con logo oficial
- **PayPal**: Proceso completo de checkout
- **Tarjeta**: Visa, Mastercard, American Express
- **Efectivo**: Pago en recepción (simulado)

## 🎨 Características de Diseño y UX

### 🎭 Sistema de Diseño
- **Paleta de Colores Deportiva**: 
  - Verde principal (#059669) para acciones primarias
  - Azul (#2563eb) para información y estado
  - Naranja (#ea580c) para alertas y promociones
  - Grises escalados para texto y fondos
- **Tipografía**: Sistema de fuentes San Francisco / Segoe UI
- **Espaciado**: Sistema de espaciado consistente 4px, 8px, 16px, 24px
- **Bordes**: Radius 8px, 12px, 16px para suavidad visual

### 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles primero
- **Breakpoints Tailwind**: sm(640px), md(768px), lg(1024px), xl(1280px)
- **Flexbox Layouts**: Sistemas flexibles y adaptativos
- **Touch Friendly**: Botones y elementos táctiles de 44px mínimo

### 🎨 Componentes Visuales
- **Cards Elevadas**: Shadows sutiles con hover effects
- **Gradientes**: Promociones con gradientes vibrantes
- **Animaciones Micro**: Transiciones suaves en hover y focus
- **Loading States**: Spinners y skeleton screens
- **Empty States**: Ilustraciones para estados vacíos

### 🧭 Navegación UX
- **SPA Navigation**: Sin recargas, navegación fluida
- **Breadcrumbs**: Rutas claras en secciones profundas
- **Back Buttons**: Navegación intuitiva hacia atrás
- **Active States**: Indicadores visuales de página actual

## 🔧 Funcionalidades Implementadas

### ✅ Core Features Completadas
- [x] **Sistema de autenticación persistente** con localStorage y validación
- [x] **Carrusel de promociones** con auto-slide y navegación manual
- [x] **Categorización por deportes** con filtros visuales e iconos
- [x] **Navegación SPA** sin recargas, usando React Router
- [x] **Notificaciones push avanzadas** con categorización y animaciones
- [x] **Gestión completa de canchas** con filtros multidimensionales
- [x] **Sistema de reservas robusto** con validación de conflictos
- [x] **Proceso de pago completo** con Yape, PayPal y validaciones
- [x] **Gestión de perfil avanzada** con preferencias y historial
- [x] **Centro de ayuda integral** con FAQs categorizadas
- [x] **Diseño responsive completo** optimizado para todos los dispositivos
- [x] **Estado global persistente** con Context API + localStorage
- [x] **Integración de imágenes web** para deploy en Vercel/Netlify

### 🚀 Mejoras Recientes (v2.0)
- [x] **Fix navegación SPA**: Eliminadas recargas de página innecesarias
- [x] **Carousel automático**: Promociones con rotación cada 5 segundos
- [x] **Filtros deportivos**: Categorización visual con emojis e iconos
- [x] **Notificaciones enhanced**: Sistema avanzado con animaciones
- [x] **Autenticación robusta**: Persistencia mejorada entre sesiones
- [x] **Detalles de reserva**: Vista expandida con información completa
- [x] **URLs de imágenes web**: Compatible con despliegue en la nube
- [x] **Limpieza de código**: Eliminación de código duplicado y unused

### 🎯 Características Destacadas Técnicas
- **TypeScript Strict**: Tipado completo sin any types
- **Component Architecture**: Componentes reutilizables y modulares
- **State Management**: Context API con reducers complejos
- **Performance**: Lazy loading y optimizaciones de renderizado
- **Error Handling**: Manejo elegante de errores y estados de carga
- **Accessibility**: ARIA labels y navegación por teclado
- **SEO Ready**: Meta tags y estructura semántica
- **PWA Features**: Preparado para Service Workers

### 📊 Métricas de Calidad
- **Components**: 15+ componentes reutilizables
- **Pages**: 10 páginas principales completamente funcionales
- **TypeScript Coverage**: 100% con interfaces completas
- **Responsive Breakpoints**: 4 breakpoints totalmente responsive
- **Loading States**: Estados de carga en todas las operaciones
- **Error Boundaries**: Manejo de errores en componentes críticos

## 📝 Uso de la Aplicación

1. **Registro/Login**: Crea una cuenta o inicia sesión con las credenciales de prueba
2. **Explorar Canchas**: Navega y filtra canchas por deporte, ubicación y precio
3. **Reservar**: Selecciona fecha, hora y procede al pago
4. **Gestionar Reservas**: Ve, modifica o cancela tus reservas
5. **Perfil**: Actualiza tu información y preferencias
6. **Soporte**: Consulta FAQs o contacta para ayuda

## 🤝 Contribución

Este es un proyecto de demostración profesional. Para mejoras o sugerencias:

1. **Fork** el proyecto desde GitHub
2. **Clone** tu fork: `git clone https://github.com/tuusuario/SportReserva.git`
3. **Crea** una rama para tu feature: `git checkout -b feature/AmazingFeature`
4. **Commit** tus cambios: `git commit -m 'feat: add amazing feature'`
5. **Push** a la rama: `git push origin feature/AmazingFeature`
6. **Abre** un Pull Request con descripción detallada

### � Estándares de Contribución
- **TypeScript**: Código 100% tipado sin `any`
- **ESLint**: Seguir reglas establecidas
- **Commits**: Conventional Commits (feat, fix, docs, style, refactor)
- **Testing**: Agregar tests para nuevas funcionalidades
- **Documentation**: Actualizar README si es necesario

## �📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Ver el archivo `LICENSE` para más detalles.

```
MIT License - Libre para uso comercial y personal
Copyright (c) 2025 SportReserva
```

## 👨‍💻 Autor

**Desarrollado por**: [Kylver21](https://github.com/Kylver21)
- 🌐 **GitHub**: [@Kylver21](https://github.com/Kylver21)
- 📧 **Email**: Contacto disponible en perfil de GitHub
- 💼 **Portfolio**: Proyectos en React, TypeScript y desarrollo web

## 🙏 Agradecimientos

- **React Team** por la increíble biblioteca
- **Tailwind CSS** por el framework de estilos
- **Lucide** por los iconos SVG de alta calidad
- **Vite** por la herramienta de build ultrarrápida
- **TypeScript** por el sistema de tipos robusto
- **Vercel** por el hosting y deploy sencillo

---

<div align="center">

### 🎯 **SportReserva v2.0** - Plataforma Completa de Reservas Deportivas

**Hecho con ❤️ y ⚽ para la comunidad deportiva**

[🚀 Demo Live](https://tu-deploy-url.vercel.app) | [📱 Mobile Preview](https://tu-deploy-url.vercel.app) | [📖 Documentation](./README.md)

</div>

## 🎯 Estado del Proyecto

**Estado Actual**: ✅ **Producción v2.0** - Completamente funcional y optimizado

### 📈 Versiones y Changelog

#### **v2.0 (Septiembre 2025) - Actual**
- ✅ **Carousel de promociones** con auto-slide y navegación
- ✅ **Categorización por deportes** con filtros visuales
- ✅ **Sistema de notificaciones avanzado** con animaciones
- ✅ **Navegación SPA optimizada** sin recargas de página
- ✅ **Autenticación persistente mejorada**
- ✅ **Integración de imágenes web** para deploy en Vercel
- ✅ **Detalles de reserva expandidos**
- ✅ **Limpieza de código y optimizaciones**

#### **v1.0 (Base)**
- ✅ Sistema de autenticación básico
- ✅ CRUD de canchas y reservas
- ✅ Proceso de pago frontend
- ✅ Diseño responsive
- ✅ Context API para estado global

### 🚀 Deployment Ready
- **Vercel**: Configurado con URLs web para imágenes
- **Netlify**: Compatible con SPA routing
- **GitHub Pages**: Build estático optimizado
- **Docker**: Dockerfile preparado para contenedores

### 📱 Compatibilidad
- **Navegadores**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Móviles**: iOS 13+, Android 8+
- **Tablets**: iPad OS 13+, Android tablets
- **Desktop**: Windows 10+, macOS 10.15+, Linux

### 🔮 Roadmap Futuro
- [ ] **Backend Integration**: Supabase/Firebase con autenticación real
- [ ] **Payment Gateway**: Integración real con Stripe/PayPal
- [ ] **Google Maps**: Ubicaciones reales de canchas
- [ ] **Push Notifications**: Notificaciones web nativas
- [ ] **PWA Complete**: Service Workers y offline support
- [ ] **Admin Panel**: Gestión de canchas y reservas
- [ ] **Analytics**: Dashboard de métricas y uso
- [ ] **Multi-idioma**: Internacionalización i18n