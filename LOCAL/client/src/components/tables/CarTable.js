
import _ from 'lodash';
import React, { Component, Link } from 'react';
import * as ReactBootStrap from "react-bootstrap"
import { Col, Row, Form, Nav, Table, Container, NavItem, Image } from 'react-bootstrap'
import Cookies from 'js-cookie';
import '../styles/CarsClient.scss';
import { Redirect, withRouter } from 'react-router';




class CarTable extends Component {
    render() {
        const { columns, data, type } = this.props;
        let [names, props] = _.zip(...columns);
        let headers = <tr>{names.map((name, n) => <th key={n}>{name}</th>)}</tr>

        const renderCars = (car, index) => {
            console.log(index);
            return (
                <tr className='rowC' key={index} onClick={() => clickRow(car)} >
                    <td>{car.id}</td>
                    <td>{car.CarModel.Make.name}</td>
                    <td>{car.CarModel.name}</td>
                    <td>{car.CarModel.body}</td>
                    <td>{car.CarModel.productionYear}</td>
                    <td>{car.CarModel.enginePower}</td>
                    <td>{car.cost}</td>
                    <Nav.Link href={"/car/" + car.id + ""} >Podgląd</Nav.Link>
                </tr>
            )
        }

        const renderTransactions = (transactions, index) => {
            console.log(index);
            return (
                <tr className='rowC' key={index}    >
                    <td>{transactions.id}</td>
                    <td>{transactions.Car.CarModel.Make.name}</td>
                    <td>{transactions.Car.CarModel.name}</td>
                    <td>{transactions.Car.CarModel.fuel}</td>
                    <td>{transactions.rentDate}</td>
                    <td>{transactions.returnDate}</td>
                    <td>{transactions.cost}</td>
                    {(Cookies.get('role') == "admin") ? <td>{transactions.User.email}</td> : null}
                    <Nav.Link href={"/transactions/" + transactions.id} >Podgląd</Nav.Link>
                </tr>
            )
        }
        

        function clickRow(car) {
            console.log("TEST");
            var CAR = '/car/' + car.id;
            console.log(CAR);
            return <Redirect to={CAR}/>
        }
        if (type == "transactions") {
            return (
                <table  className='table table-bordered table-hover table-dark table-responsive-md'>
                    <thead className='thead-dark'>
                        {headers}
                    </thead>
                    <tbody>{data.map(renderTransactions)}</tbody>
                </table>
            );
        } else if (type == "car") {
            return (
                <table  className='table table-bordered table-hover table-dark table-responsive-sm'>
                    <thead className='thead-dark'>
                        {headers}
                    </thead>
                    <tbody >{data.map(renderCars)}</tbody>
                </table>
            )
        }

    }
};
export default CarTable;
