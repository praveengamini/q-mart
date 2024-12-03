import React, { useEffect, useState } from 'react';
import bannerOne from '../../assets/banner-1.webp';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import { Button } from '@/components/ui/button';
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightningIcon, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts } from '@/store/shop/product-slice';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { SiPuma, SiAdidas, SiNike, SiZara, SiHandm } from "react-icons/si";
import { TbClothesRack } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import ProductDetailsDialog  from '../../components/shopping-view/product-details';
import { addToCart } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
const ShoppingHome = () => {
  const navigate = useNavigate();
  const {toast} = useToast();
  const slides = [bannerOne, bannerTwo, bannerThree];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { productList } = useSelector(state => state.shoppingProduct);

  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightningIcon },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];

  const brands = [
    { id: "nike", label: "Nike", icon: SiNike },
    { id: "adidas", label: "Adidas", icon: SiAdidas },
    { id: "puma", label: "Puma", icon: SiPuma },
    { id: "levi", label: "Levi's", icon: TbClothesRack },
    { id: "zara", label: "Zara", icon: SiZara },
    { id: "h&m", label: "H&M", icon: SiHandm },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }));
  }, [dispatch]);

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }));
  }, [dispatch]);
  const { user } = useSelector((state) => state.auth);
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative w-full h-[600px] overflow-hidden'>
        {
          slides.map((slide, index) => (
            <img
              src={slide}
              key={index}
              className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
            />
          ))
        }
        <Button variant="outline" size="icon"
          className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white'
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)} // Fixed here
        >
          <ChevronLeftIcon />
        </Button>
        <Button variant="outline" size="icon"
          className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white'
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <motion.section 
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.7 }}
      className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by category</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {categoriesWithIcon.map((item) => (
              <Card
                onClick={() => handleNavigateToListingPage(item, 'category')}
                key={item.id} className='cursor-pointer hover:shadow-lg transition-lg'>
                <CardContent className='flex flex-col items-center justify-center p-5'>
                  <item.icon className='w-12 h-12 mb-4 text-primary' />
                  <span className='font-bold'>{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.7 }}
      className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by Brand</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {brands.map((item) => (
              <Card
                onClick={() => handleNavigateToListingPage(item, 'brand')}
                key={item.id} className='cursor-pointer hover:shadow-lg transition-lg'>
                <CardContent className='flex flex-col items-center justify-center p-5'>
                  <item.icon className='w-12 h-12 mb-4 text-primary' />
                  <span className='font-bold'>{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.7 }}
       className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-8'>Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
              <ShoppingProductTile
                key={productItem._id}
                product={productItem}
                handleGetProductDetails={() => handleOpenDialog(productItem)}
                displayCart = {false}
              />
            ))
            : "Nothing to show"}
        </div>
      </motion.section>
      {isDialogOpen && (
        <ProductDetailsDialog
          open={isDialogOpen}
          setOpen={handleCloseDialog}
          productDetails={selectedProduct}
        />
      )}
    </div>
  );
};

export default ShoppingHome;
