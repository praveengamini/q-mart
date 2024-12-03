import { Button } from '../../components/ui/button'
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <motion.div
    variants={fadeIn("up", 0.2)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.7 }}
     className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>  
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              &#8377;{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">&#8377;{product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </motion.div>
  );
}

export default AdminProductTile;