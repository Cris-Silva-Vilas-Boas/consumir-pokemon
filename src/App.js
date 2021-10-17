import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [pokemon, setPokemon] = useState();
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [id, setEvolution] = useState();

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };

  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
    } catch (e) {
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter with name: "
          />
        </label>
      </form>
    
      {pokemonData.map((data) => {
        return (
          <div className="container">
            <img src={data.sprites["front_default"]} />
            <div className="divTable">
              <div className="divTableBody">

                <div className="divTableRow">
                  <div className="divTableCell">Pokemon type</div>
                  <div className="divTableCell">
                      <b>{pokemonType}</b>
                  </div>
                </div>

                <div className="divTableRow">

                  <div className="divTableCell">Height</div>
                  <div className="divTableCell">
                    {" "}
                    <b>{Math.round(data.height * 3.9)}"</b>
                  </div>

                </div>

                <div className="divTableRow">
                  <div className="divTableCell">Weight</div>
                  <div className="divTableCell">
                    {" "}
                    <b>{Math.round(data.weight / 4.3)} lbs</b>
                  </div>
                </div>

                <div className="divTableRow">
                  <div className="divTableCell">Number of Battles</div>
                  <div className="divTableCell">
                    <b>{data.game_indices.length}</b>  
                  </div>
                </div>

                <div className="divTableRow">
                  <div className="divTableCell">Name of pokemon</div>
                  <div className="divTableCell">
                      <b>{data.name}</b>
                  </div>
                </div>

                <div className="divTableRow">
                  <div className="divTableCell">Abilities of pokemon</div>
                  <div className="divTableCell">
                    <b>{data.abilities[0].ability.name}</b><br/>
                    <b>{data.abilities[1].ability.name}</b><br/>
                    <b>{data.abilities[2].ability.name}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;