const express = require('express');
const Mathematician = require('../models/mathematician');
const Formula = require('../models/formula');
const async = require('async')
const {body,validationResult} = require('express-validator');

exports.formula_list = (req,res,next) => {
    Formula.find({})
           .sort({name:1})
           .exec((err,formulas) => {
               if(err) return next(err);
               if(!formulas){
                   return res.render('formula_list',{title:'All Formulas'});
               }
               res.render('formula_list',{title:'All Formulas',formulas:formulas});
           })
}
exports.formula_detail = (req,res,next) => {
    Formula.findById(req.params.id)
           .populate('author')
           .exec((err,formula) => {
               if(err) return next(err);
               if(!formula){
                   let err = new Error('Formula Not Found');
                   err.status = 404;
                   return next(err);
               }
               res.render('formula_detail',{title: formula.name,formula:formula});
           })
}
exports.formula_create_get = (req,res,next) => {
    Mathematician.find({})
                 .exec((err,mathematician) => {
                     if(err) return next(err);
                     res.render('formula_form',{title:'Create New Formula',mathematicians:mathematician});
                 });
}
exports.formula_create_post = [
    body('name','Name is Required').trim().isLength({min:1}).escape(),
    body('formula','Formula is Required').trim().isLength({min:1}),
    body('description','Description is Required').trim().isLength({min:1}).escape(),
    (req,res,next) => {
        const errors = validationResult(req);
        let formula = {
            name:req.body.name,
            formula:req.body.formula,
            description:req.body.description
        };
        if(req.body.mathematician){
            formula.author = req.body.description;
        }
        formula = new Formula(formula);
        Mathematician.find({})
                 .exec((err,matematician) => {
                     if(err) return next(err);
                     if(!errors.isEmpty()){
                         return res.render('formula_form',{title:'Create New Formula',formula:formula,mathematicians:mathematician});
                     }
                     formula.save((err) => {
                         if(err) return next(err);
                         res.redirect(formula.url);
                     })
                 })
    }
]
exports.formula_update_get = (req,res,next) => {
    async.parallel({
        formula:(cb) => {
            Formula.findById(req.params.id)
                   .populate('author')
                   .exec(cb);
        },
        mathematicians:(cb) => {
            Mathematician.find(cb);
        }
    },(err,results) => {
        if(err) return next(err);
        if(!results.formula){
            return res.redirect('/home/formulas');
        }
        res.render('formula_form',{title:'Update Formula',formula:results.formula,mathematicians:results.mathematicians});
    })
}
exports.formula_update_post = [
    body('name','Name is Required').trim().isLength({min:1}).escape(),
    body('formula','Latex Representation is Required').trim().isLength({min:1}),
    body('description','Description is Required').trim().isLength({min:1}).escape(),
    (req,res,next) => {
        const errors = validationResult(req);
        let formula = {
            name: req.body.name,
            formula:req.body.formula,
            description:req.body.description,
            _id: req.params.id,
        };
        if(req.body.mathematician){
            formula.author = req.body.mathematician;
        }
        formula = new Formula(formula);
        Mathematician.find({})
                     .exec((err,mathematician) => {
                         if(err) return next(err);
                         if(!errors.isEmpty()){
                            return res.render('formula_form',{title:'Update Formula',mathematician:mathematician,formula:formula,errors:errors.array()});
                         }
                         Formula.findByIdAndUpdate(req.params.id,formula,'',(err) => {
                             if(err) return next(err);
                             res.redirect(formula.url);
                         })
                     })
    }
]
exports.formula_delete_get = (req,res,next) => {
    Formula.findById(req.params.id)
           .exec((err,formula) => {
               if(err) return next(err);
               if(!formula) {
                   res.redirect('/home/formulas');
               }
               res.render('formula_delete',{title:'Delete Formula',formula:formula});
           })
}
exports.formula_delete_post = (req,res,next) => {
    Formula.findByIdAndRemove(req.body.formulaid,(err) => {
        if(err) return next(err);
        res.redirect('/home/formulas');
    })
}
