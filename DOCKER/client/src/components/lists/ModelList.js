import React, {useEffect,useState } from 'react'
import { Form } from 'react-bootstrap'
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { APIBuilder } from "../../API.builder"
import API from "../../config/api.json";



function ModelList()
{

    const [model, setModel] = useState([]);
    var myData;

    useEffect(() => {
    
        fetch(APIBuilder(API.MODELS.URL))
            .then(response => response.json())
            .then(data => setModel(data.model));
        }, []);

  
    

        return(
            <Form.Control  as="select" size="lg" custom onChange={e => {
                console.log("e.target.value", e.target.value);
                Cookies.set('modelID', e.target.value);
              }} >
                <option>Wybierz</option>
                {
                myData = [].concat(model)
                .sort((a, b) => a.Make.name > b.Make.name ? 1 : -1)
                .map((item, index) => {
                    return <option key={index} value={item.id} >{item.Make.name} {item.name} {item.fuel} </option>                     
                })
            }
             
                </Form.Control>
        
        )
        }
export default ModelList;