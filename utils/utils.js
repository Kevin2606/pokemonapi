const uri = 'https://pokeapi.co/api/v2'

const config = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}

const getPokemonesFetch = async (limit) => {
    limit = (limit === undefined) ? '?offset=0&limit=20': limit;
    const response = await fetch(`${uri}/pokemon${limit}`, config)
    const data = await response.json()
    return data
}
const getPokemonFetch = async (id) => {
    const response = await fetch(`${uri}/pokemon/${id}`, config)
    if (response.status === 404) return undefined;
    const data = await response.json()
    return data
}

export { getPokemonesFetch, getPokemonFetch }