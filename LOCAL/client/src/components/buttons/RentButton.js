import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap'
import Cookies from 'js-cookie';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Button.scss';
import { APIBuilder } from "../../API.builder"
import API from "../../config/api.json";
import {FaCartPlus } from 'react-icons/fa';

function RentButton(props) {

    const {id} = props;
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const history = useHistory();
    const notify = (x) => toast(x);
  
    function rentCar()
    {

        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 'x-access-token': Cookies.get('token')
            },
            body: JSON.stringify({   
              CarId: id,
              rentDate: date 
              })
        };
        fetch(APIBuilder(API.TRANSACTIONS.URL)  , requestOptions) 
            .then((response) => {
              if (response.ok) { //window.location.reload(false); 
                    history.push(
                    {
                    pathname: '/history'// Gdzieś przeniesiemy po kupnie 
                    }) 
                }
              else { 
                notify(response.json().message);
                }
            })

    }

    return (
      <Button className='btnC'
        variant="success"
        
        onClick={() => rentCar()}
        
      >
          <FaCartPlus/>
      </Button>
    );
  }
  
  //render(<RentButton />);

   export default RentButton