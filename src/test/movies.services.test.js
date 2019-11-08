const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib.mock');

const { moviesMock } = require('../utils/mocks/movies.mock');

describe('services - movies', function() {
  const MoviesServices = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock
  });

  const moviesService = new MoviesServices();

  describe('when getMovies method is called', async function() {
    it('should call the getall MongoLib method', async function() {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of movies', async function() {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepEqual(result, expected);
    });
  });
});