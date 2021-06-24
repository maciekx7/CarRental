import React, {useEffect,useState} from 'react'
import { Form } from 'react-bootstrap'
import Cookies from 'js-cookie';
import { APIBuilder } from "../../API.builder"
import API from "../../config/api.json";


function MarkList()
{

    const [mark, setMark] = useState([]);



    useEffect(() => {
    
        fetch(APIBuilder(API.MAKES.URL))
            .then(response => response.json())
            .then(data => setMark(data.make));
        }, []);
 
        function pick(){
            
        }

     

return(
    <Form.Control  as="select" size="lg" custom onChange={e => {
        Cookies.set('makeID', e.target.value);
        
      }} >
        <option >Wybierz</option>
        {
        mark.map((mark, index) => {
            return (<option key={index} value={mark.id} onClick={() => pick()}>{mark.name} </option>)
        })
    }
     
        </Form.Control>

)
}
export default MarkList;



