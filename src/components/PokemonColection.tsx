import React from "react";
import { Detail, PokemonDetails } from "../App";
import "./Pokemon.css";
import PokemonList from "./PokemonList";

interface Props {
  pokemons: PokemonDetails[];
  view: Detail;
  setview: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonColection: React.FC<Props> = (props) => {
  const { pokemons, view, setview } = props;
  const selectPokemon = (id: number) => {
    if (!view.isOPened) {
      setview({
        id: id,
        isOPened: true,
      });
    }
  };
  return (
    <section
      className={
        view.isOPened ? "collection-container-active" : "collection-container"
      }
    >
      {view.isOPened ? (
        <div className="overlay"></div>
      ) : (
        <div className=""></div>
      )}
      {pokemons.map((item, i) => {
        return (
          <div onClick={() => selectPokemon(item.id)} key={i}>
            <PokemonList
              view={view}
              setview={setview}
              key={item.id}
              name={item.name}
              id={item.id}
              abilities={item.abilities}
              image={item.sprites.front_default}
            />
          </div>
        );
      })}
    </section>
  );
};

export default PokemonColection;
