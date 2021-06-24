import { useHistory } from "react-router-dom";
import {  Button  } from 'react-bootstrap'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIBuilderDynamic } from "../../API.builder"
import API from "../../config/api.json";
import { BsTrashFill } from 'react-icons/bs';

function DeleteModelButton() {

    const notify = (message) => toast(message);
    const history = useHistory();

    function deleteModel()
    {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json','x-access-token': Cookies.get('token') }
      }
          fetch(APIBuilderDynamic(API.MODELS.URL, Cookies.get('modelID')), requestOptions) //TODO link do delete
            .then((response) => {
              if (response.ok) { 
                history.push(
                    {
                    pathname: '/addNewCar'// Gdzieś przeniesiemy po kupnie 
                    
                    }) 
                    window.location.reload(false);
                    
              }else
              {
                return response.json();
              }
            })
            .then((result) => { 
              console.log(result); 
              toast.warning(result.message)
            })


      }

    return (
        <div> 
            <ToastContainer />
            <Button
                variant="danger"
                onClick={() => deleteModel() }
            >   
                <BsTrashFill/>
            </Button>
      </div>
    );
  }
  
   export default DeleteModelButton

