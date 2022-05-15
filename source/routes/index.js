
// const productRouter = require('./product');
const siteRouter = require('./site');
const adminRouter = require('./admin');
const customerRouter = require('./customer');



function router(app){

    // app.use('/register', registerRouter);

    // app.use('/product', productRouter);
    app.use('/customer',customerRouter);

    app.use('/admin',adminRouter);

    app.use('/',siteRouter);
}
module.exports = router;