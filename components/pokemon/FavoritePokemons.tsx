import React, { FC } from 'react'
import { Card, Grid } from '@nextui-org/react';
import { FavoritePokemonCard } from './FavoritePokemonCard';

interface Props{
    favoritePokemons: number[];
}

export const FavoritePokemons: FC<Props> = ({favoritePokemons}) => {
  return (
    <Grid.Container gap={ 2 } direction="row" justify="flex-start">
        {
        favoritePokemons.map( id => (
            <FavoritePokemonCard key={id} id={id} />
        ))
        }
    </Grid.Container>
  )
}
