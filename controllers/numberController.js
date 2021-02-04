const express = require('express');
const Mathematician = require('../models/mathematician');
const Number = require('../models/number');
const NumberType = require('../models/numbertype');
const Formula = require('../models/formula');
const async = require('async');

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
    res.render('TODO: Implement numberController.number_list method');
}
exports.number_detail = (req,res,next) => {
    res.render('TODO: Implement numberController.number_detail method');
}
exports.number_create_get = (req,res,next) => {
    res.render('TODO: Implement numberController.number_create_get method');
}
exports.number_create_post = (req,res,next) => {
    res.render('TODO: Implement numberController.number_create_post method');
}
exports.number_update_get = (req,res,next) => {
    res.render('TODO: Implement numberController.number_update_get method');
}
exports.number_update_post = (req,res,next) => {
    res.render('TODO: Implemetn numberController.number_update_post method');
}
exports.number_delete_get = (req,res,next) => {
    res.render('TODO: Implement numberController.number_delete_get method');
}
exports.number_delete_post = (req,res,next) => {
    res.render('TODO: Implement numberController.number_delete_post method');
}
