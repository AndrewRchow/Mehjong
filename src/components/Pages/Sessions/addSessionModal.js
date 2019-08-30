import React from 'react';
import classes from './sessions.module.css';
import { withFirebase } from '../../Firebase';

import AutoSuggestName from '../../ThirdParty/AutoSuggestName/index';

class AddSessionModal extends React.Component {
    constructor(props) {
        super(props);
        this.node = React.createRef()

        this.state = props.formValues;
    }

    handleContainerClick = (e) => {
        // if (this.node.contains(e.target)) {
        //     return;
        // }
        // this.props.toggleModal();
    }

    componentWillReceiveProps(props) {
        this.setState(props.formValues);
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    getAutosuggestInput = (playerName, playerProp) => {
        this.setState({ [playerProp]: playerName });
    }
    getAutoSuggestSelected = (playerName, playerProp) => {
        this.setState({ [playerProp]: playerName });
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        // The gray background
        const backdropStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            maxHeight: '100vh',
            overflowY: 'auto',
            backgroundColor: 'rgba(0,0,0,0.1)',
            padding: '40px 20px'
        };

        const {
            startingPoints, note, error,
            player1Name, player2Name, player3Name, player4Name,
            player1Points, player2Points, player3Points, player4Points,
        } = this.state;

        let fourNames = {};
        fourNames[player1Name] = true;
        fourNames[player2Name] = true;
        fourNames[player3Name] = true;
        fourNames[player4Name] = true;
        const fourDifferentNames = Object.keys(fourNames).length === 4

        const isInvalid =
        !fourDifferentNames || startingPoints === '' ||
            player1Name === '' || player2Name === '' || player3Name === '' || player4Name === '' ||
            player1Points === '' || player2Points === '' || player3Points === '' || player4Points === '';

        return (
            <div style={backdropStyle} onClick={this.handleContainerClick}>
                <div ref={node => this.node = node}>
                    <div className="modal-content" style={{ maxWidth: '700px' }}>
                        <div className="modal-header">
                            <h5 className="modal-title">New</h5>
                            <button type="button" className="close" onClick={this.props.toggleModal} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={`modal-body`}>
                            <div className='row'>
                                <div>
                                    starting points
                            </div>
                                <input type="number" name="startingPoints"
                                    value={startingPoints} onChange={this.onChange}></input>
                            </div>

                            <div className='row'>
                                <div className='col-md-6'>
                                    Player
                                </div>
                                <div className='col-md-6'>
                                    Points
                                    </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-6'>
                                    <AutoSuggestName
                                        getInputData={this.getAutosuggestInput}
                                        getSelectedData={this.getAutoSuggestSelected}
                                        playerName={player1Name} playerProp="player1Name"
                                        placeholder="Player 1" />
                                </div>
                                <div className='col-md-6'>
                                    <input type="number" name="player1Points" placeholder="Player 1"
                                        value={player1Points} onChange={this.onChange}
                                        className={`form-control`}></input>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-6'>
                                    <AutoSuggestName
                                        getInputData={this.getAutosuggestInput}
                                        getSelectedData={this.getAutoSuggestSelected}
                                        playerName={player2Name} playerProp="player2Name"
                                        placeholder="Player 2" />
                                </div>
                                <div className='col-md-6'>
                                    <input type="number" name="player2Points" placeholder="Player 2"
                                        value={player2Points} onChange={this.onChange}
                                        className={`form-control`}></input>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-6'>
                                    <AutoSuggestName
                                        getInputData={this.getAutosuggestInput}
                                        getSelectedData={this.getAutoSuggestSelected}
                                        playerName={player3Name} playerProp="player3Name"
                                        placeholder="Player3" />
                                </div>
                                <div className='col-md-6'>
                                    <input type="number" name="player3Points" placeholder="Player 3"
                                        value={player3Points} onChange={this.onChange}
                                        className={`form-control`}></input>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-6'>
                                    <AutoSuggestName
                                        getInputData={this.getAutosuggestInput}
                                        getSelectedData={this.getAutoSuggestSelected}
                                        playerName={player4Name} playerProp="player4Name"
                                        placeholder="Player 4" />
                                </div>
                                <div className='col-md-6'>
                                    <input type="number" name="player4Points" placeholder="Player 4"
                                        value={player4Points} onChange={this.onChange}
                                        className={`form-control`}></input>
                                </div>
                            </div>

                            <div className='row'>
                                <textarea type="text" name="note" placeholder="Note"
                                    value={note} onChange={this.onChange}
                                    className={`form-control ${classes.textarea}`}
                                />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button className={`btn btn-primary ${classes.submitButton}`} disabled={isInvalid}
                                onClick={() => this.props.submitSession(this.state)} >
                                Add session
                                     </button>
                            {error && <p>{error.message}</p>}
                        </div>

                    </div>
                </div>
            </div >
        )
    }
}

export default withFirebase(AddSessionModal);