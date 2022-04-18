import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import TodoCard from '../components/TodoCard'

export default function HomePage() {
    const [todos, setTodos] = useState(null)
    const [completedTodos, setCompletedTodos] = useState(null)

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/todos`
        const token = localStorage.getItem("todo-app")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        fetch(url, {
            method: "GET",
            headers: headers
        })
            .then(res => res.json())
            .then(data => {
                setTodos(data)
            })
    }, [])

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/todos/completed`
        const token = localStorage.getItem("todo-app")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        fetch(url, {
            method: "GET",
            headers: headers
        })
            .then(res => res.json())
            .then(data => setCompletedTodos(data))
    }, [])
    return (
        <Flex w="80%" h="90vh" align="center" direction="column">
            <Heading as="h1" size="2xl" mb="2rem">Todo-app</Heading>
            <Flex w="100%" h="100%" justify="space-between">
                <Stack w="49%" bg="gray.100" p="2rem" borderRadius={6} boxShadow="lg">
                    <Heading as="h2" size="xl" mb="1rem">Todos</Heading>
                    {todos ? todos.map(todo => {
                        return <TodoCard todo={todo} />
                    })
                : <Text>No todos</Text>}
                </Stack>
                <Stack w="49%" bg="green.300" p="2rem" borderRadius={6} boxShadow="lg">
                    <Heading as="h2" size="xl" mb="1rem">Completed</Heading>
                    {completedTodos ? completedTodos.map(todo => {
                        return <TodoCard todo={todo} />
                    })
                : <Text>No todos</Text>}
                </Stack>
            </Flex>
        </Flex>
    )
}
