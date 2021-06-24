
import './App.scss';
import Header from './components/Header'
import Carousel1 from './components/Carousel1'
import 'bootstrap/dist/css/bootstrap.min.css'
import InfoPanel from './components/panels/HomePanel'
import Footer from './components/Footer';
import clientProfile from './components/panels/ProfilePanel';
import CarsClient from './components/panels/CarsPanel';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HistoryClient from './components/panels/HistoryPanel';
import {Container} from 'react-bootstrap'
import Car from './components/panels/CarDetailPanel';


import AddMark from './components/panels/AddMakePanel';
import AddCar from './components/panels/AddCarPanel';
import React  from 'react';
import TransactionDetail from './components/panels/TransactionDetail';

function App() {
  return (
    <div>
      <Router>

          <Header  />
          
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/profile" component={clientProfile}/>
              <Route path="/cars" component={CarsClient}/>
              <Route path="/history" component={HistoryClient}/>
              <Route path="/car" component={Car}/>
              <Route path="/addMake" component={AddMark}/>
              <Route path="/addNewCar" component={AddCar}/>
              <Route path="/transactions" component={TransactionDetail}/>
  
            </Switch>

            <Footer />
      </Router>
    </div>
    
  );
}
const Home =() => (
<div>
      <Carousel1 />
      <InfoPanel />
      
</div>
);
      
  
export default App;
