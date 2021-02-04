const express = require('express');
const numberController = require('../controllers/numberController');
const numbertypeController = require('../controllers/numbertypeController');
const formulaController = require('../controllers/formulaController');
const mathematicianController = require('../controllers/mathematicianController');
const router = express.Router();
//Home
router.get('/',numberController.home);
//Number Handlers
router.get('/numbers',numberController.number_list);
router.get('/number/:id',numberController.number_detail);
router.get('/number/create',numberController.number_create_get);
router.post('/number/create',numberController.number_create_post);
router.get('/number/:id/update',numberController.number_update_get);
router.post('/number/:id/update',numberController.number_update_post);
router.get('/number/:id/delete',numberController.number_delete_get);
router.post('/number/:id/delete',numberController.number_delete_post);
//NumberType Handlers
router.get('/numbertypes',numbertypeController.numbertype_list);
router.get('/numbertype/:id',numbertypeController.numbertype_detail);
router.get('/numbertype/create',numbertypeController.numbertype_create_get);
router.post('/numbertype/create',numbertypeController.numbertype_create_post);
router.get('/numbertype/:id/update',numbertypeController.numbertype_update_get);
router.post('/numbertype/:id/update',numbertypeController.numbertype_update_post);
router.get('/numbertype/:id/delete',numbertypeController.numbertype_delete_get);
router.post('/numbertype/:id/delete',numbertypeController.numbertype_delete_post);
//Mathematician Handlers
router.get('/mathematicians',mathematicianController.mathematician_list);
router.get('/mathematician/:id',mathematicianController.mathematician_detail);
router.get('/mathematician/create',mathematicianController.mathematician_create_get);
router.post('/mathematician/create',mathematicianController.mathematician_create_post);
router.get('/mathematician/:id/update',mathematicianController.mathematician_update_get);
router.post('/mathematician/:id/update',mathematicianController.mathematician_update_post);
router.get('/mathematician/:id/delete',mathematicianController.mathematician_delete_get);
router.post('/mathematician/:id/delete',mathematicianController.mathematician_delete_post);
//Formula Handlers
router.get('/formulas',formulaController.formula_list);
router.get('/formula/:id',formulaController.formula_detail);
router.get('/formula/create',formulaController.formula_create_get);
router.post('/formula/create',formulaController.formula_create_post);
router.get('/formula/:id/update',formulaController.formula_update_get);
router.post('/formula/:id/update',formulaController.formula_update_post);
router.get('/formula/:id/delete',formulaController.formula_delete_get);
router.post('/formula/:id/delete',formulaController.formula_delete_post);

module.exports = router;
