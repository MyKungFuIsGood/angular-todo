$("path").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
    console.log('callback');
    $('.delete-icon').hide();
});

var myApp = angular.module('TodoApp', ['ui.sortable']);

myApp.controller('TodoController', function($scope, $http) {
	$http.get('todos').success(function(todos) {
		$scope.todos = todos;
	});

	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo) {
			count += todo.completed ? 0 : 1;
		});
		return count;
	};

	$scope.addTodo = function(todo) {
		var todo = {
			body: $scope.newTodoText,
			completed: false,
		};
		$http.post('todo', todo).success(function(data) {
			$scope.todos.push(todo);
			$scope.newTodoText = null;
		}).error(function(data) {
			//
		});
	};

	$scope.checkTodo = function(todo) {
		$http.put('todo/' + todo.id, todo).success(function(data) {
			//
		}).error(function(data) {
			//
		});		
	};

	$scope.deleteTodo = function(todo) {
		$http.delete('todo/' + todo.id).success(function() {
			$scope.todos.splice($scope.todos.indexOf(todo), 1);
		}).error(function(data) {
			// print out error
		});
	};

	$scope.todoSortable = {
		// containment: "parent", // don't let us move object outside of parent container
		cursor: "move",
		tolerance: "pointer",
		update: function(e, ui) {
		},
		stop: function(e, ui) {
			angular.forEach($scope.todos, function(todo, index) {
				$scope.todos[index].order = index;
				$http.put('todo/' + todo.id, todo).success(function(data) {
					//
				}).error(function(data) {
					//
				});
			});
		}
	};
});

