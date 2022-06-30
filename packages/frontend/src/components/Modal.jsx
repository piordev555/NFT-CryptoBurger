import {Button, Modal} from 'react-bootstrap';
import styled from 'styled-components';
import "../assets/scss/modal.scss";
import { formatNo } from '../lib/utilities';
import cookButton from '../assets/imgs/btn_cook.png';
import BurgerCard from './BurgerCard';

function CustomModal({show, handleClose, data}) {
  
    return (
        <Modal
          show={show}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <BurgerCard data={data}/>
            <CLOSE onClick={handleClose}>x</CLOSE>
          </Modal.Body>
        </Modal>
    );
  }

  const CLOSE = styled.span`
    position: absolute;
    top: 6px;
    right: 15px;
    font-size: 24px;
    color: black;
    font-weight: 500;
    cursor: pointer;
  `;

  export default CustomModal;