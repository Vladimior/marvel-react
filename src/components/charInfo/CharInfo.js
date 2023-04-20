import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import './charInfo.scss';

import {MarvelServices} from "../services/MarvelServices";
import {Spinner} from "../spinner/Spinner.js";
import {ErrorMessage} from "../errorMessage/ErrorMessage.js";
import {Skeleton} from "../skeleton/Skeleton.js";

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelServices();

    useEffect(() => {
        updateCharacter();
    }, [props.charId]);

    const updateCharacter = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        setLoading(true);
        marvelService.getCharacters(charId)
            .then(onCharLoaded)
            .catch(onError)
    }
    const onError = () => {
        setLoading(false);
        setError(true);
    }
    const onCharLoaded = (char) => {
        if (char.description === '') {
            char.description = 'There is no data about this character, or they are classified by the shield agents';
        }
        setLoading(false);
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null;
    const preLoading = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {preLoading}
            {content}
        </div>
    )
}



const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}
export default CharInfo;