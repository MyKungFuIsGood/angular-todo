<!DOCTYPE html>
<html lang='en' ng-app="TodoApp">

<head>
	<title>Angular Todo - Fast!</title>
	<link rel='stylesheet' type='text/css' href='[[ asset("vendor/bootstrap/dist/css/bootstrap.min.css")]]'>
	<link rel='stylesheet' type='text/css' href='[[ asset("assets/css/main.css") ]]'>
</head>

<body ng-controller='TodoController'>

	<div class="container">
		<h1>Todo app<small ng-if="remaining()">( {{ remaining() }} remaining)</small></h1>

		<input class="form-control" placeholder="Filter Todos" ng-model="search"></input>

		<form class="form-inline" role="form" ng-model="newTodo"
			ng-submit="addTodo()">
			<input type="text" placeholder="Add new task" class="form-control"
				ng-model="newTodoText">
			<button class="btn btn-default">Add task</button>
		</form>

		<ul class="list-unstyled" ui-sortable="todoSortable" ng-model="todos">
			<li ng-repeat="todo in todos | filter:search">
				<div class="checkbox">
					<label>
						<input type="checkbox" ng-checked="todo.completed" 
							ng-model="todo.completed" 
							ng-click="checkTodo(todo)">
						{{ todo.body }}
					</label>
					<button class="delete-icon" 
						ng-mousedown="confirmDelete(todo)"
						ng-mouseup="confirmDelete(todo)">
 						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" enable-background="new 0 0 45 45">
							<line x1="15" y1="15" x2="25" y2="25" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-miterlimit="10"></line>
							<line x1="25" y1="15" x2="15" y2="25" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-miterlimit="10"></line>
							<circle class="circle" cx="20" cy="20" r="19" opacity="0" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-miterlimit="10" fill="none"></circle>
							<path confirm-delete="todo.delete" d="M20 1c10.45 0 19 8.55 19 19s-8.55 19-19 19-19-8.55-19-19 8.55-19 19-19z" class="progress" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-miterlimit="10" fill="none"></path>
						</svg>
					</button>
			</li>
		</ul>
	</div>

	<script src='[[ asset("vendor/jquery/dist/jquery.js") ]]'></script>
	<script src='[[ asset("vendor/jquery-ui/jquery-ui.js") ]]'></script>
	<script src='[[ asset("vendor/angularjs/angular.js") ]]'></script>
	<script src='[[ asset("vendor/angular-ui-sortable/sortable.js") ]]'></script>
	<script src='[[ asset("vendor/angular-animate/angular-animate.js") ]]'></script>
	<script type="text/javascript" src='[[ asset("assets/js/main.js") ]]'></script>
</body>

</html>