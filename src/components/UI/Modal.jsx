import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Backdrop = ({ hideCartHandler }) => {
    return (
        <div className={styles.backdrop} onClick={ hideCartHandler }/>
    )
}

const ModalOverlay = (props) => {
   return (
       <div className={styles.modal}>
           <div className={styles.content}>{props.children}</div>
       </div>
   )
}


const portalEl = document.getElementById('overlays');

const Modal = (props) => {
    return (
      <Fragment>
        { ReactDOM.createPortal(<Backdrop hideCartHandler={props.hideCartHandler}/>, portalEl) }
        { ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalEl) }
      </Fragment>
    )
}

export default Modal
