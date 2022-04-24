import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Flex, Heading, IconButton, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Input,
    InputGroup,
    InputLeftElement
} from '@chakra-ui/react'
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons"

export default function Navbar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("todo-app")
        navigate("/login")
    }

    const handleClickOnLogin = () => {
        navigate("/login")
    }

    return (
        <Flex
            w="100%"
            h="100px"
            bg="pink.100"
            align="center"
            mb="1rem"
            justify="space-between"
            px="2rem"
        >
                <Heading as="h1" size="2xl">Todo-app</Heading>
                <InputGroup w="16rem" borderColor="gray.500" >
                    <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon color='gray.500' />}
                    />
                    <Input placeholder="Search" focusBorderColor="gray.500" />
                </InputGroup>

                <Menu direction="rtl">
                    <MenuButton as={IconButton}
                        aria-label='Options'
                        icon={<HamburgerIcon />}
                        variant='outline'
                        borderColor="gray.500"
                        bg="pink.100"
                        size="lg" />
                    <MenuList>
                        <MenuItem onClick={handleClickOnLogin}>Login</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                </Menu>
        </Flex>
    )
}
