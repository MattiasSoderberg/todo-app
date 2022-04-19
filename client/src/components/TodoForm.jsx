import { Box, Button, Input, HStack, Heading, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function TodoForm({ setReload }) {
    const [title, setTitle] = useState("")
    const [abstract, setAbstract] = useState("")

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const url = `${process.env.REACT_APP_API_URL}/todos/create`
        const token = localStorage.getItem("todo-app")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const payload = { title, abstract }

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTitle("")
                setAbstract("")
                setReload(true)
            })
    }

    return (
        <Flex w="100%" direction="column" align="center" mb="2rem" border="1px" borderColor="gray.200" borderRadius={6} p="1rem">
            <Heading as="h3" size="lg" mb="1rem">Add Todo</Heading>
            <Box w="100%">
                <form onSubmit={handleOnSubmit}>
                    <Flex gap="2rem">
                        <Input w="30%" variant="flushed" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                        <Input w="60%" variant="flushed" placeholder="Short description" value={abstract} onChange={e => setAbstract(e.target.value)} />
                        <Button type="submit">Add Todo</Button>
                    </Flex>
                </form>
            </Box>
        </Flex>
    )
}
