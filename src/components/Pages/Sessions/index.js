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

        }
    };

    toggleModal = () => {
        console.log('toggle');
        this.setState({ modalIsOpen: !this.state.modalIsOpen });
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
            player1Points, player2Points, player3Points, player4Points
        } = formValues;
console.log(   startingPoints, note,
    player1Name, player2Name, player3Name, player4Name,
    player1Points, player2Points, player3Points, player4Points);
        const dateTime = new Date().toLocaleString();

        this.props.firebase
            .playerNames()
            .update({
                [player1Name]: player1Name,
                [player2Name]: player2Name,
                [player3Name]: player3Name,
                [player4Name]: player4Name                
            })
            .catch(error => { this.setState({ error }); });

        // this.props.firebase
        //     .bobaShopUserReview(bobaShopAndLocation, userId)
        //     .update({
        //         username, avatar,
        //         score1, score2, score3, score4,
        //         score5, score6, score7, score8,
        //         note, dateTime
        //     })
        //     .catch(error => { this.setState({ error }); });

        // this.props.firebase
        //     .bobaShop(bobaShopAndLocation)
        //     .update({ bobaShop: bobaShopAndLocation })
        //     .catch(error => { this.setState({ error }); });

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
        return (
            <div>
                <h5>
                    sessions
                </h5>

                <button onClick={this.newSession}
                    className={`btn btn-primary`} style={{ marginLeft: '20px' }}>
                    new
                </button>

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
