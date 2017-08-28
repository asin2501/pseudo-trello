import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../styles/blocks/full-card.css';
import {hashHistory} from 'react-router';

class FullCard extends Component {
    close() {
        let path = hashHistory.getCurrentLocation().pathname.split('/');
        path.pop();
        path = path.join('/');
        hashHistory.push(path);
    }

    render() {
        if (this.props.data) {
            return (
                <div className="full-card">
                    <div className="full-card__inner-wrap">
                        <div className="full-card__inner">
                            <div className="full-card__header">
                                <div className="full-card__title-wrapper">
                                    <textarea className="full-card__title">{this.props.data.title}</textarea>
                                </div>
                                <div className="full-card__info">
                                    <p className="full-card__id">id: {this.props.data.id}</p>
                                    <p className="full-card__date">Was created: {this.props.data.id}</p>
                                </div>
                                <button onClick={this.close} className="btn-close full-card__btn-close">x</button>
                            </div>
                            <div className="full-card__body">
                                <div className="full-card__description-column">
                                    will be some description
                                </div>
                                <div className="card-side-column">
                                    <h5 className="card-side-column__">Actions:</h5>
                                    <button>remove card</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default connect(
    (state, ownProps) => {
        return {
            data: state.cards[ownProps.params.cardId],
        };
    },
    dispatch => ({})
)(FullCard);
