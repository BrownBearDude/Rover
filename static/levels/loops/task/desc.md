Loops - Doing things more than once
===========
There are two basic types of loops: `for` loops and `while` loops.
`while` loops repeat so long as a condition is true.
```javascript
while(some_condition){
	//While some_condition is true,
	//repeat whatever is in here
}
```
This will move the bot forever
```javascript
while(true){ //true is always true
	Bots["rover"].move();
}
```
`for` loops are a bit more complicated.
They allow you to declare an initial expression, a condition and an increment expression.
```javascript
for([initial_expression];condition;[increment_expression]){
	/*
		1. Executes initial_expression
		2. Stop looping if condition is false, otherwise
		3. Executes whatever is in here
		4. Executes increment_expression
		5. Repeat steps 2 - 5.
	*/
}
```
This will move the bots five steps forward
```javascript
for(var steps = 0;steps < 5;steps = steps + 1){
	//First declare steps
	//If steps is less than five, do whatever is in here
	//Then increment (add one to) steps
	Bots["rover"].move();
}
```
`for` loops are harder to understand, so feel free to use `while` loops until you are comfortable with loops