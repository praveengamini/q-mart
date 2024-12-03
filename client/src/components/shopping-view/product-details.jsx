import React from 'react'
import { Dialog,DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import {Separator } from '../ui/separator'
import { Avatar,AvatarFallback } from '../ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import {StarIcon} from 'lucide-react'
import {Input} from  '../ui/input'
import { setProductDetails } from '@/store/shop/product-slice'
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast, useToast } from '@/hooks/use-toast'
const ProductDetailsDiaolog = ({open,setOpen,productDetails}) => {
const {user} = useSelector((state) => state.auth)
const { cartItems } = useSelector((state) => state.shopCart);
const {toast} = useToast();
const dispatch = useDispatch();
    function handleDialogClose()
    {
        setOpen(false)
        dispatch(setProductDetails(null))
    }
    function handleAddtoCart(getCurrentProductId, getTotalStock) {
      let getCartItems = cartItems.items || [];
  
      if (getCartItems.length) {
        const indexOfCurrentItem = getCartItems.findIndex(
          (item) => item.productId === getCurrentProductId
        );
        if (indexOfCurrentItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });
  
            return;
          }
        }
      }
  
      dispatch(
        addToCart({
          userId: user?.id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({
            title: "Product is added to cart",
          });
        }
      });
    }
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
    <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={productDetails?.image}
          alt={productDetails?.title}
          width={600}
          height={600}
          className="aspect-square w-full object-cover"
        />
      </div>
      <div className="">
        <div>
          <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
          <p className="text-muted-foreground text-2xl mb-5 mt-4">
            {productDetails?.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            className={`text-3xl font-bold text-primary ${
              productDetails?.salePrice > 0 ? "line-through" : ""
            }`}
          >
             &#8377;{productDetails?.price}
          </p>
          {productDetails?.salePrice > 0 ? (
            <p className="text-2xl font-bold text-muted-foreground">
                &#8377;{productDetails?.salePrice}
            </p>
          ) : null}

        </div>
        <div className='flex gap-3 mt-2'>
        <div className='flex items-center gap-0.5'>
                    <StarIcon className='w-5 h-5 fill-primary'/>
                    <StarIcon className='w-5 h-5 fill-primary'/>
                    <StarIcon className='w-5 h-5 fill-primary'/>
                    <StarIcon className='w-5 h-5 fill-primary'/>
                    <StarIcon className='w-5 h-5 fill-primary'/>
        </div>
        <p>(4.5)</p>
        </div>
          <Button className='mt-5 w-full h-[3rem] mb-5'    
            onClick = {()=>handleAddtoCart(productDetails?._id)}
          >
            Add to Cart
          </Button>
          <Separator />
          <div className='max-h-[300px] overflow-auto'>
            <h2 className='text-xl font-bold mb-4'>Reviews</h2>
            <div className='flex gap-4'>
                <Avatar>
                    <AvatarFallback className= 'w-10 h-10 border'>
                            {user.userName[0]}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h3 className='font-bold'>
                        {user.userName}
                    </h3>
                </div>
                <div className='flex items-center gap-0.5'>
                    <StarIcon className='w-5 h-5 fill-primary'/>
                    <StarIcon className='w-5 h-5 fill-primary'/>
                    <StarIcon className='w-5 h-5 fill-primary'/>
                    <StarIcon className='w-5 h-5 fill-primary'/>
                    <StarIcon className='w-5 h-5 fill-primary'/>
                </div>
                <p className='text-muted'>This is an  amazing product!</p>
            </div>
            <div className='mt-6 flex gap-2'></div>
            <div className='flex'>
            <Input   placeholder='Write a review...' />
            <Button>Submit</Button>
            </div>
          </div>
        </div>
        </DialogContent>
      </Dialog>   
  )
}

export default ProductDetailsDiaolog
