import { Communication, QueryWithUserAndAssignee } from '../../lib/models'
import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Text,
  Icon,
} from '@chakra-ui/react'
import { Message } from './Message'
import {
  disconnect,
  socketInitializer,
  socketIo,
} from '../../lib/websocket/client'
import { useAuth } from '../Auth/AuthProvider'
import { useMutation } from 'react-query'
import { getCommunicationsByQueryId } from '../../lib/api'
import { AiOutlineSend } from 'react-icons/ai'

const messages: Communication[] = [
  {
    queryId: 'q1',
    id: 'msg1',
    from: 'usr1',
    to: 'm1',
    timestamp: Date.now() - 20000,
    content: 'Can you please help me with my Query',
  },
  {
    queryId: 'q1',
    id: 'msg1',
    from: 'm1',
    timestamp: Date.now() - 12000,
    to: 'usr1',
    content: 'Yes Sure please give me a  moment',
  },

  {
    queryId: 'q1',
    id: 'msg3',
    timestamp: Date.now() - 2000,
    from: 'm1',
    to: 'usr1',
    content: 'You have to enable a port on Ec2 Security Groups rules',
  },
]
interface CommunicationProps {
  query: QueryWithUserAndAssignee
  currentUser: string
}

export const QueryCommunication: React.FC<CommunicationProps> = ({
  query,

  currentUser,
}) => {
  const auth = useAuth()
  const [messages, setMessages] = useState<Communication[]>([])
  const messageMutations = useMutation(
    'getMutations',
    getCommunicationsByQueryId
  )

  useEffect(() => {
    messageMutations.mutate(query.id)
  }, [])

  useEffect(() => {
    setMessages(messageMutations.data || [])
  }, [messageMutations.data])

  const updateState = (message: Communication) => {
    setMessages((m) => [...m, message])
  }

  useEffect(() => {
    socketInitializer(auth.user).then((c) => {
      socketIo.emit('chat', query.id)
      socketIo.on('message', (message: Communication) => {
        updateState(message)
      })
    })
    return () => {
      disconnect()
    }
  }, [])

  const [messageType, setMessageType] = useState('')
  const sendMessage = () => {
    const message = {
      content: messageType,
      id: Date.now(),
      to: currentUser !== query.assignee.id ? query.assignee.id: query.from,
      from: currentUser,
      queryId: query.id,
      timestamp: Date.now(),
    } as unknown as Communication
    socketIo.emit('chat-message', message)
    updateState(message)
    setMessageType('')
  }

  return (
    <Box mt={2}>
      <Box p={2} borderWidth={1}>
        <Text>Live Chat</Text>
      </Box>
      <Box
        className={'polka-dot-bg'}
        p={3}
        h={'400px'}
        w={'full'}
        overflowY={'scroll'}
        borderWidth={1}
        __css={{
          '-ms-overflow-style': 'none' /* IE and Edge */,
          'scrollbar-width': 'none' /* Firefox */,
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box>
          {messages.map((cm) => (
            <Message
              key={cm.id}
              id={cm.id}
              message={cm.content}
              isSentFromMe={cm.from === currentUser}
            />
          ))}
        </Box>
      </Box>
      <form onSubmit={(e) => e.preventDefault()}>
        <Flex>
          <Input
            placeholder="Enter message ..."
            w={'full'}
            value={messageType}
            onChange={(e) => setMessageType(e.target.value)}
          />
          <IconButton
            isDisabled={!messageType}
            rounded={'full'}
            colorScheme={'green'}
            aria-label={'Send message'}
            onClick={sendMessage}
            type="submit"
          >
            <AiOutlineSend />
          </IconButton>
        </Flex>
      </form>
    </Box>
  )
}
