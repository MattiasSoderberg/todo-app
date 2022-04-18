import { Box, Flex, Heading, Stack, Text, HStack } from '@chakra-ui/react'
import React from 'react'

export default function TodoCard({ todo }) {
    return (
        <Flex
            w="90%"
            border="1px"
            borderColor="gray.400"
            borderRadius="4"
            bg="gray.200"
            p="1rem"
            boxShadow="md"
            justify="space-between"
        >
            <Stack>
                <Heading as="h3" size="md">{todo.title}</Heading>
                <Text>{todo.abstract}</Text>
            </Stack>
            {todo.tags.length > 0 &&
                <Stack>
                    <Heading as="h3" size="sm">Tags</Heading>
                    <HStack>
                        {todo.tags.map(tag => {
                            return <Text>"{tag.tag}"</Text>
                        })}
                    </HStack>
                </Stack>
            }
        </Flex>
    )
}
