import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { request, loading, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=983ebfa8fd291788f4770803b5cdc307";
  const _charListOffset = 0;
  const _charListLimit = 12;
  const _comiscListOffset = 0;
  const _comicsListLimit = 8;

  const getAllCharacters = async (
    limit = _charListLimit,
    offset = _charListOffset
  ) => {
    const res = await request(
      `${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (
    limit = _comicsListLimit,
    offset = _comiscListOffset
  ) => {
    const res = await request(
      `${_apiBase}comics?limit=${limit}&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformComics);
  };

  const _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 215)}...`
        : "This character is mysterious. Information about him is not easy to find.",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
    };
  };

  const _transformComics = (data) => {
    return {
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail.path + "." + data.thumbnail.extension,
      price: data.prices[0].price == 0 ? 'NOT AVAILABLE' : data.prices[0].price,
      url: data.urls[0].url
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    getAllComics,
    clearError,
  };
};

export default useMarvelService;
