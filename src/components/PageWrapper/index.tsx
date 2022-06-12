import React, { PropsWithChildren } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'

interface PageWrapperProps {
  pageTitle: string
}
export const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = ({
  pageTitle,
  children,
}) => {
  return (
    <Box>
      <Flex
        alignItems="center"
        h={'60px'}
        borderBottomWidth={1}
        p={3}
        w={'full'}
      >
        <Heading fontSize={'lg'}>{pageTitle}</Heading>
      </Flex>
      <Box px={2}>{children}</Box>
    </Box>
  )
}
