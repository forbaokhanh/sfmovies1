'use strict';

const Location = require('../../../models/location');
const Movie    = require('../../../models/movie');

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

exports.assignLocation = (movie_id, location_id) => {
  let movie;
  return new Movie({ id: movie_id }).fetch({
    withRelated: ['locations']
  })
  .then((m) => {
    movie = m;
    return new Location({ id: location_id }).fetch();
  })
  .then((location) => {
    const associatedLocations = movie.related('locations').models.map((model) => model.id);
    if (!associatedLocations.includes(location_id)) {
      return movie.related('locations').attach(location);
    }
  })
  .then(() => {
    return new Movie({ id: movie_id }).fetch({
      withRelated: ['locations']
    });
  });
}
