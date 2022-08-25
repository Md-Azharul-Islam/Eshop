import React from 'react'
import { useSelector } from "react-redux";
import Loading from "../../layout/Loader/Loading"
import ReactStars from 'react-rating-stars-component';
import profilePng from "../../Assets/profile.png";


const ReviewCard = ({ review }) => {

    const {loading}=useSelector((state) =>state.productDetails);

  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
    activeColor:"tomato",
    edit:false
  };

  return (
   <>
   { loading ?(
       <Loading/>
   ):(
    <>
       <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
    </>

   )}
   </>
  );
};

export default ReviewCard;