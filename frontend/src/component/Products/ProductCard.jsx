import React from 'react'
import { Link} from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const ProductCard = ({product}) => {
    
  const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth <600 ? 20: 22,
    value:product.ratings,
    isHalf:true
  };

  return (
    <>
      <Link className="ProductCard" to={`/product/${product._id}`}>
            <img
              src={product.images[0].url}
              alt={product.name}
              className="ProductImg"
            />
            <p className="productName">{product.name}</p>
            <div>
            <ReactStars {...options} />
              <span>({product.numOfReviews} Reviews)</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="offerPriceBox">
                <h1
                  className="discountPrice"
                  style={{
                    paddingLeft: "2.5vmax",
                    fontSize: ".9vmax",
                    paddingBottom: "0",
                  }}
                >
                  {product.offerPrice > 0 ? `$${product.offerPrice}` : ""}
                </h1>
                <span className="p__Price">{`$${product.price}`}</span>
              </div>
            </div>
          </Link>
    </>
  )
}

export default ProductCard