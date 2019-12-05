Getting started - Moving a bot
===========
For starters, try replacing the whole script on the left with this:
```js
Bots["rover"].move();
```
Hit the "Run code" button.<br>
The bot should have moved. But why?<br>
Let's break things down here:<br>
```js
Bots["rover"]
```
Don't worry about this now: All you need to know is that the `"rover"` part refers to `Bots` that are named `rover`.
```js
.move()
```
This calls a "function" on the "rover" object. In other words, it makes that rover move.<br>
<br>
What happens when you put down more than one of these?<br>
Hit "Reset" and add another line.
```js
Bots["rover"].move();
Bots["rover"].move();
```