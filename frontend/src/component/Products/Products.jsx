import React, { useEffect, useState } from "react";
import Footer from "../../layout/Footer/Footer";
import Header from "../Home/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../layout/Loader/Loading";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/productActions";
import Pagination from "react-js-pagination";
import "./Product.css";
import Typography from"@mui/material/Typography"
import MetaData from "../../layout/MetaData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const categories = [
    
    "Women's Fashion",
    "Watches,Bags,Jewellery",
    "Men's Fashion",
    "Groceries",
    "Electronic Accessories",
    "Electronic Devices",
    "Sports and Outdoor",
    "TV and Home Appliances",
    "Babies and Toys",
    "Religion Substances"
]

const Products = ({ match }) => {
  const dispatch = useDispatch();
  
  const [currentPage, setCurrentPage] = useState(1);
  
  const [category,setCategory] = useState("");

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };


  useEffect(() => {
      if(error){
          toast.error(error);
          dispatch(clearErrors())
      }
    dispatch(getProduct(keyword, currentPage,category));
  }, [dispatch, keyword,currentPage,category,alert,error]); 



  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <MetaData title="Products" />
          <Header />
          <div>
           {products.length === 0 ? 
            ""
            :
            <h2
            style={{
              textAlign: "center",
              borderBottom: "1px solid rgba(21,21,21,0.5)",
              width: "20vmax",
              fontSize: "1.4vmax",
              fontFamily: "Poppins,sans-serif",
              margin: "3vmax auto",
              color: "rgb(0, 0, 0, 0.7)",
            }}
          >
            Products
          </h2>
           }
            <div className="sidebar__product" style={{
                display:"flex",
                flex:1,
            }}>
                <div className="sidebar__products" style={{
                  border: "1px solid #999",
                  margin:"1vmax",
                  flex:".177"
              }}>
                  <Typography style={{fontSize:"1.2vmax",textAlign:"center" ,padding:"5px"}}>CATEGORIES</Typography>
                  <ul className="categoryBox">
                      {categories.map((category) =>(
                          <li
                          className="category-link"
                          key={category}
                          onClick={() =>setCategory(category)}
                          type="checkbox">
                          {category}
                          </li> 
                      ))}
                  </ul>
                  <Typography style={{fontSize:"1.2vmax",textAlign:"center",padding:"5px"}}>QUICK LINKS</Typography>
                  <li className="category-link">
                      My Carts
                  </li>
                  <li className="category-link">
                      Favourites Items
                  </li>
                  <li className="category-link">
                      Checkout
                  </li>
              </div>

             {products.length === 0 ?
             <span style={{
               display:"block",
               padding:"30px 0",
               fontSize:"1.5rem",
               flex:".9",
               textAlign:"center"
             }}>No Product Found ....</span>
             : 
             <div
             className="products"
             style={{
               display: "flex",
               flexWrap: "wrap",
               justifyContent: "center",
               flex:".9"
             }}
           >
             {products &&
               products.map((product) => (
                 <ProductCard key={product.id} product={product} />
               ))}
           </div>
              }
             
             </div>
            
              <div
                className="pagination__box"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "6vmax",
                }}
              >
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
          </div>
          <Footer />
          
        </>
      )}
    </>
  );
};

export default Products;