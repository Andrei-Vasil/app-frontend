import '@tamagui/core/reset.css'
import '@tamagui/polyfill-dev'

import { TamaguiProvider, YStack } from 'tamagui'

import config from './tamagui.config'
import { FormsDemo } from './form'

export const Root = () => {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <YStack f={1} ai="center" jc="center">
        <FormsDemo></FormsDemo>
      </YStack>
    </TamaguiProvider>
  )
}
