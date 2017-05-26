'use strict';
const Joi                = require('joi');
const MovieListValidator = require('../../../lib/validators/movies/list');

describe('movie list validator', () => {

  describe('title', () => {

    it('requires fuzzy', () => {
      const payload = {title: 'WALL-E'};
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path).to.eql('value');
    });

    it('is less than 255 characters', () => {
      const payload = { title : 'a'.repeat(256) };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('release year', () => {

    it('does not go with start year', () => {
      const payload = {
        title: 'foo',
        release_year: 1877,
        start_year: 2005
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path).to.eql('release_year');
    });

    it('does not go with end year', () => {
      const payload = {
        title: 'foo',
        release_year: 1990,
        end_year: 2005
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path).to.eql('release_year');
    });

  });

});