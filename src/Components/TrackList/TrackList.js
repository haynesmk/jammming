import React from 'react';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {


    render() {
        try {
            if(this.props.tracks) {
                return (
                    <div className="TrackList">
                        {this.props.tracks.map(track => <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />)}
                    </div>
                );
            }
            alert('Search request can\'t be empty!')
            throw new Error('Search request can\'t be empty!');
        }
        catch (requestError) {
            console.log(requestError);
            const track = {
                id: ''
            }
            return (
                <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />
            );
        }
    }
}