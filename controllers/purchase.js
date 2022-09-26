
const Razorpay = require('razorpay');
const Order = require('../models/orders')


exports.purchasepremium = async (req, res,next) => {
    console.log("nice")
    try {
        var rzp = new Razorpay({
            key_id: "rzp_test_ELVkfWtEG6Snzw",
            key_secret: "z34LnYFQw0xEUYS9cTSqvGfa"
        })
        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            console.log("New order")
            if(err) {
                throw new Error(err);
            }
            req.user.createOrder({ orderid: order.id, status: 'PENDING'})
            .then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Sometghing went wrong', error: err})
    }
}



exports.updateTransactionStatus = async (req, res,next ) => {
    try {
        const { payment_id, order_id} = req.body;
        Order.findOne({where : {orderid : order_id}}).then(order => {
            order.update({ paymentid: payment_id, status: 'SUCCESSFUL'})
            .then(() => {
                req.user.update({ispremiumuser: true})
                return res.status(202).json({sucess: true, message: "Transaction Successful"});
            })
            .catch((err)=> {
                throw new Error(err);
            })
        })
        .catch(err => {
            throw new Error(err);
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

    }
}

