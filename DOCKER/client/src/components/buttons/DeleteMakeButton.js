import { useHistory } from "react-router-dom";
import { Button  } from 'react-bootstrap'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIBuilderDynamic } from "../../API.builder"
import API from "../../config/api.json";
import { BsTrashFill } from 'react-icons/bs';
function DeleteMakeButton() {

    const notify = (message) => toast(message);

    const history = useHistory();

    function deleteMake()
    {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json','x-access-token': Cookies.get('token') }
      }
          fetch(APIBuilderDynamic(API.MAKES.URL,Cookies.get('makeID')), requestOptions) //TODO link do delete
            .then((response) => {
              if (response.ok) { 
                
                history.push(
                    {
                    pathname: '/addNewCar'// Gdzieś przeniesiemy po kupnie 
                    
                    }) 
                    notify("TEST");
                    window.location.reload(false);
              }else
              {
                return response.json();
              }
            })
            .then((result) => { 
              console.log(result); 
              toast.warning(result.message);
            })


      }

    return (
        <div> 
            <ToastContainer />
            <Button 
                variant="danger"
                onClick={() => deleteMake() }
            >   
              <BsTrashFill/>
            </Button>
      </div>
    );
  }
  
   export default DeleteMakeButton

