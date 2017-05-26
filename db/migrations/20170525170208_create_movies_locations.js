'use strict';

exports.up = function (Knex, Promise) {
  return Knex.schema.createTable('movies_locations', (table) => {
    table.increments('id').primary();
    table.integer('movie_id').references('movies.id');
    table.integer('location_id').references('locations.id');
  });
};

exports.down = function (Knex, Promise) {
  return Knex.schema.dropTable('movies_locations');
};
