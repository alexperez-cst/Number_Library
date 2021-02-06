const express = require('express');
const Mathematician = require('../models/mathematician');
const Number = require('../models/number');
const NumberType = require('../models/numbertype');
const Formula = require('../models/formula');
const async = require('async');
const hex2ascii = require('hex2ascii');
const {body,validationResult} = require('express-validator');

exports.home = function (req,res,next) {
    async.parallel({
        mathematicians:(cb) => {
            Mathematician.countDocuments(cb);
        },
        numbers:(cb) => {
            Number.countDocuments(cb);
        },
        numbertypes:(cb) => {
            NumberType.countDocuments(cb);
        },
        formulas:(cb) => {
            Formula.countDocuments(cb);
        }
    },(err,results) => {
        if(err) return next(err);
        res.render('home',{title:'Number Library',mathematicians:results.mathematicians,numbers:results.numbers,numbertypes:results.numbertypes,formulas:results.formulas});
    })
}
exports.number_list = (req,res,next) => {
    Number.find({})
          .sort({name:1})
          .exec((err,numbers) => {
              if(err) return next(err);
              if(!numbers){
                  return res.render('number_list',{title:'All Numbers'});
              }
              res.render('number_list',{title:'All Numbers',numbers:numbers});
          })
}
exports.number_detail = (req,res,next) => {
      Number.findById(req.params.id)
            .populate('author')
            .populate('numbertype')
            .exec((err,number) => {
              if(err) return next(err);
              if(!number){
                let err = new Error('Number not found');
                err.status = 404;
                return next(err);
              }
              res.render('number_detail',{title:number.name, number:number});
            });
}
exports.number_create_get = (req,res,next) => {
  async.parallel({
    mathematicians:(cb) => {
      Mathematician.find(cb);
    },
    numbertypes:(cb) => {
      NumberType.find(cb)
    }
  },(err,results) => {
    if(err) return next(err);
    res.render('number_form',{title:'Create New Number', mathematicians:results.mathematicians,numbertypes:results.numbertypes});
  });
}
exports.number_create_post = [
  body('name','Name Field is required.').trim().isLength({min:1}).escape(),
  body('number','Latex Representation is Required').trim().isLength({min:1}),
  body('numbertype','Number Type is Required').isLength({min:1}),
  body('description','Description is Required').trim().isLength({min:1}).escape(),
  (req,res,next) => {
    const errors = validationResult(req);

    let number = {
      name: req.body.name,
      number:req.body.number,
      description:req.body.description,
      numbertype:req.body.numbertype
    };
    if(req.body.mathematician){
      number.author = req.body.mathematician;
    }
    number = new Number(number);
    async.parallel({
      mathematicians:(cb) => {
        Mathematician.find(cb);
      },
      numbertypes:(cb) => {
        NumberType.find(cb);
      }
    },(err,results) => {
      if(err) return next(err);
      if(!errors.isEmpty()){
        return res.render('number_form',{title:'Create New Number',number:number,mathematicians:results.mathematicians,numbertypes:results.numbertypes,errors:errors.array()});
      }
      number.save((err) => {
        if(err) return next(err);
        res.redirect(number.url);
      })
    })
  }
]
exports.number_update_get = (req,res,next) => {
  async.parallel({
    number:(cb) => {
      Number.findById(req.params.id)
            .populate('author')
            .populate('numbertype')
            .exec(cb);
    },
    mathematicians:(cb) => {
      Mathematician.find(cb);
    },
    numbertypes:(cb) => {
      NumberType.find(cb);
    }
  },(err,results) => {
    if(err) return next(err);
    if(!results.number){
      let err = new Error('Number Not Found');
      err.status = 404;
      return next(err);
    }
    res.render('number_form',{title:'Update Number',number:results.number,mathematicians:results.mathematicians,numbertypes:results.numbertypes});
  })
}
exports.number_update_post = [
  body('name','Name Field is required.').trim().isLength({min:1}).escape(),
  body('number','Latex Representation is Required').trim().isLength({min:1}),
  body('numbertype','Number Type is Required').isLength({min:1}),
  body('description','Description is Required').trim().isLength({min:1}).escape(),
  (req,res,next) => {
    const errors = validationResult(req);

    let number = {
      name:req.body.name,
      number:req.body.number,
      numbertype:req.body.numbertype,
      description:req.body.description,
      _id: req.params.id
    }
    if(req.body.author){
      number.author = req.body.author;
    }
    number = new Number(number);
    async.parallel({
      mathematicians:(cb) => {
        Mathematician.find(cb);
      },
      numbertypes:(cb) => {
        NumberType.find(cb);
      }
    },(err,results) => {
      if(err) return next(err);
      if(!errors.isEmpty()){
        return res.render('number_form',{title:'Update Number',mathematicians:results.mathematicians,numbertypes:results.numbertypes,number:number,errors:errors.array()});
      }
      Number.findByIdAndUpdate(req.params.id,number,'',(err,newNumber) => {
        if(err) return next(err);
        res.redirect(newNumber.url);
      })
    })
}]
exports.number_delete_get = (req,res,next) => {
    res.render('TODO: Implement numberController.number_delete_get method');
}
exports.number_delete_post = (req,res,next) => {
    res.render('TODO: Implement numberController.number_delete_post method');
}
