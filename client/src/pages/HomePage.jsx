import { Button, Flex, Heading, Select, Stack, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import TodoCard from '../components/TodoCard'
import TodoForm from '../components/TodoForm'

export default function HomePage() {
    const [todos, setTodos] = useState([])
    const [completedTodos, setCompletedTodos] = useState([])
    const [reload, setReload] = useState(false)
    const [filterList, setFilterList] = useState([])
    const [filterValue, setFilterValue] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("todo-app")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        fetch(`${process.env.REACT_APP_API_URL}/todos?filter=${filterValue}`, {
            method: "GET",
            headers: headers
        })
            .then(res => res.json())
            .then(data => {
                setReload(false)
                setTodos(data.todos)
                addTagToFilterList(data.todos)
            })
        fetch(`${process.env.REACT_APP_API_URL}/todos/completed?filter=${filterValue}`, {
            method: "GET",
            headers: headers
        })
            .then(res => res.json())
            .then(data => {
                setReload(false)
                setCompletedTodos(data.todos)
                addTagToFilterList(data.todos)
            })
    }, [reload, filterValue])

    const addTagToFilterList = (todos) => {
        const arr = []
        todos.forEach(todo => {
            todo.tags.forEach(tag => {
                if (!arr.includes(tag.tag) && !filterList.includes(tag.tag)) {
                    arr.push(tag.tag)
                }
            })
        })
        setFilterList(filterList => [...filterList, ...arr])
    }

    return (
        <Flex w="80%" h="90vh" align="center" direction="column" mb="2rem">
            <TodoForm setReload={setReload} />
            <Flex gap="2rem" mb="1rem" w="20%">
                <Text w="40%">Filter on Tag:</Text>
                <Select w="60%" variant="flushed" onChange={e => {
                    setFilterValue(e.target.value)
                }}>
                    <option value="">--</option>
                    {filterList.length && filterList.map(tag => {
                        return <option key={tag._id} value={tag}>{tag}</option>
                    })}
                </Select>
            </Flex>
            <Flex w="100%" h="100%" justify="space-between">
                <Stack w="49%" bg="gray.100" p="2rem" borderRadius={6} boxShadow="lg">
                    <Heading as="h2" size="xl" mb="1rem">Todos</Heading>
                    {todos.length ? todos.map(todo => {
                        return <TodoCard key={todo._id} todo={todo} setReload={setReload} />
                    })
                        : <Text>No todos</Text>}
                </Stack>
                <Stack w="49%" bg="green.300" p="2rem" borderRadius={6} boxShadow="lg">
                    <Heading as="h2" size="xl" mb="1rem">Completed</Heading>
                    {completedTodos.length ? completedTodos.map(todo => {
                        return <TodoCard key={todo._id} todo={todo} setReload={setReload} />
                    })
                        : <Text>No todos</Text>}
                </Stack>
            </Flex>
        </Flex>
    )
}
