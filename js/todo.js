function TodoCtrl($scope) {
	// Grab persisted todo list
	forge.prefs.get("todos", function (todos) {
		// Updating Angular model, $apply makes sure the view is updated too.
		$scope.$apply(function () {
			if (todos) {
				$scope.todos = todos;
			} else {
				$scope.todos = [
					{text:'learn angular', done:true},
					{text:'build an angular app', done:false},
					{text:'extend angular app to work with Forge', done:false}];
			}
		});
	});
 
	$scope.addTodo = function() {
		$scope.todos.push({text:$scope.todoText, done:false});
		$scope.todoText = '';
		forge.prefs.set("todos", $scope.todos);
	};
 
	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo) {
			count += todo.done ? 0 : 1;
		});
		return count;
	};
 
	$scope.archive = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo) {
			if (!todo.done) $scope.todos.push(todo);
		});
		forge.prefs.set("todos", $scope.todos);
	};
}

