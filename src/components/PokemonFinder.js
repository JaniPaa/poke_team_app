import React, { useEffect, useState } from 'react';
import axios from 'axios'

const PokemonFinder = (props) => {
    const [pokemons, setPokemons] = useState([])
    const [pokemonName, setPokemonName] = useState('')
    const [myTeam, setMyTeam] = useState([])

    const handlePokemonNameChange = (e) => {
        e.preventDefault()
        setPokemonName(e.target.value)
    }

    function findPokemon() {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
            .then(response => {
                setPokemons(response.data)
                console.log(response.data)
            })
    }

    const addPokemonToTeam = () => {
        setMyTeam([...myTeam, pokemons])
        console.log(myTeam)
    }

    if (pokemons.length === 0) {
        return (
            <div>
                <input type="text" value={pokemonName} placeholder="pokemon" onChange={handlePokemonNameChange}></input>
                <button type="submit" onClick={findPokemon}>Search</button>
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <input type="text" value={pokemonName} placeholder="pokemon" onChange={handlePokemonNameChange}></input>
                    <button type="submit" onClick={findPokemon}>Search</button>
                    <h4>{pokemons.name}</h4>
                    <img src={pokemons.sprites.front_default} />
                    <div>
                        {(pokemons.types.map(type =>
                            <p>{type.type.name}</p>
                        ))}
                    </div>
                    <button type="submit" onClick={addPokemonToTeam}>Add to my team</button>
                    {/* <button onClick={e => {
                        console.log(myTeam)
                    }}>test</button> */}
                </div>
                <div>
                    <h3>My team</h3>
                    {(myTeam.map(pokemon =>
                        <div>
                            <h3>{pokemon.name}</h3>
                            <img src={pokemon.sprites.front_default} />
                            {(pokemon.types.map(type =>
                                <p>{type.type.name}</p>
                            ))}
                            {/* <p>{pokemon.types[0].type.name}</p> */}
                        </div>
                    ))}
                </div>
            </div>

        )
    }


}

export default PokemonFinder