import React, { Component } from "react";
import Newsitem from "./Newsitem";
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'sports'
      }

      static defaultProps = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
      }
  articles = [];
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
    document.title=this.props.category
  }

  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1813391f9b37404a9f5c66e65b41de8c&page=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
  }
  static propTypes = {};

  PreviousClick = async () => {
    console.log("Previous")
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1813391f9b37404a9f5c66e65b41de8c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };

  NextClick = async () => {
    console.log("Next")
    if (
        this.state.page + 1 > Math.ceil(this.props.pageSize)){

        }else{
            let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1813391f9b37404a9f5c66e65b41de8c&apiKey=page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
    });
        }
    
  };
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{color:"#E8AA1A"}}>Get latest  - Headline on {this.props.category} News </h2>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imgurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container  d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.PreviousClick}>
            &laquo; Previous
          </button>
          <button 
          disabled={this.state.page + 1 > Math.ceil(this.state.totalResult/this.props.pageSize)}
          type="button" className="btn btn-dark" onClick={this.NextClick}>
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
