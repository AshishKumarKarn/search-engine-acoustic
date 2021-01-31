import React from 'react';
import './SearchHome.css';
const axios = require('axios');
export class SearchHome extends React.Component{
    partialSearchURL = 'http://localhost:8080/searchEngine/partialSearch/';
    completeSearchURL = 'http://localhost:8080/searchEngine/completeSearch/';
    constructor(props){
        super(props);
        this.state = {error: '', content: [], endPageNumber: -1, value: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    getNextPage = () => {
        var config = this.createAPIConfig('get',
        this.completeSearchURL+this.state.value,
        this.state.endPageNumber + 1);
        this.callAPIAndSetState(config);
    }

    handleSubmit(event) {
       event.preventDefault();
       var config = this.createAPIConfig('get',
       this.completeSearchURL+this.state.value,
       0);
       this.setState({endPageNumber: 0})
       this.callAPIAndSetState(config);
    }

    createAPIConfig = (method,url, startPage) => {
      return {method: method, url: url+'/'+startPage};
    }
    
    callAPIAndSetState = (config) => {
        axios(config)
        .then(response => {
            console.log('logging ',response.data.itemList);
            this.setState({content: response.data.itemList,
                endPageNumber: response.data.endPageNumber})
          })
        .catch(error => {
            this.setState({error:error.message,
                endPageNumber: -1});
        });
    }

    searchTopContents = (event) => {
        this.setState({value: event.target.value});
        console.log('input data '+ event.target.value);
        var config = this.createAPIConfig('get',
        this.partialSearchURL+event.target.value,
        0);
        this.setState({endPageNumber: 0});
         this.callAPIAndSetState(config);
    }
   render(){
      return (<>
        <div className="content">
        <form onSubmit={this.handleSubmit}>
        <br/>
        <input  type="text" id="search" value={this.state.value} onChange={this.searchTopContents}/>
        <br/>
        <input type="submit" className="button" value="Search" />
        <br/>
        </form>
            {<h2>{this.state.content.map(a=>{
            return <li key={a.id}>{a.id +'   '+ a.itemName +'   '+a.relatedContent}</li>
            })}
        <br/>
        <br/>
        <br/>
        <button className="button" onClick={this.getNextPage}  >Next Page</button>
        </h2> || this.state.error || <h6>Search Result</h6>}
        </div>
        </>);
    }
}
export default SearchHome;