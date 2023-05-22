import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./components/Nav";
import Tab from './components/Tab';
import {Provider} from 'react-redux';
import store from './reducers/index'

function App() {


  return (
    <Provider store={store}>
    <div className="App">
       <Nav />
       <Tab/>
 
        
      
     
     
    </div>
    </Provider>
  );
}

export default App;
