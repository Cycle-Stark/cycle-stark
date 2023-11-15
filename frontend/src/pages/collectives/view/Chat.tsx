import { Helmet } from 'react-helmet'
import { useCollectiveContext } from '../../../providers/CollectiveProvider'

const Chat = () => {
  const {collective} = useCollectiveContext()
  
  return (
    <>
      <Helmet>
        <title>{`${collective?.name} | Heroes`}</title>
      </Helmet>
      <div>Chat</div>
    </>
  )
}

export default Chat