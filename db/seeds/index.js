'use strict';

const Movies    = require('./data/movies');
const Locations = require('./data/locations');

exports.seed = function (Knex) {
  return Knex('movies').truncate()
  .then(() => {
    return Knex('movies').insert(Movies);
  }).then(() => {
    return Knex('locations').truncate()
  }).then(() => {
    return Knex('locations').insert(Locations);
  })
};
