import { Button } from 'react-bootstrap'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIBuilder } from "../../API.builder"
import API from "../../config/api.json";

function RegisterButton(props) {

  const { confirmPassword, email, password, name, surname, phone } = props;

  const notify = (message) => toast(message);


  function register() {
    if (confirmPassword == true) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': Cookies.get('token')
        },
        body: JSON.stringify({
          name: name,
          lastName: surname,
          phone: phone,
          password: password,
          email: email
        })
      }
      if (Cookies.get('role') == "admin") {
        fetch(APIBuilder(API.AUTH.SIGNUP.ADMIN.URL), requestOptions)
          .then((response) => {
            if (response.ok) {
              window.location.reload(false);
            } else {
              return response.json();
            }
          })
          .then((result) => {
            console.log(result);
            notify(result.message)
          })
      }
      else {
        fetch(APIBuilder(API.AUTH.SIGNUP.USER.URL), requestOptions)
          .then((response) => {
            if (response.ok) {
              window.location.reload(false);
            } else {
              return response.json();
            }
          })
          .then((result) => {
            console.log(result);
            notify(result.message)
          })
      }
    }
  }

  return (
    <div>
      <ToastContainer />
      <Button
        variant="primary"
        onClick={() => register()}
      >
        Zarejestruj
      </Button>
    </div>
  );
}

export default RegisterButton

