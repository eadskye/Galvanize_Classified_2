
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  knex('classifieds')
    .select('id', 'title', 'description', 'price', 'item_image')
    .orderBy('id')
    .then((classifieds) => {

      res.send(classifieds);
    })
    .catch((err) => {
      next(err);
    });
});


router.get('/:id', (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    if (isNaN(id)) {
      return next();
    }
    knex('classifieds')
      .select('id', 'title', 'description', 'price', 'item_image')
      .where('id', req.params.id)
      .first()
      .then((classifieds) => {
        res.send(classifieds);
      })
      .catch((err) => {
        next(err);
      });
});
// create a new ad and return the id, title, description, price and item_image that were created.:

router.post('/', (req, res, next) => {

  knex('classifieds')//queries the db
    // .returning(['id', 'title', 'description', 'price', 'item_image'])
    .insert({
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      item_image: req.body.item_image
    }, ['id', 'title', 'description', 'price', 'item_image'])
    .then((classifieds) => {

      res.send(classifieds[0]);
    })
    .catch((err) => {
      next(err);
    });

});
router.patch('/:id', (req, res, next) => {
  knex('classifieds')
    .where('id', req.params.id)
    .update({
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      item_image: req.body.item_image
    }, ['id', 'title', 'description', 'price', 'item_image'])
    // .orderBy('id')
    .then((classifieds) => {
      res.send(classifieds[0]);
    })
    .catch(function(err){
      next(err);
    });

  });

  router.delete('/:id', (req, res, next) => {
  var classified_ad;

  knex('classifieds')
    .where('id', req.params.id)
    .select('id', 'title', 'description', 'price', 'item_image')
    .first()
    .then((classifieds) => {
    classified_ad= classifieds;
      return knex('classifieds')
        .del()
        .where('id', req.params.id);
    })
    .then(() => {
      delete classified_ad.created_at;
      delete classified_ad.updated_at;
      res.send(classified_ad);


    })
    .catch(function(err){
      next(err);

});

});
module.exports= router;
