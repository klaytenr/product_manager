var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/products');
app.use(express.static(__dirname + '/product/dist'));

var Schema = mongoose.Schema;
var ProductSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 4},
    price: {type: Number, required: true},
    image: {type: String},
}, {timestamps: true});
var Product = mongoose.model('Product', ProductSchema);
mongoose.Promise = global.Promise;

app.get('/product', function(req, res){
    Product.find({}, function(err, products){
        if(err){
            res.json({message:'Error', error:err})
        }else{
            res.json({message:'Find All Complete', data: products});
        }
    })
})
app.get('/product/:id', function(req, res){
    Product.findOne({_id: req.params.id}, function(err, product){
        if(err){
            res.json({message:'Error', error:err})
        }else{
            res.json({message:'Find One Complete', data: product});
        }
    })
})
app.post('/product', function(req, res){
    var product = new Product(req.body);
    product.save(function(err){
        if(err){
            res.json({message:'Error', error:err});
        }else{
            res.json({message:'Creation Complete', data:product});
        }
    })
})
app.delete('/product/:id', function(req, res){
    Product.findOne({_id:req.params.id}, function(err, product){
        if(err){
            res.json({message:'Error'});
        }else{
            product.remove();
            res.json({message:'Deletion Successful'});
        }
    })
})
app.put('/edit/:id', function(req, res) {
    Product.findOne({_id:req.params.id}, function(err, product){
        console.log(req.body);
        if(req.body.title.length < 4){
            res.json({message:"Error", error:'Path `title` (' + req.body.name + ') is shorter than the minimum allowed length (4).'});
        }else{
            product.title = req.body.title;
            product.price = req.body.price;
            product.image = req.body.image;
            product.save();
            res.json({message:'Update Successful', product: product});
        }
    })
})

app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./product/dist/index.html'));
})
app.listen(8000, function(){
    console.log('Listening on port 8000')
});