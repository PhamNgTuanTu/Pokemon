import React, { useEffect, useState } from "react";
import { Detail } from "../App";

interface Props {
  view: Detail;
  setview: React.Dispatch<React.SetStateAction<Detail>>;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
  name: string;
  id: number;
  image: string;
}
const PokemonList: React.FC<Props> = (props) => {
  const { name, id, image, abilities, view, setview } = props;
  const [isSelected, setIsSelected] = useState<boolean>(false);
  useEffect(() => {
    setIsSelected(id === view?.id);
  }, [view]);

  const turnOff = () => {
    setview({
      id: 0,
      isOPened: false,
    });
  };
  return (
    <>
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={turnOff}>
              x
            </p>
            <div className="detail-info">
              <img src={image} alt={name} className="detail-img" />
              <p className="detail-name">{name}</p>
              <div className="detail-skill">
                <p className="detail-ability">Abilities: </p>
                {abilities?.map((item: any, i) => {
                  return (
                    <div key={i} className="">
                      {item.ability.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name">{name}</p>
          <img src={image} alt={name} />
        </section>
      )}
    </>
  );
};

export default PokemonList;
