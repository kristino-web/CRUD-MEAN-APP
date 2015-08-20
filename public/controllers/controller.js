var app = angular.module('contApp', []);

app.controller('appController', ['$scope','$http', function($scope, $http){
	console.log('Ola controller');
	$scope.showEdit = false;

	var refresh = function(){
		$http.get('/listacontato').success(function(response){
			console.log('recebi os dados que pedi');
			$scope.pessoas = response;
		});
	}
	
	refresh();

	$scope.Add = function(){
		$scope.showEdit = true;
	}

	$scope.addContato = function(contato){
		$http.post('/listacontato', contato).success(function(response){
			console.log(response);
			$scope.showEdit = false;
			refresh();
		});
	}
	
	$scope.remove = function(id){
		console.log(id);
		$http.delete('/listacontato/' + id).success(function(response){
			refresh();
		});
	};

	$scope.edite = function(id){
		$scope.showEdit = true;
		console.log('botao editar');
		$http.get('/listacontato/' + id).success(function(response){
			$scope.contato = response;
		});
	};

	$scope.update = function(){
		console.log($scope.contato._id);
		$http.put('/listacontato/' + $scope.contato._id, $scope.contato).success(function(response){
			refresh();
			$scope.contato = "";
		});
		$scope.showEdit= false;
	}

}]);
