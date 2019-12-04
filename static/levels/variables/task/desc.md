Variables
===========
By now, you have learned about calling functions for moving and rotating the bot. But what about data?
```javascript
Bots["rover"].read_front_tile();
```
This function allows you to read data from the tile in front of the rover.

```javascript
send_data(data); // Will send the data variable
```
This function allows you to send data.

```javascript
var data = Bots["rover"].read_front_tile();
```
Here, you "declare" a variable data and store the data read from `read_front_tile()` into it.
A variable is just something that can store data. But what types of data?

Here are the five main types of data you will see: 
```javascript
//Number - A decimal number that can be positive or negative
var num = 9.9;

//String - A piece of text.
var str = "The quick brown fox jumped over the lazy dog.";

//Boolean - A value that can be true or false
var bool = true;

//Object - A value that contains other values that can be accessed through Strings
var obj = {
    "name": "John"
    "age": 10,
    "likes dogs": true,
};
obj["name"]; // "John"
obj["age"]; // 10
obj["likes dogs"]; // true
//This also works!
obj.name; //John

//Array - A special type of object that is a list of other values
var array = [1, "mango", false];
array[0]; // 1
array[1]; // "mango"
array[2]; // false
```
There are many more, but you only need to know about this for a while.
Feel overwhelmed? That's okay! Experiment with it, see what works and what doesn't.