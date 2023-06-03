import { stat } from 'fs'

import { useEffect, useState } from 'react'
import { Button, Form, H4, Input, SizeTokens, Spinner, TextArea, XStack, YStack } from 'tamagui'
import { SelectDemo } from './select'
import { SwitchDemo } from './switch'

export function FormsDemo() {
  const [status, setStatus] = useState<'Please fill in configuration' | 'Running requests...' | 'Requests submitted'>('Please fill in configuration')
  const [isCustom, setIsCustom] = useState<true | false>(false)
  const [request, setRequest] = useState<string>('')
  const [noOfRequests, setNoOfRequests] = useState<number>(1)
  const [requestSize, setRequestSize] = useState<number>(1)

  const numberMatch = new RegExp('[0-9]+', 'gi');

  function setNoOfRequestsWrapper(text: string) {
    if (text.match(numberMatch) === null) {
      setNoOfRequests(1)
      return;
    }
    let noOfRequests = parseInt(text)
    if (noOfRequests < 0 || noOfRequests > 500) {
      setNoOfRequests(1)
      return;
    }
    setNoOfRequests(noOfRequests)
  }

  function setRequestSizeWrapper(text: string) {
    if (text.match(numberMatch) === null) {
      setRequestSize(1)
      return;
    }
    let noOfRequests = parseInt(text)
    if (noOfRequests < 1 || noOfRequests > 1024 * 1024) {
      setRequestSize(1)
      return;
    }
    setRequestSize(noOfRequests)
  }

  useEffect(() => {
    if (status === 'Running requests...') {
      console.log(noOfRequests)
      const timer = setTimeout(() => setStatus('Please fill in configuration'), 2000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [status])

  useEffect(() => {
    if (!isCustom) {
      setRequest('')
    }
  }, [isCustom])

  useEffect(() => {
    console.log(request);
  }, [request])

  return (
    <Form
      alignItems="center"
      minWidth={300}
      space
      onSubmit={() => setStatus('Running requests...')}
      borderWidth={1}
      borderRadius="$4"
      backgroundColor="$background"
      borderColor="$borderColor"
      padding="$8"
    >
      <H4>{status[0].toUpperCase() + status.slice(1)}</H4>

      <SelectDemo></SelectDemo>

      <SwitchDemo id='random' onCheckedChange={setIsCustom}></SwitchDemo>

      {isCustom 
        ? <YStack width={300} alignItems="center" space="$3">
          <TextArea minHeight={140} placeholder="Enter your request..." numberOfLines={4} onChangeText={setRequest}/>
        </YStack>
        : <YStack width={300} alignItems="center" space="$3">
          <Input minWidth={300} inputMode='numeric' flex={1} size='$3' placeholder={`Set generated request size (bytes)`} onChangeText={setRequestSizeWrapper}/>
        </YStack>
      }

        <YStack width={300} alignItems="center" space="$3">
          <Input minWidth={300} inputMode='numeric' flex={1} size='$3' placeholder={`Set # of requests`} onChangeText={setNoOfRequestsWrapper}/>
        </YStack>

      <Form.Trigger asChild disabled={status !== 'Please fill in configuration'}>
        <Button icon={status === 'Running requests...' ? () => <Spinner /> : undefined}>
          Submit
        </Button>
      </Form.Trigger>
    </Form>
  )
}
