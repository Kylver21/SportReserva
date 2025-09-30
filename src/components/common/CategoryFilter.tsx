import { useState } from 'react';
import { Court } from '../../types';

interface CategoryFilterProps {
  courts: Court[];
  onFilterChange: (filteredCourts: Court[], activeCategory: string) => void;
  className?: string;
}

const SPORT_CATEGORIES = [
  { id: 'todos', name: 'Todos', icon: '🏟️' },
  { id: 'fútbol', name: 'Fútbol', icon: '⚽' },
  { id: 'baloncesto', name: 'Baloncesto', icon: '🏀' },
  { id: 'vóley', name: 'Vóley', icon: '🏐' },
  { id: 'tenis', name: 'Tenis', icon: '🎾' },
  { id: 'otros', name: 'Otros', icon: '⚡' }
];

export default function CategoryFilter({ courts, onFilterChange, className = '' }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState('todos');

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    let filteredCourts = courts;
    if (categoryId !== 'todos') {
      filteredCourts = courts.filter(court => court.deporte === categoryId);
    }
    
    onFilterChange(filteredCourts, categoryId);
  };

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'todos') return courts.length;
    return courts.filter(court => court.deporte === categoryId).length;
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorías de Deporte</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SPORT_CATEGORIES.map((category) => {
          const count = getCategoryCount(category.id);
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`relative flex flex-col items-center p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                isActive
                  ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium text-center">{category.name}</div>
              <div className={`text-xs mt-1 px-2 py-1 rounded-full ${
                isActive 
                  ? 'bg-green-200 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {count} cancha{count !== 1 ? 's' : ''}
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Results summary */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {activeCategory === 'todos' 
              ? 'Mostrando todas las canchas' 
              : `Mostrando canchas de ${SPORT_CATEGORIES.find(c => c.id === activeCategory)?.name.toLowerCase()}`
            }
          </span>
          <span className="font-semibold text-green-600">
            {getCategoryCount(activeCategory)} resultado{getCategoryCount(activeCategory) !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}