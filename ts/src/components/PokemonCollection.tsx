import { PokemonDetail } from "../interface";
import "./pokemon.css";
import PokemonList from "./PokemonList";
import { Detail } from "../App";
interface Props {
  pokemons: PokemonDetail[];
  detail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}
const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, detail, setDetail } = props;
  const selectPokemon = (id: number) => {
    if (detail.id !== id) {
      setDetail({
        id: id,
        isOpen: true,
      });
    }
  };
  return (
    <div>
      <section
        className={
          detail.isOpen ? "collection-container-active" : "collection-container"
        }
      >
        {" "}
        {detail.isOpen ? (
          <div className="overlay"></div>
        ) : (
          <div className=""></div>
        )}
        {pokemons.map((el, idx) => {
          return (
            <div key={idx} onClick={() => selectPokemon(el.id)}>
              <PokemonList
                detail={detail}
                setDetail={setDetail}
                key={el.id}
                name={el.name}
                id={el.id}
                image={el.sprites.front_default}
                abilities={el.abilities}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default PokemonCollection;
