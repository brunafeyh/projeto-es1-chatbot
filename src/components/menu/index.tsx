import { FC } from 'react'
import Logo from '../logo'
import { Stack } from '@mui/material'
import { BoxMenuApresentation, MenuContainerApresentation } from './styles'

const Menu: FC = () => {
  return (
    <>
      <BoxMenuApresentation zIndex={1000}>
        <MenuContainerApresentation>
          <Stack direction="row" alignItems="center" flexGrow={1}>
            <Logo />
           </Stack>
        </MenuContainerApresentation>
      </BoxMenuApresentation>
    </>
  )
}

export default Menu
