import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import PokemonColection from "./components/PokemonColection";

interface Pokemon {
  name: string;
  url: string;
}

export interface Pokemon2 {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface Detail {
  id: number;
  isOPened: boolean;
}

export interface PokemonDetails extends Pokemon2 {
  abilities?: {
    ability: string;
    name: string;
  }[];
}

const App: React.FC = () => {
  const [pokemon, setpokemon] = useState<Pokemon2[]>([]);
  const [url, setnexturl] = useState<string>("");
  const [loading, setloading] = useState<boolean>(true);
  const [view, setview] = useState<Detail>({
    id: 0,
    isOPened: false,
  });

  useEffect(() => {
    const pokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setnexturl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemon) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setpokemon((p) => [...p, poke.data]);
        setloading(false);
      });
    };
    pokemon();
  }, []);

  const nextPage = async () => {
    setloading(true);
    let res = await axios.get(url);
    setnexturl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemon) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setpokemon((p) => [...p, poke.data]);
      setloading(false);
    });
  };

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonColection pokemons={pokemon} view={view} setview={setview} />
        {!view.isOPened && (
          <div className="btn">
            <button onClick={nextPage} disabled={loading}>
              {loading ? "Loading ..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
