import React, { Component } from 'react'
import SearchBar from '../SearchBar';
import './index.css';

class CompanyTag extends Component {

      render() {
        return (
          <div className="company-container">
            <div className="title">{this.props.name}</div>
            
          </div>
        )
      }
}

export default CompanyTag;
