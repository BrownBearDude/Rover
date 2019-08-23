const lv_gen = require("./level_generator.js");
const fs = require("fs");
fs.writeFileSync("./data.json", JSON.stringify(
	(new lv_gen.Level_builder())
		.set_title("Solar panels - Writing to Arrays")
		.set_desc("Learn how to write to an Array by reading solar panels")
		.add_tex("rover", "/images/rover.png")
		.add_tex("dirt", "/images/mars.png")
		.add_tex("panel", "/images/panel.png")
		.do_func(level => {
				for(let i = 0;i < 3;i++){
					level.add_test(
						(new lv_gen.Test_builder())
							.set_size(10, 10, "dirt")
							.do_func(test => {
								let func = () => ({tex: "panel", visible_properties: {energy: Math.round(Math.random() * 500) / 10 + 150}});
								for(let y = 0;y < 8;y += 2){
									test.fill_tiles(1, y + 1, 8, y + 1, func);
								}
							})
						.finish()
					)
				}
			}
		)
	.finish()
, null, "\t"));