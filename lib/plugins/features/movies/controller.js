'use strict';

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  const object = { name: payload.title };
  return new Movie().save(object)
  .then((movie) => new Movie({ id: movie.id }).fetch());
};

exports.findAll = (params) => {

  return new Movie().query((qb) => {
    params = params || {};
    if (params.release_year) {
      qb.where('release_year', params.release_year);
    }
    if (params.start_year) {
      qb.where('release_year', '>=', params.start_year);
    }
    if (params.end_year) {
      qb.where('release_year', '<=', params.end_year);
    }
    if (params.title && !params.fuzzy) {
      qb.where('name', params.title);
    }
    if (params.title && params.fuzzy) {
      qb.where('name', 'like', `%${params.title}%`);
    }
  }).fetchAll();

}
