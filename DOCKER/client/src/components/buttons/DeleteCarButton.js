import { useHistory } from "react-router-dom";
import {  Button  } from 'react-bootstrap'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import '../styles/Button.scss';
import { APIBuilderDynamic } from "../../API.builder"
import API from "../../config/api.json";
import { IoTrashBinOutline } from "react-icons/io5";

function DeleteCarButton(props) {

    const {id} = props

    const notify = (message) => toast(message);

    const history = useHistory();

    function deleteCar()
    {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json','x-access-token': Cookies.get('token') },
      }
          fetch(APIBuilderDynamic(API.CARS.URL, id), requestOptions) //TODO link do delete
            .then((response) => {
              if (response.ok) { 
                history.push(
                    {
                    pathname: '/'// Gdzieś przeniesiemy po kupnie 
                    
                    })
                    
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
        <div> 
            <ToastContainer />
            <Button className='btnC'
                variant="danger"
                onClick={() => deleteCar() }
            >   
                < IoTrashBinOutline />
            </Button>
      </div>
    );
  }
  
   export default DeleteCarButton

