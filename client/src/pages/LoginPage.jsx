import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Heading, Input, Stack, Text, Link, Button } from "@chakra-ui/react"

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const url = `${process.env.REACT_APP_API_URL}/users/token`
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
                localStorage.setItem("todo-app", data.token)
                navigate("/home")
            })
    }

    return (
        <Box>
            <Heading mb="5rem" as="h1" size="2xl">LoginPage</Heading>

            <form onSubmit={handleOnSubmit}>
                <Stack spacing="2rem" w="20rem" mb="2rem">
                    <Input variant="flushed" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    <Input variant="flushed" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <Button type="submit">Login</Button>
                </Stack>
            </form>
            <Text>Create an account <Link href="/create-user">here</Link></Text>
        </Box>
    )
}
