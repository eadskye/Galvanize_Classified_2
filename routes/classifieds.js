
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  knex('classifieds')
    .select('id', 'title', 'description', 'price', 'item_image').from('classifieds')
    .orderBy('id')
    .then((classifieds) => {

      res.json(classifieds);
    })
    .catch((err) => {
      next(err);
    });
});


router.get('/:id', (req, res, next) => {
      let reqID = parseInt(req.params.id);
      knex.select('id', 'title', 'description', 'price', 'item_image')
      .where('id', req.params.id)
      .first()
      .then((classifieds) => {
        res.json(classifieds);
      })
      .catch((err) => {
        next(err);
      });
});
// create a new ad and return the id, title, description, price and item_image that were created.:

router.post('/', (req, res, next) => {

  knex('classifieds')//queries the db
    // .returning(['id', 'title', 'description', 'price', 'item_image'])

      .insert(req.body)
    .returning('*')
    .then(classifieds => {
      delete classifieds[0].created_at;
      delete classifieds[0].updated_at;
      res.json(classifieds[0]);
    })
    .catch(err => next(err));
});


router.patch('/:id', (req, res, next) => {
  let reqID = parseInt(req.params.id);

 knex('classifieds')
   .update(req.body, '*')
   .where({
     id: reqID
   })
   .returning('*')
   .then(classifieds => {
     delete classifieds[0].created_at;
     delete classifieds[0].updated_at;
     res.json(classifieds[0]);
   })
   .catch(err => next(err));
});

  router.delete('/:id', (req, res, next) => {
  var classified_ad;

  knex('classifieds')
  var classified_del;
let reqID = parseInt(req.params.id);
knex('classifieds')
  .where({
    id: reqID
  })
  .first()
  .then((classified) => {
    classified_del = classified;
    return knex('classifieds')
      .del()
      .where({
        id: reqID
      });
  })
  .then(() => {
    delete classified_del.created_at;
    delete classified_del.updated_at;
    res.json(classified_del);
  })
  .catch(err => next(err));
});


module.exports= router;
