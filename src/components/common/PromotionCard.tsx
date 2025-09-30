import { Calendar, Percent } from 'lucide-react';
import { Promotion } from '../../types';

interface PromotionCardProps {
  promotion: Promotion;
  className?: string;
}

export default function PromotionCard({ promotion, className = '' }: PromotionCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const isExpiringSoon = () => {
    const today = new Date();
    const vigencia = new Date(promotion.vigencia);
    const diffDays = Math.ceil((vigencia.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <div className={`bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 ${className}`}>
      <div className="relative">
        <img
          src={promotion.imagen}
          alt={promotion.titulo}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Discount Badge */}
        <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-2 rounded-full shadow-lg">
          <div className="flex items-center space-x-1">
            <Percent className="w-4 h-4" />
            <span className="font-bold text-lg">{promotion.descuento}% OFF</span>
          </div>
        </div>

        {/* Expiring Soon Badge */}
        {isExpiringSoon() && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            ¡Por tiempo limitado!
          </div>
        )}
      </div>

      <div className="p-6 text-white">
        <h3 className="text-xl font-bold mb-3">{promotion.titulo}</h3>
        <p className="text-white/90 mb-4 leading-relaxed">{promotion.descripcion}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
            <div className="text-xs text-white/80 mb-1">Código</div>
            <div className="font-mono font-bold text-yellow-300">{promotion.codigo}</div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center text-white/80 text-sm mb-1">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Válido hasta</span>
            </div>
            <div className="text-white font-semibold text-sm">
              {formatDate(promotion.vigencia)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
            Usar Código
          </button>
          <div className="text-white/80 text-sm">
            {isExpiringSoon() ? (
              <span className="text-yellow-300 font-semibold">¡Expira pronto!</span>
            ) : (
              <span>Promoción activa</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}