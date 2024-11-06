import { FC } from 'react'
import ChatBot from '../../components/chat-bot'
import { withAuthentication } from '../../hocs/authentication/with-authentication'
import { roles } from '../../utils/auth'

const HomePage: FC = () => {
    return <ChatBot/>
}

export default withAuthentication(HomePage, roles)
