
var myApp = angular.module('TodoApp', ['ui.sortable', 'ngAnimate']);

myApp.controller('TodoController', function($scope, $http) {
	$http.get('todos').success(function(todos) {
		$scope.todos = todos;
	});

	$scope.animate = false;

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
}); //myApp.controller

myApp.directive("animateSvgPath", function($animate) {
	return {
		scope: {
			'animateSvgPath': '=',
			'deleteTodo': '&'
		},
		link: function(scope, element, attributes) {
			scope.$watch("animateSvgPath", function(animate) {
				if(animate) {
					$animate.addClass(element, 'animate-path').then(function() {
						if(jQuery(element).css('stroke-dashoffset') == '0px') {
							scope.deleteTodo();
						}
					});
				}
				if(!animate) {
					$animate.removeClass(element, 'animate-path').then();
				}
			});
		}
	}
});

// app.animation(".draw", function() {
//   return {
//     addClass: function(element, className, done) {
//       //
//       jQuery(element).animate({
//         "stroke-dashoffset": 0
//       }, 3000, "easeOutCubic", function() {
//         console.log('finished');
//       });
      
//       return function(cancel) {
//         if(cancel) {
//           jQuery(element).stop();
//         }
//       }
//     },
//     removeClass: function(element, className, done) {
//       //
//       jQuery(element).animate({
//         "stroke-dashoffset": 119
//       }, 350, "linear", function() {
//         console.log('canceled');
//       });
      
//       return function(cancel) {
//         jQuery(element).stop();
//       }
//     }
//   }
// });