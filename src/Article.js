import React, {Component} from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import './App.css';

class Article extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
				<div className="article">
	              <h5>{this.props.title}</h5>
	              <p><span class="badge badge-primary">{this.props.author}</span></p>
	            </div>

	 
		);
	}
}

export default Article;
