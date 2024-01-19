import React, { Component } from "react";
import PropTypes from "prop-types";

export class Newsitem extends Component {
  static propTypes = {};

  render() {
    let { title, description, imgurl, newsurl, author, date, source ,pageSize} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              !imgurl
                ? "https://images.hindustantimes.com/tech/img/2024/01/16/1600x900/g94259f744c86d345088c6d639b0534f7a1c6a050828e4d658_1705388583871_1705388584073.jpg"
                : imgurl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
           
            <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"50%", zIndex:"1"}}>
              {source}
              
            </span>
           
            <h5 className="card-title"> {title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                by {!author ? "Unknow" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsurl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
