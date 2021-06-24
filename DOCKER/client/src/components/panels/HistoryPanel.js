
import '../styles/CarsClient.scss';
import { Col,  Row,  Container } from 'react-bootstrap'
import Table2 from '../tables/CarTable';
import Cookies from 'js-cookie';
import { APIBuilder, APIBuilderDynamic } from "../../API.builder.js"
import API from "../../config/api.json";
import React, {useEffect,useState} from 'react'

const HistoryPanel = () => {


    const [transactions, setTransactions] = useState([]);
    const AdminColumns = [['Nr', ''], ['Marka'], ['Model'], ['Silnik'], ['Od'],['Do'], ['Łączny koszt'], ['Uzytkownik'],['']];
    const UserColumns = [['Nr', ''], ['Marka'], ['Model'], ['Silnik'], ['Od'],['Do'], ['Łączny koszt'], ['']];

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'x-access-token': Cookies.get('token')
            }
        };
        var url;
        if(Cookies.get('role') == "admin") {
            var url = APIBuilder(API.TRANSACTIONS.ALL.URL);
        } else {
            var url = APIBuilder(API.TRANSACTIONS.URL);
        }
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => setTransactions(data.transaction))
    }, []);


    
    return (
        <div className='imgDiv'>
    <Container className="cont">
        <Row className="row1">
            {Cookies.get("role") == "admin" ?  <h2 className="title2">Historia wypożyczeń</h2> :  <h2 className="title2">Historia twoich wypożyczeń</h2>}
            <Col className='colC' xs={10}> 
            {Cookies.get("role") == "admin" ? <Table2 columns={AdminColumns} data={transactions} type={"transactions"}/> : <Table2 columns={UserColumns} data={transactions} type={"transactions"}/> }
            </Col>
        </Row>
    </Container>
        </div>
    )
}

export default HistoryPanel
