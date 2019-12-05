newTask("namespace", function (localStorage) {
    if (!localStorage.tile) {
        var data = get_tiles_from_tag("rock")[0];
        var tile = data.tile;
        if (typeof tile.visible_properties != "object") tile.visible_properties = {};
        tile.visible_properties.iron_content = random();
        update_tile(data);
        localStorage.tile = tile;
    }
	log(sent_data);
	return {
        "task": "Get data from the rock and send it.",
        "passed":
            sent_data != null &&
            typeof sent_data == "object" &&
            sent_data.iron_content === localStorage.tile.visible_properties.iron_content
	};
});