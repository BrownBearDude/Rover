# TODO - let user input file name on command line

level_file = 'level.txt'

# read characters in level.txt into
# terrain map
# which is array of columns
f = open(level_file)
terrain_map = []
for row in f:
	col_index = 0
	row_index = 0
	for tile in row.rstrip():
		if col_index == len(terrain_map):
			terrain_map.append([])
		terrain_map[col_index].append(tile)
		col_index += 1
	row_index += 1
f.close()

# print(terrain_map)

def map_tile_char_to_terrain(tile):
	if tile == 'M':
		return "dirt"
	if tile == 'R':
		return "rock"
	if tile == 'D':
		return "data"
	if tile == 'B':
		return "empty"
	if tile == "P":
		return "solar"
	return "dirt"

def output_terrain_column(column):
	n = len(column)
	print('[')
	for i, tile in enumerate(column):
		print('  {')
		print('    "tex": "' + map_tile_char_to_terrain(tile) + '"')
		if i + 1 < n:
			print('  },')
		else:
			print('  }')
	print(']')

def print_entities():
	print """\
	"entities": [
        {
          "x": 0,
          "y": 0,
          "rot": 0,
          "tex": "rover",
          "name": "rover",
          "inherits": {
			"Accessible": [
				"Bots"
			],
            "Rover": {
              "moveSFX": "move"
            }
          }
        }
      ],
	  """

def print_footer():
	# TODO add other textures
	print """
	"tex": {
		"rover": "/images/rover.png",
        "dirt": "/images/mars.png",
        "rock": "/images/mars_rock.png",
        "blank": "/images/blank.png",
        "solar": "/images/panel.png",
        "data": "/images/data_drive.png"
	},
	"sfx": {
		"botMove": "/audio/"
	},
	"meta": {
		"title": "Getting started",
		"desc": "Learn the basics of javascript and how to control a bot"
	}
	"""


# output terrain map by columns
print("{")
print('  "tests": [')
print('    {')

print_entities()

print('      "terrain": [')

num_cols = len(terrain_map)
for i, column in enumerate(terrain_map):
	output_terrain_column(column)
	if i + 1 < num_cols:
		print(',')

print('      ]')
print('    }')
print('  ]')

print(',')

print_footer()

print("}")