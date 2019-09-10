newTask("namespace", function(localStorage){
	return {
        "task": "Get data from the rock and update the analyser.",
        "passed": entities.filter(function (e) { return e.name == "drive" })[0].inherits.Data_storage.data !== undefined,
	};
});