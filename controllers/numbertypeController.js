const express = require('express');
const NumberType = require('../models/numbertype');
const {body,validationResult} = require('express-validator');
exports.numbertype_list = (req,res,next) => {
    NumberType.find({})
              .sort({name: 1})
              .exec((err,numbertypes) => {
                if(err) return next(err);
                if(!numbertypes){
                    return res.render('numbertype_list',{title:"All Number Types"});
                }
                res.render('numbertype_list',{title:'All Number Types',numbertypes:numbertypes});
              });
}
exports.numbertype_detail = (req,res,next) => {
    NumberType.findById(req.params.id)
              .exec((err,numbertype) => {
                  if(err) return next(err);
                  if(!numbertype){
                    let err = new Error('NumberType Not Found');
                    err.status = 404;
                    return next(err);
                  }
                  res.render('numbertype_detail',{title:numbertype.name});
              })
}
exports.numbertype_create_get = (req,res,next) => {
  res.render('numbertype_form',{title:'Create New Number Type'});
}
exports.numbertype_create_post = [
  body('name','Name Is Required').trim().isLength({min:1}).escape(),
  (req,res,next) => {
    const errors = validationResult(req);

    const numbertype = new NumberType({
      name:req.body.name
    });
    if(!errors.isEmpty()){
      return res.render('numbertype_form',{title:'Create New Number Type',numbertype:numbertype,errors:errors.array()});
    }
    numbertype.save((err) => {
      if(err) return next(err);
      res.redirect(numbertype.url);
    })
  }
]
exports.numbertype_update_get = (req,res,next) => {
    res.render('TODO: Implement numbertypeController.numbertype_update_get method');
}
exports.numbertype_update_post = (req,res,next) => {
    res.render('TODO: Implemetn numbertypeController.numbertype_update_post method');
}
exports.numbertype_delete_get = (req,res,next) => {
    res.render('TODO: Implement numbertypeController.numbertype_delete_get method');
}
exports.numbertype_delete_post = (req,res,next) => {
    res.render('TODO: Implement numbertypeController.numbertype_delete_post method');
}
