import { Button, Card, Container, Grid, Text } from '@nextui-org/react'
import { GetStaticProps, NextPage } from 'next'
import React, { useState } from 'react'
import { pokeApi } from '../../api'
import { Layout } from '../../components/layouts'
import { Pokemon, PokemonListResponse, SmallPokemon } from '../../interfaces'
import Image from 'next/image';
import { existInFavorites, getPokemonInfo, toggleFavorites } from '../../utils'

import confetti from 'canvas-confetti';

interface Props{
    pokemon: Pokemon
}

export const PokemonPageName: NextPage<Props> = ({pokemon}) => {

    const [isInFavorite, setIsInFavorite] = useState(existInFavorites(pokemon.id))
  
    const onToggleFavorite = () => {
        toggleFavorites(pokemon.id)
        setIsInFavorite(!isInFavorite)

        if(isInFavorite) return;
        
        confetti({
            zIndex: 999,
            particleCount: 50,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0
            }
        })

    }

    return (
    <Layout title={pokemon.name || 'Pokemon'}>
        
        <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
            <Grid xs={ 12 } sm={ 4 }>
                <Card isHoverable variant="bordered">
                    <Card.Body>
                        <Card.Image src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' } 
                                    alt={ pokemon.name }
                                    width="100%"
                                    height={200}/>
                    </Card.Body>
                </Card>
            </Grid>

            <Grid xs={ 12 } sm={ 8 }>
                <Card>
                    <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text h1 transform='capitalize'>{pokemon.name}</Text>

                        <Button color="gradient" 
                                ghost={!isInFavorite} 
                                onClick={onToggleFavorite}>
                                {
                                    !isInFavorite ? 'Guardar favoritos':'Quitar de favoritos'
                                }
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Text size={30}>Sprites:</Text>
                        <Container direction="row" display='flex' gap={ 0 }>
                            <Image src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}/>
                            <Image src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}/>
                            <Image src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}/>
                            <Image src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}/>
                        </Container>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid.Container>

    </Layout>
  )
}

// pages/posts/[id].js

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {

    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

    const pokemons: string[] = data.results.map(( pokemon ) => pokemon.name)

    return {
      paths: pokemons.map( (name) => ({
        params: { name }
      })),
      fallback: false, // can also be true or 'blocking'
    }
}

export const getStaticProps:GetStaticProps = async(context) => {
  
    const {name} = context.params as { name: string }

    return {
      props: {
        pokemon: await getPokemonInfo(name)
      }, // will be passed to the page component as props
    }
  }

export default PokemonPageName;