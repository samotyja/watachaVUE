import SpotifyWebApi from 'spotify-web-api-js';
import { refreshTokenIfNeeded } from './refreshTokenIfNeeded';

const spotifyApi = new SpotifyWebApi();

const PLAYLIST_ID = '4nBwoT5hFwFq8aRoYSd7Zz';
const TRACKS_PER_REQUEST = 50;
const DELAY_BETWEEN_REQUESTS = 1000;

function setAccessToken() {
  const accessToken = localStorage.getItem('spotify_access_token');
  spotifyApi.setAccessToken(accessToken);
}

async function searchTrack(artist, title) {
  await refreshTokenIfNeeded();
  setAccessToken();
  
  try {
    const response = await spotifyApi.searchTracks(`track:${title} artist:${artist}`, { limit: 1 });
    if (response.tracks.items.length > 0) {
      return response.tracks.items[0].uri;
    }
    return null;
  } catch (error) {
    console.error(`Error searching for track: ${title} by ${artist}`, error);
    return null;
  }
}

async function addTracksToPlaylist(trackUris) {
  await refreshTokenIfNeeded();
  setAccessToken();
  
  try {
    await spotifyApi.addTracksToPlaylist(PLAYLIST_ID, trackUris);
    console.log(`Added ${trackUris.length} tracks to playlist`);
  } catch (error) {
    console.error('Error adding tracks to playlist', error);
    throw error;
  }
}

export async function createPlaylistFromJson(jsonData, progressCallback) {
  const trackUris = [];
  let processedTracks = 0;
  
  for (const track of jsonData) {
    const uri = await searchTrack(track.ARTIST, track.TITLE);
    if (uri) {
      trackUris.push(uri);
    }
    
    processedTracks++;
    if (progressCallback) {
      progressCallback(processedTracks, jsonData.length);
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    if (trackUris.length === TRACKS_PER_REQUEST || track === jsonData[jsonData.length - 1]) {
      if (trackUris.length > 0) {
        await addTracksToPlaylist(trackUris);
        trackUris.length = 0;
      }
      
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_REQUESTS));
    }
  }
}