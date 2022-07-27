import { Card, Grid } from '@nextui-org/react'
import { useRouter } from 'next/router';
import React, { FC } from 'react'

interface Props{
    id: number;
}

export const FavoritePokemonCard: FC<Props>= ({id}) => {
    const router = useRouter();
    
    const handleOnclick = () => {
       
       router.push(`/pokemon/${id}`);
    }
    

  return (
    <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 } key={ id } onClick={ handleOnclick}>
        <Card isPressable isHoverable variant="bordered">
            <Card.Image 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
            width={'100%'}
            height={140}/>
        </Card>
    </Grid>
  )
}
