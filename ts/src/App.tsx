import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import PokemonCollection from "./components/PokemonCollection";
import { Pokemon } from "./interface";
interface Pokemons {
  name: string;
  url: string;
}
export interface Detail {
  id: number;
  isOpen: boolean;
}
function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<Detail>({
    id: 0,
    isOpen: false,
  });
  useEffect(() => {
    const getPokemons: () => void = async () => {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=20`
      );
      setNextUrl(res.data.next);
      res.data.results.forEach(async (e: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${e.name}`
        );
        setPokemons((prev) => [...prev, poke.data]);
      });
    };
    setLoading(false);

    getPokemons();
  }, []);
  const loadNextPage = async () => {
    setLoading(true);
    const res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (e: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${e.name}`
      );
      setPokemons((prev) => [...prev, poke.data]);
    });
    setLoading(false);
  };
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection
          pokemons={pokemons}
          detail={detail}
          setDetail={setDetail}
        />
        <div className="btn" onClick={loadNextPage}>
          <button>{loading ? "...Loading" : "Load more"}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
