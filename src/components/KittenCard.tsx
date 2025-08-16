import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart } from 'lucide-react';
import { Kitten } from '@/types/kitten';
import { useCart } from '@/contexts/CartContext';

interface KittenCardProps {
  kitten: Kitten;
}

const KittenCard: React.FC<KittenCardProps> = ({ kitten }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    console.log('Adding kitten to cart from card:', kitten.name);
    addToCart(kitten);
  };

  return (
    <Card className="w-full max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={kitten.image}
            alt={kitten.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
          {!kitten.available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
              <Badge variant="destructive">No disponible</Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{kitten.name}</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Raza:</span>
            <span className="font-medium">{kitten.breed}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Edad:</span>
            <span className="font-medium">{kitten.age}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {kitten.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {kitten.personality.map((trait, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {trait}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">
          ${kitten.price.toLocaleString()}
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={!kitten.available}
          className="flex items-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Adoptar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KittenCard;