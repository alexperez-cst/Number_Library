#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var async = require('async')
var Number = require('./models/number')
var NumberType = require('./models/numbertype')
var Mathematician = require('./models/mathematician')
var Formula = require('./models/formula')


var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://alexperezcst:palex4490@cluster0.3atss.mongodb.net/numberLibrary?retryWrites=true&w=majority';
console.log(mongoDB)
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var mathematicians = []
var numbers = []
var numbertypes = []
var formulas = []

function mathematicianCreate(first_name, family_name, d_birth, d_death, cb) {
  mathematiciandetail = {name: first_name, family_name: family_name}
  if (d_birth != false) mathematiciandetail.date_birth = d_birth
  if (d_death != false) mathematiciandetail.date_death = d_death

  var mathematician = new Mathematician(mathematiciandetail);

  mathematician.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Mathematician: ' + mathematician);
    mathematicians.push(mathematician)
    cb(null, mathematician)
  });
}

function numbertypeCreate(name, cb) {
  var numbertype = new NumberType({name: name});

  numbertype.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New NumberType: ' + numbertype);
    numbertypes.push(numbertype)
    cb(null, numbertype);
  });
}

function numberCreate(name, number, description, author, number_type, cb) {
  numberdetail = {
    name: name,
    number: number,
    description: description,
    numbertype: number_type._id
  }
  if (author) {numberdetail.author = author._id}
  var number = new Number(numberdetail);
  number.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Number: ' + number);
    numbers.push(number)
    cb(null, number)
  });
}


function formulaCreate(name, formula,description, author, cb) {
  formuladetail = {
    name: name,
    formula: formula,
    description:description
  }
  if (author) {formuladetail.author = author._id};
  var formula = new Formula(formuladetail);
  formula.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Formula: ' + formula);
      cb(err, null)
      return
    }
    console.log('New Formula: ' + formula);
    formulas.push(formula)
    cb(null, formula)
  });
}


function createNumberTypeMathematicians(cb) {
  async.series([
    function (callback) {
      mathematicianCreate('Leonhard', 'Euler', '1707-04-15', '1783-09-18', callback);
    },
    function (callback) {
      mathematicianCreate('Carl Friedrich', 'Gauss', '1777-04-30', '1855-02-23', callback);
    },
    function (callback) {
      mathematicianCreate('Bernhard', 'Riemann', '1826-07-17', '1866-07-20', callback);
    },
    function (callback) {
      mathematicianCreate('Rene', 'Descartes', false, false, callback);
    },
    function (callback) {
      mathematicianCreate('Pierre', 'de Fermat', '1607-01-01', false, callback);
    },
    function (callback) {
      numbertypeCreate("Natural", callback);
    },
    function (callback) {
      numbertypeCreate("Real", callback);
    },
    function (callback) {
      numbertypeCreate("Complex", callback);
    },
  ],
    // optional callback
    cb);
}


function createNumbers(cb) {
  async.parallel([
    function (callback) {
      numberCreate('Pi', '\pi', "The number π (/paɪ/) is a mathematical constant. It is defined as the ratio of a circle's circumference to its diameter, and it also has various equivalent definitions", null, numbertypes[1], callback);
    },
    function (callback) {
      numberCreate("Three", '3', '3 is a number, numeral, and glyph.', false, numbertypes[0], callback);
    },
    function (callback) {
      numberCreate("Euler's Number", '\e', "Euler's number is also known as the exponential growth constant. It is the base for natural logarithms and is found in many areas of mathematics.", mathematicians[0], numbertypes[1], callback);
    },
  ],
    // optional callback
    cb);
}


function createFormulas(cb) {
  async.parallel([
    function (callback) {
      formulaCreate("Euler's Formula", 'e^{ \pm i\theta } = \cos \theta \pm i\sin \theta',"Euler's formula, named after Leonhard Euler, is a mathematical formula in complex analysis that establishes the fundamental relationship between the trigonometric functions and the complex exponential function.", mathematicians[0], callback)
    },
    function (callback) {
      formulaCreate("Quadratic Formula", 'x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}',"In elementary algebra, the quadratic formula is a formula that provides the solution(s) to a quadratic equation.", false, callback)
    },
    function (callback) {
      formulaCreate("Partial Sums Formula", '\frac {n(n+1)} 2',"This equation was known to the Pythagoreans as early as the sixth century BCE.[5] Numbers of this form are called triangular numbers, because they can be arranged as an equilateral triangle.", mathematicians[1], callback)
    },
  ],
    // Optional callback
    cb);
}



async.series([
  createNumberTypeMathematicians,
  createNumbers,
  createFormulas
],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  });
