import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import './ModalContent.css';
import Loader from '../loader/Loader'

import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, useQuery } from 'react-apollo';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql'
});

let nextP = true;

type Props = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

//Funcion para llamar la pagina
const GET_CHARACTERS = (pageNumber:number, filter:string) => {
    return( gql`{
        characters(page: ${pageNumber} filter:{name: "${filter}"}){
            info{
                next
                prev
                pages
            }
            results{
                id
                name
                image
            }
        }
    }`)
};

const Wrapper = styled.div`
    padding-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-wrap: wrap;
    width: 900px;
    justify-content: space-around;

    img{
        height: 20px;
        width: 20px;
    }
`;

//El contexto contiene un provider y un consumer
const Context = React.createContext({});

const CharacterList = () =>{

    //Hacemos uso del contexto que es enviado desde el provider
    const varsContext:any = useContext(Context);  

    const { loading, error, data } = useQuery(GET_CHARACTERS(varsContext.page, varsContext.filter));
    if (loading) return <Loader></Loader>;
    if (error) return <p>Error :</p>;
    
    const nextPageInfo = data.characters.info.next;
    nextPageInfo === null ? nextP = true : nextP = false;
    
    return (
        <>
        {
            data.characters.results.map(character => (        
                <div key={character.id} className="listCont">
                    <a href={`https://rickandmortyapi.com/api/character/${character.id}`}>
                        <img src={character.image} alt=""/>
                        <p> {character.name}</p>
                    </a>
                </div>    
            ))
        }
        </>
    );    
};

const ModalComponent: React.FC<Props> = ({setModalOpen}:Props) => {//En serio por el :Props?
    
    const[currentPage, setCurrentPage] = useState(1);
    const[filterName, setFilterName] = useState("");
    

    //Avanzar pagina
    const nextPage = () => {nextP === true ? setCurrentPage(currentPage) : setCurrentPage(currentPage+1);}
    //Retroceder pagina
    const backPage = () => {currentPage === 1 ? setCurrentPage(1) : setCurrentPage(currentPage-1);}
    //Filtro de busqueda
    const filtrar = (e:any) => {
        const {value} = e.target;
        setCurrentPage(1);
        setFilterName(value);
    }
    
    return(
        <Context.Provider value={{
            page: currentPage,
            filter: filterName}}>
            <ApolloProvider client={client}>
                <div className="fullModal">
                    <h2 className="title">Lista de personajes</h2>
                    <input type="text" placeholder="Buscar: " onChange={(e)=>filtrar(e)}/>            
                    <Wrapper>
                        <CharacterList />
                    </Wrapper>

                    <div className="btnPages">
                        <button onClick={backPage}>Back</button>
                        <p>Pagina actual: {currentPage}</p>
                        <button onClick={nextPage}>Next</button>
                    </div>            

                    <button type="button" onClick={() => setModalOpen(false)}>
                        <span>Close</span>
                    </button>
                </div>
            </ApolloProvider>
        </Context.Provider>
    )
};

export default ModalComponent;