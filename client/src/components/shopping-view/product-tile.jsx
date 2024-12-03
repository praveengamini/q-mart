import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { brandOptionsMap, categoryOptionsMap } from '@/config';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';

const ShoppingProductTile = ({ product, handleGetProductDetails, handleAddtoCart, loading ,displayCart}) => {
  const { title, image, category, brand, price, salePrice, totalStock } = product || {};

  const isOutOfStock = totalStock === 0;
  const isLowStock = totalStock > 0 && totalStock < 10;
  const isOnSale = salePrice > 0;
  return (
    <motion.div
      className="relative"
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.7 }}
    >
      <Card>
        <div onClick={() => handleGetProductDetails(product?._id)}>
          <div>
            <img
              src={image}
              alt={title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
            {isOutOfStock ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Out Of Stock
              </Badge>
            ) : isLowStock ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                {`Only ${totalStock} items left`}
              </Badge>
            ) : isOnSale ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Sale
              </Badge>
            ) : null}
          </div>
        </div>

        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{title || 'Unknown Product'}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {categoryOptionsMap[category] || 'Uncategorized'}
            </span>
            <span className="text-sm text-muted-foreground">
              {brandOptionsMap[brand] || 'Unknown Brand'}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-lg font-semibold text-primary ${isOnSale ? 'line-through' : ''}`}>
              &#8377;{price || '0'}
            </span>
            {isOnSale && (
              <span className="text-lg font-semibold text-primary">
                &#8377;{salePrice}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter  className={`${!displayCart ? 'hidden': '' }`}>
          <Button
            className=" w-full"
            disabled={isOutOfStock || loading}
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            aria-label={isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ShoppingProductTile;