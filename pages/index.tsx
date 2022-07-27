import type { GetStaticProps, NextPage } from 'next'
import { pokeApi } from '../api';

import { Layout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

import { Grid } from '@nextui-org/react';
import { PokemonCard } from '../components/pokemon';

interface Props{
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
   <Layout title='Listado de pokemon'>

    <Grid.Container gap={ 2 } justify="flex-start">
        {pokemons.map( (pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
    </Grid.Container>
      

   </Layout>
  )
}

export const getStaticProps:GetStaticProps = async(context) => {
  
  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map(({img,...rest},index)=>{
    return{
      ...rest,
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`,
    }
  })
  
  return {
    props: {
      pokemons
    }, // will be passed to the page component as props
  }
}


export default HomePage;
