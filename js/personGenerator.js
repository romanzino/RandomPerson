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
var RandomPerson = function (userOptions) {
	var key, value, options, context;

	context = this;

	//If was called like a function
	if (!(this instanceof RandomPerson)) {
		return new RandomPerson(userOptions);
	}

	//Default Person options
	options = {
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
	if (typeof userOptions === "object") {
		//Loop trough options params
		for (key in userOptions) {
			//Option value
			value = userOptions[key];

			if (userOptions.hasOwnProperty(key)) {
				//Check options
				if (userOptions.minHeight > userOptions.maxHeight || userOptions.minWeight > userOptions.maxWeight || userOptions.minAge > userOptions.maxAge) {
					optionError(key + " should be less than it max value");	
				}
				else if (key === "minHeight" || key === "minWeight" || key === "minAge") {
					if (value < 0) {
						optionError(key + " should be greater than 0");	
					}
				}
				else if (key === "hairColor" && key === "gender") {
					if (typeof value !== "string" || value.length < 1) {
						optionError(key + " should be string with option value");
					}
				}

				//Overwrite default option
				options[key] = value;
			}	
		}
	}

	//Magic
	generateGender();
	generateAge();
	generateHeight();
	generateWeight();
	generateHairColor();
	generateName();

	/**
	 * Generates person's gender
	 */
	function generateGender () {
		if (typeof options.gender === "object") {
			context.gender = options.gender[randomInt(0, options.gender.length - 1)];	
		}
		else {
			context.gender = options.gender;
		}
	}

	/**
	 * Generates person's age
	 */
	function generateAge () {
		context.age = randomInt(options.minAge, options.maxAge);
	}


	/**
	 * Generates person's height
	 */
	function generateHeight () {
		var i, height;

		if (context.age < 18) {
			/**
			 * Person height at birth
			 * @type {int}
			 */
			height = randomInt(46, 53);

			i = 0;
			for (i; i < context.age; i++) {
				if (i < 1) {
					/**
					 * Growth in the first year
					 */
					height += randomInt(20, 27);
				}
				else if (i < 2) {
					/**
					 * Growth in the second year
					 */
					height += randomInt(11, 14);
				}
				else if (i < 15) {
					height += randomInt(4, 9);
				}
				else {
					height += randomInt(3, 5);
				}
			}

			context.height = height;
		}
		else {
			context.height = randomInt(options.minHeight, options.maxHeight);
		}

		if (context.age > 12 && context.gender === "female") {
			context.height = Math.round(context.height * 0.9);

			if (context.height < options.minWeight) {
				context.height = options.minHeight;
			}
		}
	}

	/**
	 * Generates person's weight
	 */
	function generateWeight () {
		/**
		 * https://deti.mail.ru/child/ocenka-fizicheskogo-razvitiya-detej-starshe-1-goda/
		 * http://www.aif.ru/health/food/kak_nayti_svoy_idealnyy_ves_5_sposobov_i_formuly_raschyota
		 */
		if (context.age <= 13) {
			context.weight = Math.round(10.5 + 2 * context.age) + randomInt(-5, 5);
		}
		else {
			if (context.gender === "male") {
				context.weight = Math.round(((context.height - 100) * 1.15) + randomInt(-5, 5));
			}
			else if (context.gender === "female") {
				context.weight = Math.round(((context.height - 110) * 1.15)  + randomInt(-5, 5));
			}
		}
	}


	/**
	 * Generates person's hair color
	 */
	function generateHairColor () {
		if (typeof options.hairColor === "object") {
			context.hairColor = options.hairColor[randomInt(0, options.hairColor.length - 1)];	
		}
		else {
			context.hairColor = options.hairColor;
		}
	}

	/**
	 * Generates person's name
	 */
	function generateName () {
		var names = options.name[context.gender];

		context.name = names[randomInt(0, names.length - 1)]
	}


	/**
	 * Generates random integer number
	 * @param  {int} min min value
	 * @param  {int} max max value
	 * @return {int}     generated value
	 */
	function randomInt (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * Throws an error
	 * @param  {string} error
	 */
	function optionError (error) {
		console.error("RandomPerson Fatal Error: " + error);
		return;
	}

	/**
	 * Convert object to string
	 * @return {string} person's info
	 */
	context.toString = function () {
		return JSON.stringify(context);
	}
}