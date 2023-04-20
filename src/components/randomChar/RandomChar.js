import {useState, useEffect} from 'react';
import {PreLoader} from "../preLoader/PreLoader.js";
import {ErrorMessage} from "../errorMessage/ErrorMessage.js";

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {MarvelServices} from '../services/MarvelServices.js';

const RandomChar = () => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelServices();
    useEffect(() => {
        updateChar();
    }, [])


    const onCharLoaded = (char) => {
        if (char.description === '') {
            char.description = 'There is no data about this character, or they are classified by the shield agents';
        }
        if (char.description.length > 200) {
            char.description = char.description.substring(0, 200) + '...';
        }
        setLoading(false);
        setChar(char);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        setLoading(true);
        marvelService
            .getCharacters(id)
            .then(onCharLoaded)
            .catch(onError)
    }

        const errorMessage = error ? <ErrorMessage/> : null;
        const preLoading = loading ? <PreLoader/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {preLoading}
                {content}
                <div className="randomchar__static" style={{ backgroundImage:`url(${mjolnir})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right -10% bottom 17%' }}>
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={updateChar}>try it</div>
                    </button>
                </div>
            </div>
        )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}


export default RandomChar;