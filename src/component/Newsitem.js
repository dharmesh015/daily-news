import React, { Component } from 'react'



// export class Newsitem extends Component {
const Newsitem = (props) =>{

    // render() {
    // let { title, description, url, linkurl, author, date ,source} = this.props;
    let { title, description, url, linkurl, author, date, source } = props;

return (
    <div className='my-3'>


        <div className="card">
            <div style={{ display: "flex", position: "absolute", right: "0", justifyContent: "flex-end" }}>
                <span class=" badge rounded-pill bg-danger" >{source}</span>
            </div>

            <img src={url} class="card-img-top" style={{ height: "200px" }} alt="..." />
            <div className="card-body" >
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}</p>
                <p className="card-text">By-{author ? author : 'Unknon'}</p>
                <p className="card-text">{new Date(date).toDateString()}</p>

                <a href={linkurl} className="btn btn-sm btn-dark">read more</a>
            </div>
        </div>
    </div>
)
    // }
}

export default Newsitem
