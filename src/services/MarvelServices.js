class MarvelServices {
  #url = new URL("/v1/public/", "https://gateway.marvel.com");
  #baseOffsetCharacters = 210;
  #setQueriesToUrl = (url, arrayQueries) => {
    url.searchParams.set("apikey", "e958f1be5847ed91f8256a4e89a69d0f");
    arrayQueries &&
      arrayQueries.forEach(({ param, value }) => {
        url.searchParams.set(param, value);
      });
  };

  #getResources = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return await res.json();
    } catch (error) {
      console.error(error.message);
    }
  };

  #transformCharacter = (res) => {
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

  getAllCharacters = async (offset = this.#baseOffsetCharacters) => {
    const url = new URL("characters", this.#url);
    this.#setQueriesToUrl(url, [
      {
        param: "limit",
        value: 9,
      },
      {
        param: "offset",
        value: offset,
      },
    ]);
    const characters = await this.#getResources(url);
    return characters.data.results.map(this.#transformCharacter);
  };

  getOneCharacter = async (id) => {
    const url = new URL(`characters/${id}`, this.#url);
    this.#setQueriesToUrl(url);
    const character = await this.#getResources(url);
    return this.#transformCharacter(character.data.results[0]);
  };
}

export default new MarvelServices();
