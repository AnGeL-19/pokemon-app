

import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts';
import { FavoritePokemons } from '../../components/pokemon';
import { NoFavorites } from '../../components/ui';
import { pokemons } from '../../utils';



const FavoritesPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons(pokemons)
  }, [])
  


  return (
    <Layout title="Favorites">
        
        {

          favoritePokemons.length === 0 
          ? (<NoFavorites />)
          : (<FavoritePokemons favoritePokemons={favoritePokemons} />) 

        }
      

    </Layout>
    
  )
}

export default FavoritesPage;

