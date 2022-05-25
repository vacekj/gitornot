import {Box, Button, Container, Heading, Stack, Text, useBreakpointValue} from '@chakra-ui/react'
import React from 'react';
import {Link, Head} from '@inertiajs/inertia-react';


export default function Welcome(props: any) {
    return (
        <>
            <Head title="Welcome to GitOrNot"/>
            <div
                className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={route('dashboard')} className="text-sm text-gray-700 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <a href={'/auth/redirect'} className="text-sm text-gray-700 underline">
                                Log in via GitHub
                            </a>
                        </>
                    )}
                </div>

                <Box as="section" bg="bg-surface">
                    <Container py={{base: '16', md: '24'}}>
                        <Stack spacing={{base: '8', md: '10'}}>
                            <Stack spacing={{base: '4', md: '5'}} align="center">
                                <Heading size={useBreakpointValue({base: 'sm', md: 'md'})}>Ready to Grow?</Heading>
                                <Text color="muted" maxW="2xl" textAlign="center" fontSize="xl">
                                    With this beautiful and responsive React components you will realize your next
                                    project
                                    in no time.
                                </Text>
                            </Stack>
                            <Stack spacing="3" direction={{base: 'column', sm: 'row'}} justify="center">
                                <Button variant="secondary" size="lg">
                                    Learn more
                                </Button>
                                <Button variant="primary" size="lg">
                                    Start Free Trial
                                </Button>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            </div>
        </>
    );
}
