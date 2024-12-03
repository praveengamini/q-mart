const express =  require('express');
const mongoose = require('mongoose');
const cookieParser  = require('cookie-parser');
const cors =  require('cors');
const adminProductsRouter  = require('./routes/admin/products-routes.js')
const authRouter = require('./routes/auth/auth-routes.js');
const shopProductsRouter = require('./routes/shop/products-routes.js')
const shopCartRouter = require('./routes/shop/cart-routes.js')
const shopAddressRouter = require('./routes/shop/address-routes.js')
mongoose.connect("mongodb+srv://praveengamini:Gamini__124@cluster0.bazrh.mongodb.net/")
.then(() => console.log('Connected to MongoDB')).catch((error)=>console.log(error))

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods :  ['GET', 'POST','DELETE','PUT'],
        allowedHeaders:[
            "content-type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials : true

    })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRouter);
app.use('/api/admin/products',adminProductsRouter)
app.use("/api/shop/products",shopProductsRouter)
app.use("/api/shop/cart",shopCartRouter)
app.use("/api/shop/address",shopAddressRouter)
app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server is running on port ${PORT}`);
})
