import {Component} from 'react';
import './charInfo.scss';
import {MarvelServices} from "../services/MarvelServices";
import {Spinner} from "../spinner/Spinner.js";
import {ErrorMessage} from "../errorMessage/ErrorMessage.js";
import {Skeleton} from "../skeleton/Skeleton.js";

export class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    }
    marvelService = new MarvelServices();

    componentDidMount () {
        this.updateCharacter();
    }
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateCharacter();
        }
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    }
    onCharLoaded = (char) => {
        if (char.description === '') {
            char.description = 'There is no data about this character, or they are classified by the shield agents';
        }
        this.setState({char, loading: false});
    }
    updateCharacter = () => {
        const {charId} = this.props
        if (!charId) {
            return;
        }
        this.setState({loading: true});
        this.marvelService.getCharacters(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    render() {
        const {char, loading, error} = this.state;

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
