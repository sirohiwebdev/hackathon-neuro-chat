import React from 'react'
import {  Flex, Text } from '@chakra-ui/react'

interface MessageProps {
  id: string
  message: string
  isSentFromMe: boolean
}

export const Message: React.FC<MessageProps> = ({
  isSentFromMe,
  id,
  message,
}) => {
  return (
    <Flex justifyContent={isSentFromMe ? 'end' : 'start'} py={3}>
      <Text
        id={id}
        maxWidth={'70%'}
        color={"gray.900"}
        p={2}
        px={3}
        rounded={"xl"}
        shadow={'sm'}
        bg={isSentFromMe ? 'blue.100' : 'gray.100'}
      >
        {message}
      </Text>
    </Flex>
  )
}
