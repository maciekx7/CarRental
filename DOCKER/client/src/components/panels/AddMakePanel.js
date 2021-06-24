import {React, useState} from 'react'
import { Col,Form, Button, Modal  } from 'react-bootstrap'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIBuilder } from "../../API.builder"
import API from "../../config/api.json";


function AddMakePanel()
{

    const [mark, setMark] = useState("");

    const notify = (message) => toast(message);



    function addMark()
    {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' , 'x-access-token': Cookies.get('token')
          },
          body: JSON.stringify({   
            name: mark
             })
          };
          fetch(APIBuilder(API.MAKES.URL), requestOptions)
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

return(
  <Modal.Dialog>
    <ToastContainer />
          <Modal.Header >
             <Modal.Title>Dodaj nową mmarke samochodu</Modal.Title>
          </Modal.Header>
    <Modal.Body>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridMark">
              <Form.Label>Nowa Marka</Form.Label>
              <Form.Control required type="marka" 
                    placeholder="Podaj nazwe marki" value={mark}
                    onChange={(e) => setMark(e.target.value)} />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" onClick={() => addMark()} >
            Dodaj markę
          </Button>
        </Form>
      </Modal.Body>
  </Modal.Dialog>
)
}
export default AddMakePanel;
