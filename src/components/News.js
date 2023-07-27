import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
 
  
  
  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    updateNews();
    document.title = `${capitalizeFirstLetter(props.category)} - FreshNews`;
      //This is for diabling warning in console
      // eslint-disable-next-line
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // const handlePrevClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // };

//  const handleNextClick = async () => {
//       setPage(page+1);
//       updateNews();
//   };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
  };
 
          
    return (
      <>
        <h2 className="text-center" style={{marginTop : '5rem'}}>FreshNews - Top {capitalizeFirstLetter(props.category)}  Headlines</h2>
        {loading && <Spinner />}   

         <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={articles.length  !== totalResults}
              loader={<Spinner/>}>      
            <div className="container">
              <div className="row">
                {articles.map((element) => {
                    return (
                      <div className="col-md-4" key={element.url}>
                        <NewsItem
                          title={element.title ? element.title.slice(0, 50) : ""}
                          description={element.description ? element.description.slice(0, 80) : ""} urlToImage={element.urlToImage ? element.urlToImage : "https://images.cointelegraph.com/images/1200_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMTEvMTc1MTRhOTQtNjQzMi00MGIzLWJhZmMtOTZkNWVkODBlNWY4LmpwZw==.jpg"} url={element.url} author={element.author ? element.author : "anknown"} date={element.publishedAt} source={element.source.name}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>

          </InfiniteScroll>
        
        {/* <div className="container navigation d-flex justify-content-between my-5">
          <button disabled={page <= 1} className="btn btn-dark" onClick={handlePrevClick}> &larr; Privious </button>
          <button disabled={page + 1 >Math.ceil(totalResults / props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>  Next &rarr; </button>
        </div> */}
      </>
    );

}

News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 6,
  apikey: "11d27f6291bc49909dca4bfaa4da1054",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
  apikey: PropTypes.string,
};

export default News;