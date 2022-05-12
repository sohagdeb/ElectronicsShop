import React, { useContext } from 'react';
import { Store } from '../Store';

import '../index.css'
import RatingTestmonial from './RatingTestmonial';

const DisplayReview = (props) => {
    const { state } = useContext(Store);
    const { userInfo } = state;

    const { Name, Star, Comment, Email, _id } = props.review;
    const { handleDelete } = props;


    return (
        <div className="col-lg-3  mb-5">


            <div class="card9 text-center py-5">
                <div class="card-body">
                    <h5 class="card-title text-danger">{Name}</h5>
                    <span>{Email}</span>
                    <RatingTestmonial rating={Star} numReviews='' readOnly />


                    <div style={{ height: '150px', overflow: 'auto', border: '2px solid black' }}>{Comment}</div>
                </div>
                {userInfo && userInfo.isAdmin && (
                    <button class='btn btn-danger btn-sm' onClick={() => handleDelete(_id)}>Delete</button>
                )}
            </div>
        </div >
    );
};

export default DisplayReview;