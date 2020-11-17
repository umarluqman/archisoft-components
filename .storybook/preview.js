import { ChakraProvider } from '@chakra-ui/react'
import * as React from 'react'
import { withPerformance } from 'storybook-addon-performance'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const withChakra = (StoryFn) => {
  console.log('chakra')

  return (
    <ChakraProvider>
      <div id="story-wrapper" style={{ minHeight: '100vh' }}>
        <StoryFn />
      </div>
    </ChakraProvider>
  )
}

export const decorators = [withChakra, withPerformance]
