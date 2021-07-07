import React from 'react';
import '../boddy/Boddy.css';

import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import Loader from '../loader/Loader';



const characterStatusIcon = (statusIcon: {} | null | undefined) =>{
    if (statusIcon === "Alive"){
        return "status_icon1";
    }else if (statusIcon === "Dead"){
        return "status_icon2";
    }else{
        return "status_icon3";
    }
}

const GET_CHARACTERS = gql`{
    characters{
        results{
            id
            name
            species
            status
            image
            location{
                name
            }
            origin{
                name
            }
        }
    }
}`;


const Boddy = () => {
    const { loading, error, data } = useQuery(GET_CHARACTERS);
    if (loading) return <Loader/>;
    if (error) return <p>Error</p>;

    return data.characters.results.map((character: { id: React.Key | null | undefined; image: string | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; status: {} | null | undefined; species: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; location: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }; origin: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }; }) => {    
        return (
            <a key={character.id} href={`https://rickandmortyapi.com/api/character/${character.id}`} className="aCards">
                <div className="cards">
                <img src={character.image} alt=""/>
                <div className="cardInfo">
                    <h2>{character.name}</h2>
                    <span className="status">
                        <span className={characterStatusIcon(character.status)}></span>
                        <p>{character.status} - {character.species}</p>  
                    </span>
                <p className="subTitle">Last known location:</p>
                <p>{character.location.name}</p>
                <p className="subTitle">First seen in:</p>
                <p>{character.origin.name}</p>
                </div>                
            </div>
        </a>)
    });
};

export default Boddy;