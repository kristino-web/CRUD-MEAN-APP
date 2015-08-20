var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contato',['contato']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/listacontato', function(req, res){
	console.log('recebendo request de get');
	
	db.contato.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});

});

app.post('/listacontato', function(req, res){
	console.log(req.body);
	db.contato.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/listacontato/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contato.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/listacontato/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contato.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/listacontato/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.nome);
	db.contato.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {nome: req.body.nome, email: req.body.email, celular: req.body.celular}},
		new: true}, function(err, doc){
			res.json(doc);
		
	});
});




app.listen(3000);
console.log("server runing at port 3000" );