import './App.css';
import React from 'react';

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [],
      playlistTracks: [],
      playlistName: '',
      accessToken: ''
    }
  }

  addTrack(track) {
    let inPlaylist = false;
    let tracks = this.state.playlistTracks;
    for(let i=0; i<tracks.length; i++) {
      if(tracks[i].id === track.id) {
        inPlaylist = true;
      }
    }
    if(!inPlaylist) {
      tracks.push(track);
      this.setState({
        playlistTracks: tracks
      })
    }
  }

  removeTrack(track) {
    let inPlaylist = false;
    let tracks = this.state.playlistTracks;
    for(let i=0; i<tracks.length; i++) {
      if(tracks[i].id === track.id) {
        inPlaylist = true;
      }
    }
    if(inPlaylist) {
      let trackToRemove = tracks.indexOf(track);
      tracks.splice(trackToRemove, 1);
      this.setState({
        playlistTracks: tracks
      })
    }
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    let trackURIs = '';
    let tracks = this.state.playlistTracks;
    for(let i=0; i<tracks.length; i++) {
      trackURIs += `${tracks[i].uri},`;
    }
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    alert(`Playlist ${this.state.playlistName} has been saved to Spotify!`);
    /***TODO*** SAVE tracks TO SPOTIFY ACCT */
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(results => {
      this.setState({
      searchResults: results
      });
    });
  }

  componentDidMount() {
    Spotify.getAccessToken();
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist onRemove={this.removeTrack} playlistTracks={this.state.playlistTracks} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
