/**
 * Created by user on 29.06.2017.
 */
import React from 'react';
import '../styles/blocks/card.css';

export default function Card(props) {
    return (
        <div className="card">
            <div className="card__inner">
                <h5 className="card__title">
                    {props.data.title}
                </h5>
            </div>
        </div>
    )
}