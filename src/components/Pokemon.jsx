import React, { useEffect, useState } from 'react';
function Pokemon() {
    const [pokeData, setPokeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pokeId, setPokeId] = useState(1);
    const [errorMsg, setErrorMsg] = useState(null);
    const fetchPokemonData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
            if (!response.ok) {
                throw new Error('Failed to get Data');
            }
            const dataRes = await response.json();
            setPokeData(dataRes);
            setIsLoading(false);
            setErrorMsg(null);
        } catch (error) {
            setIsLoading(false);
            setErrorMsg('Error in fetching Pokémon data');
        }
    }
    useEffect(() => {
        fetchPokemonData();
    }, []);
    if (!pokeData) {
        return <div>No Pokémon data available.</div>;
    }
    const { name, sprites, moves } = pokeData;
    const handleChange = (e) => {
        setPokeId(e.target.value);
    }
    const getPokemonInfo = () => {
        if (pokeId.length < 1) {
            return;
        }
        fetchPokemonData();
    }
    return (
        <>
            <div className="get-pokemon-form">
                <h2>Please enter a Pokémon ID to fetch data</h2>
                <div className="div-region">
                    <input type="text" value={pokeId} onChange={handleChange} />
                </div>
                <div className="div-region">
                    <button onClick={getPokemonInfo} className="button">Fetch Pokémon Data</button>
                </div>
                <div className="err-region">
                    {errorMsg}
                </div>
            </div>
            {
                !errorMsg ?
                    !isLoading ? (
                        <div className="Pokemon-card">
                            <h1>Pokemon Character: {name}</h1>
                            <div className="pokemon-info">
                                <div className="sprites">
                                    <h2>Sprites:</h2>
                                    <img src={sprites.front_default} alt={`${name} front`} />
                                    <img src={sprites.back_default} alt={`${name} back`} />
                                    <img src={sprites.front_shiny} alt={`${name} shiny front`} />
                                </div>
                                <div className="moves">
                                    <h2>Moves:</h2>
                                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                        {moves.slice(0, 5).map((move, index) => (
                                            <li key={index} style={{ fontSize: '18px', color: '#555' }}>
                                                {move.move.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="loading-state">Fetching Pokemon Character Data...</div>
                    )
                    : null
            }
        </>
    );
}
export default Pokemon;