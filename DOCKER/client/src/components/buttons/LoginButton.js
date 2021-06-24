import {  Button  } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { APIBuilder, APIBuilderWIthParam } from "../../API.builder"
import API from "../../config/api.json";

function LoginButton(props) {

    const {email, password} = props;

    const notify = () => toast("Niepoprawne dane");
    const [cookies, setCookie] = useCookies(['user']);
  
    function login()
    {

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({   
            email: email,
            password: password })
      };

      fetch(APIBuilder(API.AUTH.SIGNIN.URL), requestOptions) 
      .then((response) => {
        if (response.ok) { 
         return response.json();
        }
        return Promise.reject(response); 
      })
      .then((result) => { 
        console.log("result " + result)
        setCookie('token', result.accessToken);
        setCookie('role', result.role);
        window.location.reload(false); 
      })
      .catch((error) => {
        console.log('Something went wrong.', error);
        notify() 
      });
      
    }

    return (
        <div> 
            <ToastContainer />
            <Button
                variant="primary"
                onClick={() => login() }
            >   
                Zaloguj
            </Button>
      </div>
    );
  }
  
   export default LoginButton