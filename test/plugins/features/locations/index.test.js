'use strict';

const Location = require('../../../../lib/server');

describe('location integration', () => {

  describe('create', () => {

    it('creates a location', () => {
      return Location.inject({
        url: '/locations',
        method: 'POST',
        payload: { name: '185 Berry Street' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('location');
      });
    });

  });

});
