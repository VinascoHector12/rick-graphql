import React, {useState} from 'react';
import '../header/Header.css';
import imagen from 'd:/React/ts-graphql/src/assets/logo1.jpg';
import ModalComponent from '../modal/ModalContent';
import Modal from '../modal/Modal';


const Header: React.FC = () => {

const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="header1">
            <header>
                <a href="/" className="logo">
                    <img className="logoPic" src={imagen} alt=""/>
                </a>
                <ul className="header_list">
                    <li className="header_link"><a href="/">Docs</a></li>
                    <li className="header_link"><a href="/">About</a></li>
                    <li className="header_link_list">
                        <button onClick={()=>setModalOpen(true)}>
                            Characters
                        </button>
                    </li>
                </ul>
                
                <Modal modalOpen={modalOpen}>
                    <ModalComponent setModalOpen={setModalOpen} />
                </Modal>                               
            </header>
        </div>
    );
}

export default Header;