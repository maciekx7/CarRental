import {  Button  } from 'react-bootstrap'
import Cookies from 'js-cookie';
import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIBuilderDynamic, APIBuilderJPG } from '../../API.builder';
import API from "../../config/api.json";


function ReturnButton(props) {

   // const [cost, setCost] = useState("");
   // const [returnDate, setReturnDate] = useState("");
    const { cost } = props;
    const notify = (x) => toast(x);


    function returnCar()
    {
      console.log("Koszt" + cost)
        const requestOptions = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json', 'x-access-token': Cookies.get('token') 
            },
            body: JSON.stringify({
                cost: props.cost,
                returnDate: props.date
              })
        };
        var lastUrl = window.location.pathname;
        var transactionId = lastUrl.substring(lastUrl.lastIndexOf('/') + 1);
    
        fetch(APIBuilderDynamic(API.TRANSACTIONS.URL, transactionId), requestOptions) // // transaction/:id
            .then((response) => {
              if (response.ok) { 
                window.location.reload(false);
              }else
              {
                return response.json();
              }
            })
            .then((result) => { 
              console.log(result); 
              notify(result.message)
            })
   

    }

    return (
      <Button
        variant="primary"
        onClick={() => returnCar()}
      >
          Zwróć samochód
      </Button>
    );
  }
  
  //render(<RentButton />);

   export default ReturnButton