import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Blog.scss";
import "./Post.scss";
import { DataContext } from "../../pages/context/Context";
import AddPost from "./AddPost";
import post1 from "../../img/post1.jpg";
import post2 from "../../img/post2.jpg";
import post3 from "../../img/post3.jpg";
import { useNavigate } from "react-router-dom";
import { Button, Card, Modal, ModalBody } from "react-bootstrap";
import moment from "moment";
import SideCategory from "./SideCategory";
const Posts = () => {
  const {
    userData,
    category,
    setCategory,
    flag,
    setFlag,
    posts,
    setPosts,
    singlePost,
    setSinglePost,
  } = useContext(DataContext);

  console.log('posts: ', posts)

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/posts/list");
      console.log("getList posts is : ", response);

      if (response.data.success) {
        setPosts([...response.data.posts]);
      }
    };
    getData();
  }, []);

  const handleSinglePost = (id) => {
    setSinglePost(posts?.filter((post) => post._id === id));
    navigate("/blogsingle");
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div className="posts  mt-5">
      <Modal show={show} onHide={handleClose}  >
        <Modal.Header closeButton>
          <Modal.Title>CREATE A NEW POST</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <AddPost />
        </ModalBody>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>

      {/* HERO */}
      <section className=" page-image page-image-blog md-padding d-flex  align-items-center ps-3 ps-3">
        <h1 className="container text-white text-center">BLOG</h1>
        <button
          onClick={() => handleShow()}
          className={(userData) ? 'show btn btn-danger text-light me-3' : 'hide'}
          //className="btn btn-danger text-light me-3"
        >
          ADD A NEW POST
        </button>
      </section>

      {/* <!--==========================
   Blog Section
============================--> */}
      <section id="blog" className="md-padding">
        <div className="container">
          <div className="row">
            <main id="main" className="col-md-8">
              <div className="row">
                {posts?.map((item, index) => {
                  return (
                    <div key={index} className="col-md-5 m-2 ms-0 border-bottom  p-2">
                      <div className="blog p-2">
                        <div className="blog-img  ">
                          <img
                            src={`uploads/${item.image}`}
                            alt=""
                            className="img-fluid"
                            style={{
                              height: "200px",
                              maxHeight:"200px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="blog-content">
                          <ul className="blog-meta ">
                            <li>
                              <i className="fas fa-users"></i>
                              <span className="writer">
                                {item.owner?.username}
                              </span>
                            </li>
                            <li>
                              <i className="fas fa-clock"></i>
                              <span className="writer">
                                 {moment(item.date).format("MMM DD YYYY")}
                              </span>
                            </li>
                            <li>
                              <i className="fas fa-comments"></i>
                              <span className="writer">13</span>
                            </li>
                          </ul>
                          <h3 className="border-bottom">{item.title}</h3>
                          <h6 className="border-bottom">{item.subtitle}</h6>
                          <p className="mt-3" >Content: {item.content}</p>
                          <p> Category: {item.category}</p>

                          <button
                            className="btn btn-primary"
                            onClick={() => handleSinglePost(item._id)}
                          >
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex="-1">
                        Previous
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </main>

            <aside id="aside" className="col-md-4">
              <div className="widget">
                <div className="widget-search">
                  <input
                    className="search-input form-control"
                    type="text"
                    placeholder="Search"
                  />
                  <button className="search-btn" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
              {/* <!-- /Search --> */}

              {/* <!-- Category --> */}
              <SideCategory />

              {/* <!-- Posts sidebar --> */}
              <div className="widget">
                <h3 className="mb-3">Latest Posts</h3>

                {posts
                  ?.filter((item, index) => index <= 2)
                  .map((item, index) => {
                    return (
                      <div key={index} className="widget-post">
                        <a href="#">
                          <img
                            width="100px"
                            height="100px"
                            src={`uploads/${item.image}`}
                            alt=""
                          />
                          {item.subtitle}
                        </a>
                        <ul className="blog-meta">
                          <li>{moment(item.date).format("MMM DD YYYY")}</li>
                        </ul>
                      </div>
                    );
                  })}
              </div>
              {/* <!-- /Posts sidebar --> */}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Posts;
