import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, Filter, MapPin, Star, DollarSign } from 'lucide-react';

export default function Courts() {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const deportes = [...new Set(state.courts.map(court => court.deporte))];
  const ubicaciones = [...new Set(state.courts.map(court => court.ubicacion))];
  const tamaños = [...new Set(state.courts.map(court => court.tamaño))];

  const filteredCourts = useMemo(() => {
    return state.courts.filter(court => {
      const matchesSearch = court.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          court.deporte.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          court.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDeporte = !state.searchFilters.deporte || court.deporte === state.searchFilters.deporte;
      const matchesUbicacion = !state.searchFilters.ubicacion || court.ubicacion === state.searchFilters.ubicacion;
      const matchesTamaño = !state.searchFilters.tamaño || court.tamaño === state.searchFilters.tamaño;
      const matchesPrecio = court.precio_hora <= state.searchFilters.precioMax;

      return matchesSearch && matchesDeporte && matchesUbicacion && matchesTamaño && matchesPrecio;
    });
  }, [state.courts, state.searchFilters, searchTerm]);

  const updateFilter = (filterName: string, value: string | number) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: { [filterName]: value }
    });
  };

  const clearFilters = () => {
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: {
        deporte: '',
        ubicacion: '',
        tamaño: '',
        precioMax: 1000,
      }
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Encuentra tu Cancha Ideal
          </h1>
          <p className="text-gray-600">
            Descubre y reserva las mejores canchas deportivas en tu área
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, deporte o ubicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
            {(state.searchFilters.deporte || state.searchFilters.ubicacion || state.searchFilters.tamaño || state.searchFilters.precioMax < 1000) && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deporte
                </label>
                <select
                  value={state.searchFilters.deporte}
                  onChange={(e) => updateFilter('deporte', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Todos</option>
                  {deportes.map(deporte => (
                    <option key={deporte} value={deporte} className="capitalize">
                      {deporte}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación
                </label>
                <select
                  value={state.searchFilters.ubicacion}
                  onChange={(e) => updateFilter('ubicacion', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Todas</option>
                  {ubicaciones.map(ubicacion => (
                    <option key={ubicacion} value={ubicacion}>
                      {ubicacion}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tamaño
                </label>
                <select
                  value={state.searchFilters.tamaño}
                  onChange={(e) => updateFilter('tamaño', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Todos</option>
                  {tamaños.map(tamaño => (
                    <option key={tamaño} value={tamaño}>
                      {tamaño}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio máximo: S/{state.searchFilters.precioMax}/h
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={state.searchFilters.precioMax}
                  onChange={(e) => updateFilter('precioMax', parseInt(e.target.value))}
                  className="w-full accent-green-600"
                />
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredCourts.length} canchas encontradas
          </p>
        </div>

        {/* Courts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourts.map((court) => (
            <div
              key={court.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={court.fotos[0]}
                  alt={court.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {court.deporte}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{court.calificacion}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{court.nombre}</h3>
                <div className="flex items-center space-x-1 text-gray-500 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{court.ubicacion}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {court.descripcion}
                </p>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-600">S/{court.precio_hora}/h</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {court.tamaño}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {court.disponibilidad.length} días disponibles
                  </div>
                  <Link
                    to={`/courts/${court.id}`}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron canchas
            </h3>
            <p className="text-gray-600 mb-4">
              Intenta ajustar tus filtros de búsqueda
            </p>
            <button
              onClick={clearFilters}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}