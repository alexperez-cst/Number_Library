const express = require('express');
const Mathematician = require('../models/mathematician');
const Number = require('../models/number');
const Formula = require('../models/formula');
const async = require('async');
const {body,validationResult} = require('express-validator');
exports.mathematician_list = (req,res,next) => {
    Mathematician.find({})
                 .sort({name:1})
                 .exec((err,mathematicians) => {
                     if(err) return next(err);
                     if(!mathematicians){
                         return res.render('mathematician_list',{title:'All Mathematicians'});
                     }
                     res.render('mathematician_list',{title:'All Mathematicians',mathematicians:mathematicians});
                 })
}
exports.mathematician_detail = (req,res,next) => {
    async.parallel({
        mathematician:(cb) => {
            Mathematician.findById(req.params.id)
                         .exec(cb);
        },
        numbers:(cb) => {
            Number.find({'author': req.params.id})
                  .exec(cb);
        },
        formulas:(cb) => {
            Formula.find({'author':req.params.id})
                   .exec(cb);
        }
    },(err,results) => {
        if(err) return next(err);
        if(!results.mathematician){
            let err = new Error('Mathematician Not Found');
            err.status = 404;
            return next(err);
        }
        res.render('mathematician_detail',{title:results.mathematician.fullname,mathematician:results.mathematician,numbers:results.numbers,formulas:results.formulas});
    })
}
exports.mathematician_create_get = (req,res,next) => {
    res.render('mathematician_form',{title:'Create New Mathematician'});
}
exports.mathematician_create_post = [
    body('name','Name is Required').trim().isLength({min:1}).escape(),
    body('family_name','Family Name is Required').trim().isLength({min:1}).escape(),
    body('date_birth').optional({checkFalsy:true}).isISO8601().isDate(),
    body('date_birth').optional({checkFalsy:true}).isISO8601().isDate(),
    (req,res,next) => {
        const errors = validationResult(req);

        let mathematician = {
            name: req.body.name,
            family_name: req.body.family_name,
        }
        if(req.body.date_birth){
            mathematician.date_birth = req.body.date_birth;
        }
        if(req.body.date_death){
            mathematician.date_death = req.body.date_death;
        }
        mathematician = new Mathematician(mathematician);
        if(!errors.isEmpty()){
            return res.render('mathematician_form',{title:'Create New Mathematician',mathematician:mathematician,errors:errors.array()});
        }
        mathematician.save(err => {
            if(err) return next(err);
            res.redirect(mathematician.url);
        })
    }
]
exports.mathematician_update_get = (req,res,next) => {
    Mathematician.findById(req.params.id)
                 .exec((err,mathematician) => {
                     if(err) return next(err);
                     if(!mathematician){
                         return res.redirect('/home/mathematicians');
                     }
                     res.render('mathematician_form',{title:'Update Mathematician',mathematician:mathematician});
                 })
}
exports.mathematician_update_post = [
    body('name','Name is Required').trim().isLength({min:1}).escape(),
    body('family_name','Family Name is Required').trim().isLength({min:1}).escape(),
    body('date_birth').optional({checkFalsy:true}).isISO8601().isDate(),
    body('date_birth').optional({checkFalsy:true}).isISO8601().isDate(),
    (req,res,next) => {
        const errors = validationResult(req);

        let mathematician = {
            name:req.body.name,
            family_name:req.body.family_name,
            _id:req.params.id
        }
        if(req.body.date_birth) mathematician.date_birth = req.body.date_birth;
        if(req.body.date_death) mathematician.date_death = req.body.date_death;
        mathematician = new Mathematician(mathematician);
        if(!errors.isEmpty()){
            return res.render('mathematician_form',{title:'Update Mathematician',mathematician:mathematician,errors:errors.array()});
        }
        Mathematician.findByIdAndUpdate(req.params.id,mathematician,'',(err) => {
            if(err) return next(err);
            res.redirect(mathematician.url);
        })
    }
]
exports.mathematician_delete_get = (req,res,next) => {
    async.parallel({
        mathematician:(cb) => {
            Mathematician.findById(req.params.id).exec(cb);
        },
        numbers:(cb) => {
            Number.find({'author':req.params.id})
                  .exec(cb);
        },
        formulas:(cb) => {
            Formula.find({'author':req.params.id})
                   .exec(cb)
        }
    },(err,results) => {
        if(err) return next(err);
        if(!results.mathematician){
            return res.redirect('/home/mathematicians');
        }
        res.render('mathematician_delete',{title:'Delete Mathematician',mathematician:results.mathematician,numbers:results.numbers,formulas:results.formulas});
    })
}
exports.mathematician_delete_post = (req,res,next) => {
    Mathematician.findByIdAndRemove(req.body.mathematicianid,(err) => {
        if(err) return next(err);
        res.redirect('/home/mathematicians');
    })
}
