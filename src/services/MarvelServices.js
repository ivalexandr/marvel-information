import { useHttp } from "../hooks/http-hook";

const useMarvelServices = () => {
  const { isLoading, isError, request, clearError } = useHttp();

  const url = new URL("/v1/public/", "https://gateway.marvel.com");
  const baseOffsetCharacters = 210;
  const baseOffsetComics = 0;

  const setQueriesToUrl = (url, arrayQueries) => {
    url.searchParams.set("apikey", "e958f1be5847ed91f8256a4e89a69d0f");
    arrayQueries &&
      arrayQueries.forEach(({ param, value }) => {
        url.searchParams.set(param, value);
      });
  };

  const transformCharacter = (res) => {
    return {
      id: res.id,
      name: res.name,
      description: res.description,
      thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
      homepage: res.urls[0].url,
      wiki: res.urls[1].url,
      comics: res.comics.items,
    };
  };

  const transformComics = (res) => {
    return {
      id: res.id,
      title: res.title,
      thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
      price: res.prices[0].price ? `${res.prices[0].price}$` : "not available",
    };
  };

  const getAllCharacters = async (offset = baseOffsetCharacters) => {
    const newUrl = new URL("characters", url);
    setQueriesToUrl(newUrl, [
      {
        param: "limit",
        value: 9,
      },
      {
        param: "offset",
        value: offset,
      },
    ]);
    const characters = await request(newUrl);
    return characters.data.results.map(transformCharacter);
  };

  const getOneCharacter = async (id) => {
    const newUrl = new URL(`characters/${id}`, url);
    setQueriesToUrl(newUrl);
    const character = await request(newUrl);
    return transformCharacter(character.data.results[0]);
  };

  const getAllComics = async (offset = baseOffsetComics) => {
    const newUrl = new URL("comics", url);
    setQueriesToUrl(newUrl, [
      {
        param: "limit",
        value: 8,
      },
      {
        param: "offset",
        value: offset,
      },
    ]);
    const comics = await request(newUrl);
    return comics.data.results.map(transformComics);
  };

  return {
    isLoading,
    isError,
    getOneCharacter,
    getAllCharacters,
    getAllComics,
    clearError,
  };
};

export { useMarvelServices };
