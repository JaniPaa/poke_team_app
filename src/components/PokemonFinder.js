import React, { useEffect, useState } from 'react';
import axios from 'axios'

const PokemonFinder = (props) => {
    const [pokemons, setPokemons] = useState([])
    const [pokemonName, setPokemonName] = useState('')
    const [myTeam, setMyTeam] = useState([])
    const [statsName, setStatsName] = useState('Stats ►')
    const [isStatsOpen, setIsStatsOpen] = useState(false)

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
        if (myTeam.some(poke => poke.name === pokemons.name)) {
            alert("Your team already contains that pokemon!")
        } else if (myTeam.length >= 6) {
            alert("Your team is already full!")
        }
        else if (myTeam.length < 6) {
            setMyTeam([...myTeam, pokemons])
        } else {
            return null
        }
    }

    function handleStatChange() {
        if (isStatsOpen) {
            setIsStatsOpen(false)
            setStatsName("Stats ►")
        } else {
            setIsStatsOpen(true)
            setStatsName("Stats ▼")
        }
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
                    <img src={pokemons.sprites.front_default} alt="Default sprite" />
                    <div>
                        {(pokemons.types.map((type, key) =>
                            <p key={key}>{type.type.name}</p>
                        ))}
                    </div>
                    {/* <p>{pokemons.stats[0].base_stat}</p> */}
                    <button onClick={handleStatChange}>{statsName}</button><br />
                    {isStatsOpen ?
                        <div>
                            {pokemons.stats.map((pokeStats, key) => (
                                <p key={key}>{pokeStats.stat.name}: {pokeStats.base_stat}</p>
                            ))}
                        </div> : null
                    }
                    <button type="submit" onClick={addPokemonToTeam}>Add to my team</button>
                </div>
                <div>
                    <h3>My team</h3>
                    {(myTeam.map((pokemon, key) =>
                        <div key={key}>
                            <h3>{pokemon.name}</h3>
                            <img src={pokemon.sprites.front_default} alt="Default sprite" />
                            <button onClick={() => {
                                setMyTeam(myTeam.filter(poke => poke !== pokemon))
                                // setMyTeam(myTeam.splice(myTeam.indexOf(pokemon),1))
                            }}>Remove</button>
                            {(pokemon.types.map((type, key) =>
                                <p key={key}>{type.type.name}</p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

        )
    }


}

export default PokemonFinder