import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react"

export default function UserCreatePage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const url = `${process.env.REACT_APP_API_URL}/users`
        const headers = {
            "Content-Type": "application/json"
        }
        const payload = { username, password }

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setErrorMessage(data.message)
                } else {
                    navigate("/login")
                }
            })
    }
    return (
        <Box
            border="1px"
            borderColor="gray.500"
            borderRadius="4"
            p="2rem"
            shadow="md"
        >
            <Heading mb="5rem" as="h1" size="2xl">Create User</Heading>

            <form onSubmit={handleOnSubmit}>
                <Stack spacing="2rem" w="20rem">
                    <Input variant="flushed" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    <Input variant="flushed" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    {errorMessage && <Text color="red.300">{errorMessage}</Text>}
                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
        </Box>
    )
}
