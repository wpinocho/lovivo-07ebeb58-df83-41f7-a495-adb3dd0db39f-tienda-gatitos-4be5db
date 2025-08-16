import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import KittenCard from './KittenCard';
import { kittens } from '@/data/kittens';
import { Kitten } from '@/types/kitten';

const KittenStore: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [breedFilter, setBreedFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  console.log('Rendering KittenStore with', kittens.length, 'kittens');

  const filteredKittens = kittens.filter((kitten: Kitten) => {
    const matchesSearch = kitten.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kitten.breed.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBreed = breedFilter === 'all' || kitten.breed === breedFilter;
    
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'low' && kitten.price < 800) ||
                        (priceFilter === 'medium' && kitten.price >= 800 && kitten.price < 1200) ||
                        (priceFilter === 'high' && kitten.price >= 1200);

    return matchesSearch && matchesBreed && matchesPrice && kitten.available;
  });

  const breeds = [...new Set(kittens.map(kitten => kitten.breed))];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center py-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🐱 Gatitos Felices
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Encuentra tu compañero felino perfecto
        </p>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Todos nuestros gatitos están sanos, vacunados y listos para encontrar un hogar lleno de amor.
          Cada adopción incluye certificado de salud y seguimiento veterinario.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nombre o raza..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={breedFilter} onValueChange={setBreedFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Raza" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las razas</SelectItem>
              {breeds.map(breed => (
                <SelectItem key={breed} value={breed}>{breed}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los precios</SelectItem>
              <SelectItem value="low">Menos de $800</SelectItem>
              <SelectItem value="medium">$800 - $1,200</SelectItem>
              <SelectItem value="high">Más de $1,200</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          Gatitos Disponibles ({filteredKittens.length})
        </h2>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Más filtros
        </Button>
      </div>

      {/* Kittens Grid */}
      {filteredKittens.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😿</div>
          <h3 className="text-xl font-semibold mb-2">No se encontraron gatitos</h3>
          <p className="text-gray-500">
            Intenta ajustar tus filtros de búsqueda
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredKittens.map((kitten) => (
            <KittenCard key={kitten.id} kitten={kitten} />
          ))}
        </div>
      )}
    </div>
  );
};

export default KittenStore;