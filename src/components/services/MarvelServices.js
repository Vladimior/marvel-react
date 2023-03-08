export class MarvelServices {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=c49d984a4b4a00328a5a59aa1b575037';
    _apiKey2 = 'apikey=e4584c8590ed40241daf59e37b1b8383';
    _baseOffSetChar = 200;
    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffSetChar) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey2}`);
        return res.data.results.map(this._transformCharacter)
    }
    getCharacters = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey2}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items,
        }
    }
}