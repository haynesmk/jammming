
const clientID = '7f856c6da20d4509a380d58c450625ad';
const redirectURI = 'http://localhost:3000';
//const redirectURI = 'http://winston-jammming.surge.sh';

let accessToken;

export const Spotify = {

    getAccessToken() {
        if(accessToken) {
            return accessToken;
        } 
        const urlToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiration = window.location.href.match(/expires_in=([^&]*)/);
        if(urlToken && urlExpiration) {
            accessToken = urlToken[1];
            const expirationTime = Number(urlExpiration[1]);
            window.setTimeout(() => accessToken = '', expirationTime * 1000);
            window.history.pushState('Access Token', null, '/');
            return urlToken;
        } else {
            const redirectURL = 'https://accounts.spotify.com/authorize?client_id='+
                clientID+'&response_type=token&scope=playlist-modify-public&redirect_uri='+redirectURI;
            window.location.replace(redirectURL);
        }

    },

    async search(searchTerm) {
        const accessToken = Spotify.getAccessToken();
        const endpoint = 'https://api.spotify.com/v1/search?type=track&q='+searchTerm;
        const header = {
            headers: { Authorization: `Bearer ${accessToken}` }
        }
        try {
            const response = await fetch(endpoint, header);
            if(response.ok) {
                const searchResults = await response.json();
                return searchResults.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                })
            }
            throw new Error('Request to Spotify search failed!');
        } catch(error) {
            console.log(error);
        }
    },

    async savePlaylist(playlistName, trackURIs) {
        /*if(!playlistName || !trackURIs) {
            return;
        }*/
        const accessToken = Spotify.getAccessToken();
        const meEndpoint = 'https://api.spotify.com/v1/me'
        const headers = {
            headers: { 
                Authorization: `Bearer ${accessToken}`,
            }
        }
        let userID = '';
        try {
            let response = await fetch(meEndpoint, headers);
            if(response.ok) {
                response =  await response.json();
                userID = response.id;
                const createPlaylistEndpoint = 'https://api.spotify.com/v1/users/';
                const savePlaylistResponse = await fetch(`${createPlaylistEndpoint}${userID}/playlists`, {
                    method: 'POST',
                    body: JSON.stringify({'name': playlistName}),
                    headers: { Authorization: `Bearer ${accessToken}`,
                               'Accept': 'application/json',
                               'Content-Type': 'application/json' 
                    }
                });
                const playlistJSON = await savePlaylistResponse.json();
                const addToPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${playlistJSON.id}/tracks?uris=${trackURIs}`
                const addToPlaylistResponse = await fetch(addToPlaylistEndpoint, {
                    method: 'POST',
                    body: JSON.stringify({
                        'name': playlistName}),
                    headers: { Authorization: `Bearer ${accessToken}`,
                               'Accept': 'application/json',
                               'Content-Type': 'application/json' 
                    }
                })
            }
            throw new Error('Request failed');
        } catch(error) {
            console.log(error);
        }

    }
}
