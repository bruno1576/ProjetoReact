import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import AutorBox from './Autor'; 
import {Router,Route,browserHistory} from 'react-router';


ReactDOM.render(
    (<Router history={browserHistory}>
            <Route path="/" component={App}>
                 <Route path="/autor" component={AutorBox}/>
                <Route path="/livro"/>
            </Route>  
    </Router> ),
    document.getElementById('root')
  );

