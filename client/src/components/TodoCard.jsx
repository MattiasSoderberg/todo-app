import { Button, Flex, Heading, Stack, Text, HStack } from '@chakra-ui/react'
import React from 'react'

export default function TodoCard({ todo, setReload }) {
    const handleOnClick = () => {
        const url = `${process.env.REACT_APP_API_URL}/todos/${todo._id}/complete`
        const token = localStorage.getItem("todo-app")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        fetch(url, {
            method: "POST",
            headers: headers,
        })
            .then(res => res.json())
            .then(data => setReload(true))
        
    }
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
                            return <Text key={tag._id}>"{tag.tag}"</Text>
                        })}
                    </HStack>
                </Stack>
            }
            <Button onClick={handleOnClick}>
                {todo.isCompleted ? 
                "Uncomplete"
            : "Complete"}
                </Button>
        </Flex>
    )
}
