import React, { Component } from 'react';
import { withFirebase } from '../../Firebase';
import AddSessionModal from './addSessionModal';

const INITIAL_STATE = {
    startingPoints: 40, note: '', error: '',
    player1Name: '', player2Name: '', player3Name: '', player4Name: '',
    player1Points: '', player2Points: '', player3Points: '', player4Points: '',
};


class Sessions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            formValues: INITIAL_STATE,
            sessions: []

        }
    };

    componentDidMount() {
        this.getSessions();
    }

    toggleModal = () => {
        console.log('toggle');
        this.setState({ modalIsOpen: !this.state.modalIsOpen });
    }

    getSessions = () => {

        this.props.firebase.sessions().on('value', snapshot => {
            if (snapshot.val()) {
                const sessionsList = Object.keys(snapshot.val()).map(key => ({
                    id: key,
                    ...snapshot.val()[key],
                }))

                sessionsList.sort(function (a, b) {
                    return new Date(b.dateTime) - new Date(a.dateTime);
                });

                this.setState({
                    sessions: sessionsList
                })
            }
        });
    }

    newSession = () => {
        this.setState({ formValues: INITIAL_STATE }
            , () => {
                this.toggleModal();
            });
    }

    submitSession = formValues => {
        const {
            startingPoints, note,
            player1Name, player2Name, player3Name, player4Name,
        } = formValues;

        const player1Points = parseInt(formValues.player1Points);
        const player2Points = parseInt(formValues.player2Points);
        const player3Points = parseInt(formValues.player3Points);
        const player4Points = parseInt(formValues.player4Points);

        const dateTime = new Date().toLocaleString();
        const player1Score = player1Points - startingPoints;
        const player2Score = player2Points - startingPoints;
        const player3Score = player3Points - startingPoints;
        const player4Score = player4Points - startingPoints;

        console.log(startingPoints, note,
            player1Name, player2Name, player3Name, player4Name,
            player1Points, player2Points, player3Points, player4Points);


        this.props.firebase.playerNames()
            .update({
                [player1Name]: player1Name, [player2Name]: player2Name, [player3Name]: player3Name, [player4Name]: player4Name
            })
            .catch(error => { this.setState({ error }); });

        this.props.firebase.sessions()
            .push({
                startingPoints, note, dateTime,
                player1Points, player2Points, player3Points, player4Points,
                player1Name, player2Name, player3Name, player4Name
            })
            .then((snap) => {
                const key = snap.key;

                this.props.firebase.playerData(player1Name).child(key)
                    .set({
                        dateTime, startingPoints,
                        points: player1Points, score: player1Score
                    });
                this.props.firebase.playerData(player2Name).child(key)
                    .set({
                        dateTime, startingPoints,
                        points: player2Points, score: player2Score
                    });
                this.props.firebase.playerData(player3Name).child(key)
                    .set({
                        dateTime, startingPoints,
                        points: player3Points, score: player3Score
                    });
                this.props.firebase.playerData(player4Name).child(key)
                    .set({
                        dateTime, startingPoints,
                        points: player4Points, score: player4Score
                    });

            })
            .catch(error => { this.setState({ error }); });


        // this.props.firebase
        //     .location(location)
        //     .update({ location })
        //     .then(() => {
        //         this.setState({ formValues: INITIAL_STATE });
        //         this.notify();
        //     })
        //     .catch(error => { this.setState({ error }); });

        this.toggleModal();
    };

    render() {
        const {
            sessions
        } = this.state

        console.log(sessions);

        return (
            <div>
                <h5>
                    sessions
                </h5>

                <button onClick={this.newSession}
                    className={`btn btn-primary`} style={{ marginLeft: '20px' }}>
                    new
                </button>

                {
                    sessions.map((item, i) =>
                        <div key={i} className='card card-body bg-light' style={{margin:20}}>
                            <div>Players: {item.player1Name}, {item.player2Name}, {item.player3Name}, {item.player4Name} </div>
                            <div>Points: {item.player1Points}, {item.player2Points}, {item.player3Points}, {item.player4Points} </div>
                        </div>
                    )
                }



                <AddSessionModal show={this.state.modalIsOpen}
                    formValues={this.state.formValues}
                    toggleModal={this.toggleModal}
                    submitSession={this.submitSession}>
                </AddSessionModal>

            </div>
        )
    }
}

export default withFirebase(Sessions);
