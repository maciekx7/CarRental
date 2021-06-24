import '../styles/CarsClient.scss';
import React, {useEffect,useState } from 'react'
import { Col,  Row, Image  } from 'react-bootstrap'
import Cookies from 'js-cookie';
import ReturnButton from '../buttons/ReturnButton'
import { APIBuilderDynamic, APIBuilderJPG } from '../../API.builder';
import API from "../../config/api.json";
import { FaCarSide, FaGasPump, FaHorse, FaMoneyBillWaveAlt, FaCalendarDay, FaCalendarMinus, FaCalendarAlt, FaUserAlt } from 'react-icons/fa';
import {GiFactory} from "react-icons/gi";


const TransactionDetail = () => {


    const [transaction, setTransactions] = useState([]);
    
    var today = new Date(),
    date_ = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    useEffect(() => {
      const requestOptions = {
        method: 'GET',
        headers: { 'x-access-token': Cookies.get('token') }
    }
    var lastUrl = window.location.pathname;
    var transactionId = lastUrl.substring(lastUrl.lastIndexOf('/') + 1);
      fetch(APIBuilderDynamic(API.TRANSACTIONS.URL, transactionId), requestOptions )
          .then(response => response.json())
          .then(data => setTransactions(data.transaction));
  }, []);


  function calculateCost()
  {
    var date1 = new Date(transaction.rentDate);

    var Difference_In_Time = today.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if(Difference_In_Days < 1)
    {
      return transaction.Car.cost;
    }
    else
    {
      return Difference_In_Days * transaction.Car.cost;
    }
    
  }

    return (
        <div className={(typeof transaction.Car != "undefined")}>
          {(typeof transaction.Car != "undefined") ? (
          <div className="divTrans">
            <br/><br/>
          <Row className="row1">
           
              <Col xs={2}></Col>
              <Col xs={6}>
                  <Image className="img" src={APIBuilderJPG("car_" + transaction.Car.id)} alt="picture" fluid rounded/>
              </Col>
              <Col>
                  <h2>{transaction.Car.CarModel.Make.name}  {transaction.Car.CarModel.name}</h2><br/>
                  Vin: {transaction.Car.VIN} <br/>
                  <FaCarSide/> {transaction.Car.CarModel.body} <br/>
                  
                  <FaGasPump/> {transaction.Car.CarModel.fuel} <br/>
                  <FaHorse/> {transaction.Car.CarModel.enginePower} KM<br/>
                  <GiFactory/> {transaction.Car.CarModel.productionYear} <br/>
                  <FaMoneyBillWaveAlt/><FaCalendarDay/> {transaction.Car.cost } zl/dzien<br/>
                  <FaMoneyBillWaveAlt/><FaCalendarMinus/> {transaction.cost} zl<br/>
                  <FaCalendarAlt/> {transaction.rentDate} - {transaction.returnDate} <br/>
                  
                  <FaUserAlt/> { transaction.User.email} <br/>
                  { (transaction.returnDate == null) ? ((Cookies.get('role') == "admin") ? <ReturnButton date={date_} cost={calculateCost()} /> : null) : null}
              </Col>
          </Row>
  </div>
          ) : ('')}
      </div>
    )
}

export default TransactionDetail
