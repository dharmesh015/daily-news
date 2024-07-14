            ``
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Newsitem from './Newsitem';
import Loading from './Loading';
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar';



export class News extends Component {
    static defaultProps = {
        pageSize: 6,
        country: "in",
        category: "general"

    }
    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string
        
    }
    constructor(props) {

        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
       
            // Initialize totalResult in state
        };
        document.title = `${this.props.category}-Daily News`;
    }

    async componentDidMount() {
        await this.fetchArticles();
    }
    async componentDidUpdate(prevProps) {
        // Re-fetch news if the category changes
        if (prevProps.category !== this.props.category) {
            await this.fetchArticles();
        }
    }

    fetchArticles = async () => {
        this.props.setprogress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2434b6b484e3401a958e022702f33117&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });

        let response = await fetch(url);
        let parsedData = await response.json();

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setprogress(100);
    };




    handalenext = async () => {
        if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {

            await this.setState({
                page: this.state.page + 1,

            });

            await this.fetchArticles();
        }
    }

    handalepreious = async () => {
        if (this.state.page > 1) {
            await this.setState({
                page: this.state.page - 1,
            });
            await this.fetchArticles();
        }
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2434b6b484e3401a958e022702f33117&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });

        let response = await fetch(url);
        let parsedData = await response.json();

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    render() {
        return (
            <>
                <h2 className='text-center ' style={{ marginBottom: "20px" }}>DAILY <span style={{ color: 'red' }}>NEWS</span> -TOP HEADLINES</h2>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Loading />}
                >


                    <div className='container my-3'>
                        {/* {this.state.loading && <Loading />} */}
                        <div className="row">
                            {this.state.articles.map((e) => {
                                return (
                                    <div className="col-md-4" key={e.url}>
                                        <Newsitem title={e.title ? e.title.slice(0, 45) : ""} description={e.description ? e.description.slice(0, 85) : ""} url={e.urlToImage} linkurl={e.url} author={e.author} date={e.publishedAt} source={e.source.name} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-secondary" onClick={this.handalepreious}>previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize)} className="btn btn-secondary" onClick={this.handalenext}>next</button>
                </div> */}
            </>
        );
    }
}

export default News
