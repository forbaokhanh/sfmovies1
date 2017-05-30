'use strict';

const Controller              = require('./controller');
const LocationCreateValidator = require('../../../validators/locations/create');

exports.register = (server, options, next) => {

  server.route([{
    method: 'POST',
    path: '/locations',
    config: {
      handler: (request, reply) => {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: LocationCreateValidator
      }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'locations'
};
