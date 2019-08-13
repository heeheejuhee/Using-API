import React, {Component} from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Article from './Article';
import './App.css';


var keyCode = 'b37ed9c772d940c2ace3d420fa4a72f3';
var key = '?apiKey='+keyCode;


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeKey:'politics',
      // articles:[
      //   {
      //     author: "Austrolib",
      //     title: "Three Potential Triggers For A Crack Up Boom",
      //     author: "pefkef"
      //   },
      //   {
      //     author: "Austrolib",
      //     title: "Three Potential Triggers For A Crack Up Boom",
      //     author: "bla"
      //   }
      // ]
      businessArticles:[],
      politicsArticles:[],
      sportsArticles:[],
      searchArticles:[],
      keywords:'null'
    }
  }

  loadHeadlinesByCategory = (category) => {
    var articlesURL = 'https://newsapi.org/v2/top-headlines'+key+'&category='+category;
    fetch(articlesURL)
      .then( res=>res.json())
      .then((data) => {
        var articles = data.articles;
        if(category=='business'){
          this.setState({businessArticles:articles})
        }

        if(category=='politics'){
          this.setState({politicsArticles:articles})
        }

        if(category=='sports'){
          this.setState({sportsArticles:articles})
        }
        
      })
  }

  loadHeadlinesByTerm = (term) => {
    var articlesURL = 'https://newsapi.org/v2/top-headlines'+key+'&q='+term;
    fetch(articlesURL)
      .then( res=>res.json())
      .then((data) => {
          var articles = data.articles;
          console.log(articles);
          this.setState({searchArticles:articles})
        })
    }

  handleTabSelect = (key) => {
    this.setState({activeKey:key})
  }


  componentDidMount(){
    this.loadHeadlinesByCategory('business');
    this.loadHeadlinesByCategory('politics');
    this.loadHeadlinesByCategory('sports');
    this.loadHeadlinesByTerm(this.state.keywords)
  }

  handleSearchSubmitClick = (e) => {
    e.preventDefault();
    this.setState({activeKey:'search'})
    this.loadHeadlinesByTerm(this.state.keywords)
  }

  handleInputChange = (e) => {
    this.setState({keywords:e.target.value})
  }


  render(){
    return (
        <div className="container">
            <Tab.Container activeKey={this.state.activeKey} onSelect={this.handleTabSelect}>
         
              <div className="row tab-top">
                
                <Nav variant="pills" className="col-7">
                  <Nav.Item>
                    <Nav.Link eventKey="politics">Politics</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="business">Businsess</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="sports">Sports</Nav.Link>
                  </Nav.Item>
                </Nav>

                <form className="col-5">
                  <div class="form-row align-items-center justify-content-end">
                    <div class="col-auto">
                      <input type="text" onChange={this.handleInputChange} className="form-control mb-2 search-input" placeholder="Enter keywords"/>
                    </div>
                    
                    <div class="col-auto">
                      <button onClick={this.handleSearchSubmitClick} type="submit" className="btn btn-primary mb-2 search-submit">Search</button>
                    </div>
                  </div>
                </form>
              </div>

              
              <Tab.Content>
                <Tab.Pane className="tab-pane" eventKey="politics">
                  <h1>Politics</h1>

                  <div className="articles">

                    {this.state.politicsArticles.map((article) => {
                        var articleProps ={
                          ...article,

                        };

                        return (<Article {...articleProps} />)

                      })
                    }

                  </div>
                </Tab.Pane>

                <Tab.Pane className="tab-pane" eventKey="business">
                  <h1>Business</h1>

                  <div className="articles">

                      {this.state.businessArticles.map((article) => {
                        var articleProps ={
                          ...article,

                        };

                        return (<Article {...articleProps} />)

                      })
                    }

                  </div>
                </Tab.Pane>

                <Tab.Pane className="tab-pane" eventKey="sports">
                  <h1>Sports</h1>

                  <div className="articles">

                      {this.state.sportsArticles.map((article) => {
                        var articleProps ={
                          ...article,

                        };

                        return (<Article {...articleProps} />)

                      })
                    }

                  </div>

                </Tab.Pane>

                <Tab.Pane className="tab-pane" eventKey="search">
                  <h1>Search Results</h1>

                  {this.state.searchArticles.map((article) => {
                        var articleProps ={
                          ...article,

                        };

                        return (<Article {...articleProps} />)

                      })
                    }
                  
                </Tab.Pane>

              </Tab.Content>
            
            </Tab.Container>
        </div>
    );
  }
}
export default App;
