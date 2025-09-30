import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { MapPin, Star, Clock, Users } from 'lucide-react';
import Carousel from '../../components/common/Carousel';
import PromotionCard from '../../components/common/PromotionCard';

export default function Home() {
  const { state } = useApp();
  const featuredCourts = state.courts.slice(0, 3);
  const activePromotions = state.promotions.filter(p => p.activa).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Reserva tu Cancha Ideal
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Encuentra y reserva canchas deportivas de calidad cerca de ti
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courts"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Ver Canchas
              </Link>
              {!state.isAuthenticated && (
                <Link
                  to="/register"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  Registrarse Gratis
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Promociones - Carrusel */}
      {activePromotions.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🔥 Ofertas Especiales
              </h2>
              <p className="text-lg text-gray-600">
                Aprovecha estas promociones exclusivas por tiempo limitado
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Carousel 
                autoSlide={true} 
                slideInterval={5000}
                showDots={true}
                showArrows={true}
              >
                {activePromotions.map((promotion) => (
                  <div key={promotion.id} className="px-4">
                    <PromotionCard promotion={promotion} />
                  </div>
                ))}
              </Carousel>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500 mb-4">
                Desliza para ver más ofertas o usa los códigos en tu próxima reserva
              </p>
              <Link
                to="/courts"
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg"
              >
                Explorar Canchas con Ofertas
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Canchas Destacadas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Canchas Más Populares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourts.map((court) => (
              <Link
                key={court.id}
                to={`/courts/${court.id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <img
                  src={court.fotos[0]}
                  alt={court.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{court.nombre}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{court.calificacion}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2 capitalize">{court.deporte}</p>
                  <div className="flex items-center space-x-1 text-gray-500 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{court.ubicacion}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">
                      S/{court.precio_hora}-h
                    </span>
                    <div className="text-sm text-gray-500">
                      {court.disponibilidad.length} días disponibles
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/courts"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Ver Todas las Canchas
            </Link>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{state.courts.length}+</h3>
              <p className="text-gray-600">Canchas Disponibles</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Usuarios Activos</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5000+</h3>
              <p className="text-gray-600">Reservas Completadas</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8</h3>
              <p className="text-gray-600">Calificación Promedio</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para tu próximo partido?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Únete a miles de deportistas que ya reservan con SportReserva
          </p>
          <Link
            to="/courts"
            className="inline-flex items-center px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Buscar Canchas Ahora
          </Link>
        </div>
      </section>
    </div>
  );
}