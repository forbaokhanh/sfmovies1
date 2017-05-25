'use strict';

const Movie = require('../../../../lib/server');

describe('movies integration', () => {

  describe('create', () => {

    it('creates a movie', () => {
      return Movie.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });
    });

  });

  describe('display', () => {

    it('displays all movies', () => {
      return Movie.inject({
        url: '/movies',
        method: 'GET',
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

    it('displays movies in a specified release year', () => {
      return Movie.inject({
        url: '/movies',
        method: 'GET',
        headers: { release_year: '2005' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

    it('displays movies in that matches a title', () => {
      return Movie.inject({
        url: '/movies',
        method: 'GET',
        headers: { title: 'WALL-E' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

  });

});
