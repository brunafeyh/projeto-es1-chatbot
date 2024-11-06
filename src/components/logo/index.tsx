import * as React from 'react'
import { Stack } from '@mui/material'

const Logo: React.FC = () => {
	return (
		<Stack direction="column" alignItems="flex-start" flexGrow={1}>
				<img
					src="/images/ai-assistent-logo.png"
					alt="logo do Restaurante"
					style={{  width: '340px', height: '70px', marginBottom: 'auto' }}
				/>
		</Stack>
	)
}
export default Logo
