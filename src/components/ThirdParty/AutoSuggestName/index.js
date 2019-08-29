import React from 'react';
import Autosuggest from 'react-autosuggest';
import { withFirebase } from '../../Firebase';
import theme from './theme.css';

let names = [
];

const getSuggestions = value => {
  console.log(1);
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? names : names.filter(name =>
    name.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class AutoSuggestName extends React.Component {
  constructor(props) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: this.props.playerName,
      suggestions: [],
      playerProp: this.props.playerProp
    };
  }

  componentDidMount() {
    // this.props.firebase.bobaShops().on('value', snapshot => {
    //   const bobaShopsObject = snapshot.val();
    //   if (bobaShopsObject) {
    //     const bobaShopsList = Object.keys(bobaShopsObject).map(key => ({
    //       name: key,
    //     }))
    //     bobaShops = bobaShopsList;
    //   }
    // });
  }

  componentWillReceiveProps(props) {
    console.log('props', props);
    this.setState({ value: props.playerName });
  }

  onChange = (event, { newValue }) => {
    console.log('event', event, newValue);
    this.setState({
      value: newValue
    });
    this.props.getInputData(newValue, this.state.playerProp);

  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.props.getSelectedData(suggestionValue, this.state.playerProp);
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  componentWillUnmount() {
    // this.props.firebase.bobaShops().off();
  }


  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: this.props.placeholder ? this.props.placeholder : 'Player name',
      value,
      onChange: this.onChange
    };

    return (

      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        highlightFirstSuggestion={true}
        // alwaysRenderSuggestions={true}
      //styling from theme.css   
      />
    );
  }
}

export default withFirebase(AutoSuggestName);
