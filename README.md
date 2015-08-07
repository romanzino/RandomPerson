#Random Person - Native Javascript Random Person Generator (v. 0.0.1 alpha)

####Usage example

You just need to call RandomPerson function: `new RandomPerson()` or just `RandomPerson()`

This action will generate a random person, for example

```
{
	"gender":"male",
	"age":5,
	"height":97,
	"weight":21,
	"hairColor":"red",
	"name":"Adam"
}
```

####Generation options

*Default options*
```
var options = {
	minAge: 1, //years
	maxAge: 85, //years
	minWeight: 40, //kg
	maxWeight: 350, //kg
	minHeight: 150, //cm
	maxHeight: 215, //cm
	hairColor: ['brown', 'black', 'red'],
	gender: ['male', 'female'],
	name: {
		male: ['Aaron', 'Adam', 'Jack', 'Tom', 'John'],
		female: ['Aline', 'Alise', 'Katty', 'Sara', 'Alexandria']
	}
}
```

*You can customize it like*

```
var options = {
	minAge: 18,
	minWeight: 90, //kg
	minHeight: 190, //cm
	hairColor: 'brown',
	gender: 'male',
	name: 'Max'
}
```
Then just pass options object to RandomPerson function: `new RandomPerson(options);`
