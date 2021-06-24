
import '../styles/CarsClient.scss';
import React, {useEffect,useState} from 'react'
import { Col,  Row, Image, Table  } from 'react-bootstrap'
import RentButton from '../buttons/RentButton'
import Cookies from 'js-cookie';
import DeleteCarButton from '../buttons/DeleteCarButton';
import '../styles/Panel.scss';
import { APIBuilderDynamic, APIBuilderJPG } from "../../API.builder.js"
import API from "../../config/api.json";
import { FaCarSide, FaGasPump, FaHorse, FaMoneyBillWaveAlt } from 'react-icons/fa';
import {GiFactory} from "react-icons/gi";



const CarDetailPanel = () => {

    const [car, setCar] = useState([]);

    useEffect(() => {
      var lastUrl = window.location.pathname;
      var carID = lastUrl.substring(lastUrl.lastIndexOf('/') + 1);  
      fetch(APIBuilderDynamic(API.CARS.URL, carID))
          .then(response => response.json())
          .then(data => setCar(data.car))
          console.log(car)
  }, []);

    return (
        <div className={(typeof car.CarModel != "undefined")}>
          {(typeof car.CarModel != "undefined") ? (
          <div className="div2">
        <Table >
          <Row>
            <Col></Col><Col></Col>
            <Col>
            <div>
                  {((Cookies.get('token') != null) && car.availability == "1") ? <Row><Col></Col><Col ></Col><Col  className='colPadd'>< RentButton className='btnC' id={car.id} /> </Col><Col  className='colPadd'> {Cookies.get('role') == "admin" ? <DeleteCarButton id={car.id}/> : null } </Col></Row>: "Samochód nie jest dostępny, bądź ty nie jesteś zalogowany"}
                        </div>
            </Col>

          </Row>
          <Row >

              <Col xs={6}>
              <h1>{car.CarModel.Make.name} {car.CarModel.name}</h1>
                  <Image className="img" src={APIBuilderJPG("car_" + car.id)} alt="picture" fluid rounded/>
              </Col>
              <Col >
              <Row>
                  <Col>
                  <div className='divTrans'>
        
                  <br/>
                  <h3><FaCarSide/> {car.CarModel.body}</h3> <br/>
                  <h3><FaGasPump/> {car.CarModel.fuel}</h3> <br/>
                  <h3><FaHorse/> {car.CarModel.enginePower} KM</h3><br/>
                  <h3><GiFactory/> {car.CarModel.productionYear}</h3> <br/>
                  <h3><FaMoneyBillWaveAlt/> {car.cost } zl/dzien</h3><br/><br/>
                  </div>
                  </Col>
                  
                  <Col>
            
                
                  </Col>
                  </Row>
                  <Row>
                   
                  </Row>
              </Col> 
          </Row>
          </Table>
  </div>
          ) : ('')}
      </div>
    )
}

export default CarDetailPanel
