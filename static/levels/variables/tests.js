newTask("namespace", function (localStorage) {
    if (!localStorage.init) {
        localStorage.init = true;
        var data = get_tile_data(0, 0);
        if (typeof data.visible_properties != "object") data.visible_properties = {};
        data.visible_properties.iron_content = 0.4;
        set_tile_data(0, 0, data);
        log(data);
    }
   //log(sent_data);
	return {
        "task": "Get data from the rock and send it.",
        "passed":
            sent_data != null &&
            typeof sent_data == "object" &&
            sent_data.iron_content === 0.4
	};
});