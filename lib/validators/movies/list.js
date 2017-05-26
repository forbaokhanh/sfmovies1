'use strict';

const Joi = require('joi');

const MovieListValidator= Joi.object().keys({
  release_year: Joi.number().integer().min(1878).max(9999).optional(),
  start_year: Joi.number().integer().min(1878).max(9999).optional(),
  end_year: Joi.number().integer().min(1878).max(9999).optional(),
  title: Joi.string().max(255).optional(),
  fuzzy: Joi.boolean().optional()
}).and('title', 'fuzzy')
  .without('release_year', ['start_year', 'end_year'])
  .without('start_year', 'release_year')
  .without('end_year', 'release_year');


module.exports = MovieListValidator;
