import { Helmet } from 'react-helmet'
import { useCollectiveContext } from '../../../providers/CollectiveProvider'
import ChatBox from '../../../components/chat/ChatBox'

const Chat = () => {
  const {collective} = useCollectiveContext()
  
  return (
    <>
      <Helmet>
        <title>{`${collective?.name} | Heroes`}</title>
      </Helmet>
      <div>
        <ChatBox collectiveID={collective?.id} isForCollective={true} />
      </div>
    </>
  )
}

export default Chat