const fetch = require('isomorphic-fetch');
const R = require('ramda');

const baseUrl = 'https://api.spotify.com';

const fetchJSON = (endpoint, options) => (
  fetch(baseUrl + endpoint, options).then(res => res.json())
);

const getIds = R.map(R.prop('id'));
const firstTwo = R.slice(0, 2);
const firstTwoIds = R.compose(getIds, firstTwo);
const getNameAndPop = R.map(R.props(['name', 'popularity']));

exports.fetchRelated = (id, callback) => {
  fetchJSON(`/v1/artists/${id}/related-artists`)
    .then(res => callback(null, firstTwoIds(res.artists)))
    .catch(callback);
};

exports.fetchTopTracks = (id, callback) => {
  fetchJSON(`/v1/artists/${id}/top-tracks?country=FR`)
    .then(res => callback(null, getNameAndPop(res.tracks)))
    .catch(callback);
};
