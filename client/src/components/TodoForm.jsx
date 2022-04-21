import React, { useState, useEffect } from 'react'
import Select from "react-select"
import { Box, Button, Input, HStack, Heading, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react'

export default function TodoForm({ setReload }) {
    const [title, setTitle] = useState("")
    const [abstract, setAbstract] = useState("")
    const [tags, setTags] = useState([])
    const [selectOptions, setSelectOptions] = useState([])
    const [newTag, setNewTag] = useState([])
    const [reloadTags, setReloadTags] = useState(false)

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/users/me`
        const token = localStorage.getItem("todo-app")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        fetch(url, {
            headers: headers
        })
            .then(res => res.json())
            .then(data => {
                setSelectOptions(data.tags.map(tag => ({ value: tag.tag, label: tag.tag })))
                setReloadTags(false)
            })
    }, [reloadTags])

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const url = `${process.env.REACT_APP_API_URL}/todos/create`
        const token = localStorage.getItem("todo-app")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const modifiedTags = tags.map(tag => tag.value)
        const payload = { title, abstract, tags: modifiedTags }

        // console.log(payload)

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                setTitle("")
                setAbstract("")
                setTags([])
                setReload(true)
            })
    }

    const handleOnModalSubmit = (e) => {
        e.preventDefault()

        const url = `${process.env.REACT_APP_API_URL}/tags`
        const token = localStorage.getItem("todo-app")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const payload = { tags: newTag}
        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                setReloadTags(true)
                setNewTag([])
                onClose()
            })
    }

    const handleOnChange = (e) => {
        if (tags.length <= 5) {
            setTags(e)
        }
    }

    return (
        <Flex w="100%" direction="column" align="center" mb="2rem" border="1px" borderColor="gray.200" borderRadius={6} p="1rem">
            <Heading as="h3" size="lg" mb="1rem">Add Todo</Heading>
            <Box w="100%">
                <form onSubmit={handleOnSubmit}>
                    <Flex gap="2rem">
                        <Input w="30%" variant="flushed" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                        <Input w="50%" variant="flushed" placeholder="Short description" value={abstract} onChange={e => setAbstract(e.target.value)} />
                        <Select isMulti value={tags} options={selectOptions} onChange={e => handleOnChange(e)} />
                        <Button type="submit">Add Todo</Button>
                        <Button onClick={onOpen}>Add Tag</Button>
                        
                    </Flex>
                </form>
                <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Add Tag</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <form onSubmit={handleOnModalSubmit}>
                                        <Input w="60%" mr="2rem" variant="flushed" placeholder="Tag" value={newTag} onChange={e => setNewTag([e.target.value])} />
                                        <Button type="submit">Add Tag</Button>
                                    </form>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
            </Box>
        </Flex>
    )
}
