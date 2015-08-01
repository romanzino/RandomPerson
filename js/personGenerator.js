"use strict";

/**
 * AUTHOR: ROMAN ZINO
 * DATE: 01.08.2015
 * CREATED FOR FUN ;)
 */

/**
 * Generates random person
 * @param {object} options
 */
var RandomPerson = function (options) {
	var key, value, defaultOptions;

	//If was called like a function
	if (!(this instanceof RandomPerson)) {
		return new RandomPerson(options);
	}

	//Default Person options
	defaultOptions = {
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

	//Change default options
	if (typeof options === "object") {
		//Loop trough options params
		for (key in options) {
			//Option value
			value = options[key];

			if (options.hasOwnProperty(key)) {
				//Check options
				if (options.minHeight > options.maxHeight || options.minWeight > options.maxWeight || options.minAge > options.maxAge) {
					this.optionError(key + " should be less than it max value");	
				}
				else if (key === "minHeight" || key === "minWeight" || key === "minAge") {
					if (value < 0) {
						this.optionError(key + " should be greater than 0");	
					}
				}
				else if (key === "hairColor" && key === "gender") {
					if (typeof value !== "string" || value.length < 1) {
						this.optionError(key + " should be string with option value");
					}
				}

				//Overwrite default option
				defaultOptions[key] = value;
			}	
		}
	}

	//Magic
	this.generate(defaultOptions);
}

/**
 * Run the generator
 * @param  {object} options person's options
 */
RandomPerson.prototype.generate = function (options) {
	var methods, methodsLength, i;

	methods = [
		'generateGender', 
		'generateAge',
		'generateHeight',
		'generateWeight',
		'generateHairColor',
		'generateName'
	];
	methodsLength = methods.length;
	
	i = 0;
	//Generating all person options
	for (i; i < methodsLength; i++) {
		this[methods[i]](options);	
	}
}

/**
 * Generates person's gender
 * @param  {object} options person's options
 */
RandomPerson.prototype.generateGender = function (options) {
	if (typeof options.gender === "object") {
		this.gender = options.gender[this.randomInt(0, options.gender.length - 1)];	
	}
	else {
		this.gender = options.gender;
	}
}


/**
 * Generates person's age
 * @param  {object} options person's options
 */
RandomPerson.prototype.generateAge = function (options) {
	this.age = this.randomInt(options.minAge, options.maxAge);
}

/**
 * Generates person's height
 * @param  {object} options person's options
 */
RandomPerson.prototype.generateHeight = function (options) {
	var i, height;

	if (this.age < 18) {
		/**
		 * Person height at birth
		 * @type {int}
		 */
		height = this.randomInt(46, 53);

		i = 0;
		for (i; i < this.age; i++) {
			if (i < 1) {
				/**
				 * Growth in the first year
				 */
				height += this.randomInt(20, 27);
			}
			else if (i < 2) {
				/**
				 * Growth in the second year
				 */
				height += this.randomInt(11, 14);
			}
			else if (i < 15) {
				height += this.randomInt(4, 9);
			}
			else {
				height += this.randomInt(3, 5);
			}
		}

		this.height = height;
	}
	else {
		this.height = this.randomInt(options.minHeight, options.maxHeight);
	}

	if (this.age > 12 && this.gender === "female") {
		this.height = Math.round(this.height * 0.9);

		if (this.height < options.minWeight) {
			this.height = options.minHeight;
		}
	}
}

/**
 * Generates person's weight
 * @param  {object} options
 */
RandomPerson.prototype.generateWeight = function (options) {
	/**
	 * https://deti.mail.ru/child/ocenka-fizicheskogo-razvitiya-detej-starshe-1-goda/
	 * http://www.aif.ru/health/food/kak_nayti_svoy_idealnyy_ves_5_sposobov_i_formuly_raschyota
	 */
	if (this.age <= 13) {
		this.weight = Math.round(10.5 + 2 * this.age) + this.randomInt(-5, 5);
	}
	else {
		if (this.gender === "male") {
			this.weight = Math.round(((this.height - 100) * 1.15) + this.randomInt(-5, 5));
		}
		else if (this.gender === "female") {
			this.weight = Math.round(((this.height - 110) * 1.15)  + this.randomInt(-5, 5));
		}
	}
}


/**
 * Generates person's hair color
 * @param  {object} options
 */
RandomPerson.prototype.generateHairColor = function (options) {
	if (typeof options.hairColor === "object") {
		this.hairColor = options.hairColor[this.randomInt(0, options.hairColor.length - 1)];	
	}
	else {
		this.hairColor = options.hairColor;
	}
}

/**
 * Generates person's name
 * @param  {object} options
 */
RandomPerson.prototype.generateName = function (options) {
	var names = options.name[this.gender];

	this.name = names[this.randomInt(0, names.length - 1)]
}


/**
 * Generates random integer number
 * @param  {int} min min value
 * @param  {int} max max value
 * @return {int}     generated value
 */
RandomPerson.prototype.randomInt = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Throws an error
 * @param  {string} error
 */
RandomPerson.prototype.optionError = function (error) {
	console.error("RandomPerson Fatal Error: " + error);
	return;
}

/**
 * Convert object to string
 * @return {string} person's info
 */
RandomPerson.prototype.toString = function () {
	return JSON.stringify(this);
}