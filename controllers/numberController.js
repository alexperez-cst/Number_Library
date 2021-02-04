const express = require('express');

exports.home = function (req,res,next) {
    res.render('index',{title:'Number Library'});
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
