import { Detail } from "../App";
import React, { useEffect, useState } from "react";
interface Props {
  detail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
  name: string;
  id: number;
  image: string;
  abilities:
    | {
        ability: {
          name: string;
        };
      }[]
    | undefined;
}
const PokemonList: React.FC<Props> = (props) => {
  const { name, id, image, abilities, detail, setDetail } = props;
  const [isSelected, setSelected] = useState<boolean>(false);
  useEffect(() => {
    if (detail.id === id) {
      setSelected(true);
    } else setSelected(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail]);
  const closeSelect = () => {
    setDetail({
      id: 0,
      isOpen: false,
    });
  };
  return (
    <div className="">
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={closeSelect}>
              X
            </p>
            <div className="detail-info">
              <img src={image} alt="pokemon" className="detail-img" />
              <p className="detail-name"> {name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability"> Ablities: </p>
              {abilities?.map((ab, idx) => {
                return (
                  <div key={idx} className="">
                    {" "}
                    {ab.ability.name}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name"> {name} </p>
          <img src={image} alt="pokemon" />
        </section>
      )}
    </div>
  );
};

export default PokemonList;
