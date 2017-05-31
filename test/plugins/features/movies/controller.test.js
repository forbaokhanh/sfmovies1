'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Movie      = require('../../../../lib/models/movie');

describe('movie controller', () => {

  describe('create', () => {

    it ('creates a movie', () => {
      const payload = { title: 'WALL-E' };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('name')).to.eql(payload.title);

        return new Movie({ id: movie.id}).fetch();

      })
      .then((movie) => {
        expect(movie.get('name')).to.eql(payload.title);
      });
    });

  });

  describe('retrieve a list of movies', () => {

    it('returns all movies', () => {
      let count;
      return new Movie().fetchAll()
      .then((movies) => {
        count = movies.length;
        return Controller.findAll();
      })
      .then((movies) => {
        expect(movies).to.exist;
        expect(movies).to.have.length(count);
      });
    });

  });

  describe('filters movies based on specified dates', () => {

    it('returns movies in 2000', () => {
      let count;
      return new Movie().query(function(qb) {
        qb.where('release_year', 2000);
      })
      .fetchAll()
      .then((movies) => {
        count = movies.length;
        return Controller.findAll({ release_year: 2000 });
      })
      .then((movies) => {
        expect(movies).to.exist;
        expect(movies).to.have.length(count);

        if (count !== 0) {
          for (var m in movies.models) {
            expect(movies.models[m].attributes.release_year).to.eql(2000);
          }
        }
      });
    });

    it('returns movies between 1898 and 2005', () => {
      let count;
      return new Movie().query(function(qb) {
        qb.where('release_year', '>=', 1898).andWhere('release_year', '<=', 2005);
      })
      .fetchAll()
      .then((movies) => {
        count = movies.length;
        return Controller.findAll({ start_year: 1898, end_year: 2005 });
      })
      .then((movies) => {
        expect(movies).to.exist;
        expect(movies).to.have.length(count);

        if (count !== 0) {
          for (var m in movies.models) {
            expect(movies.models[m].attributes.release_year).to.within(1898, 2005);
          }
        }
      });
    });

  });

  describe('filters movies based on title', () => {

    it('finds all the movies that are named WALL-E', () => {
      let count;
      return new Movie().query(function(qb) {
        qb.where('name', 'WALL-E');
      })
      .fetchAll()
      .then((movies) => {
        count = movies.length;
        return Controller.findAll({ title: 'WALL-E', fuzzy: 'no' });
      })
      .then((movies) => {
        expect(movies).to.exist;
        expect(movies).to.have.length(count);

        if (count !== 0) {
          for (var m in movies.models) {
            expect(movies.models[m].attributes.name).to.eql('WALL-E');
          }
        }
      });
    });

    it('finds all the movies that contain ALL', () => {
      let count;
      return new Movie().query(function(qb) {
        qb.where('name', 'like', '%ALL%');
      })
      .fetchAll()
      .then((movies) => {
        count = movies.length;
        return Controller.findAll({ title: 'ALL', fuzzy: 'yes' });
      })
      .then((movies) => {
        expect(movies).to.exist;
        expect(movies).to.have.length(count);

        if (count !== 0) {
          for (var m in movies.models) {
            expect(movies.models[m].attributes.name).to.include('ALL');
          }
        }
      });
    });

  });

  describe('assignLocation', () => {

    it('adds a location to a movie', () => {
      const movie_id = 1;
      const location_id = 6;
      let beforeCount;

      return new Movie({ id: movie_id }).fetch({
        withRelated: 'locations'
      })
      .then((movie) => {
        beforeCount = movie.related('locations').length;
        return Controller.assignLocation(movie_id, location_id);
      })
      .then((movie) => {
        const afterCount = movie.related('locations').length;
        expect(beforeCount + 1).to.be.eql(afterCount);
      });
    });

  });

});
