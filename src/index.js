const async = require('async');
const R = require('ramda');
const { fetchRelated, fetchTopTracks } = require('./fetch.js');

const artists = [
  '3Rq3YOF9YG9YfCWD4D56RZ',
  '4D2G48IdJKhcdZ5c1dqp5Z',
  '5eyMzR1hYiEZtN2c9ly2kw',
  '4tZwfgrHOc3mvqYlEYSvVi',
  '53zPVFS5lrh8IAwsr7JdL1',
];

const sortByPopularity = R.sortBy(R.prop(1));
const getTopTrack = R.compose(R.prop(0), R.last, sortByPopularity, R.unnest);

const getRelated = ids => callback => async.map(ids, fetchRelated, callback);
const getTopTracks = (ids, callback) => async.map(R.flatten(ids), fetchTopTracks, callback);

async.waterfall([
  getRelated(artists),
  getTopTracks,
], (err, results) => {
  console.log(getTopTrack(results));
});
