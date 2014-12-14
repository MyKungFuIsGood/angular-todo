
var myApp = angular.module('TodoApp', ['ui.sortable', 'ngAnimate']);

myApp.controller('TodoController', function($scope, $http) {
	$scope.deleting = false;

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
			order: $scope.todos.length - 1,
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
			$scope.todos.splice($scope.todos.indexOf(todo), 1);
		// $http.delete('todo/' + todo.id).success(function() {
		// 	$scope.todos.splice($scope.todos.indexOf(todo), 1);
		// }).error(function(data) {
		// 	// print out error
		// });
	};

	$scope.confirmDelete = function(todo) {
		$scope.deleting = !$scope.deleting;
	}

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
}); //myApp.controller

myApp.directive("confirmDelete", function($animate) {
	return function(scope, element, attrs) {
		scope.$watch(attrs.confirmDelete, function(newVal) {
			if(newVal) {
				$animate.addClass(element, "draw");
			} else {
				$animate.removeClass(element, "draw");
			}
		});
	}
});

myApp.animation(".draw", function() {
  return {
    // removeClass: function(element, className, done) {
    //   jQuery(element).animate({
    //     "stroke-dashoffset": 119
    //   }, 350, "linear", function() {
    //     console.log('canceled');
    //   });
      
    //   return function(cancel) {
    //   	if(cancel) {
	   //      jQuery(element).stop();
    //   	}
    //   }
    // },
    addClass: function(element, className, done) {
      jQuery(element).stop().animate({
        "stroke-dashoffset": 0
      }, 3000, "easeOutCubic", function() {

      });
      
      return function(cancel) {
        if(cancel) {
          jQuery(element).stop().animate({
		        "stroke-dashoffset": 119
		      }, 350, "linear", function() {

		      });
        }
      }
    },
  }
});