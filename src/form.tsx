import { useEffect, useState } from 'react'
import { Button, Form, H4, Input, Label, Spinner, Tabs, TextArea, XStack, YStack, Separator, H5, SizableText } from 'tamagui'
import { SelectDemoItem } from './select'
import { SwitchDemo } from './switch'
import { sendRequest } from './request'

export function FormsDemo() {
  const [status, setStatus] = useState<'Please fill in configuration' | 'Running requests...' | 'Requests submitted'>('Please fill in configuration')
  const [language, setLanguage] = useState<'rust' | 'c++' | 'python multithreaded' | 'python async'>('rust')
  const [isCustom, setIsCustom] = useState<true | false>(false)
  const [request, setRequest] = useState<string | undefined>(undefined)
  const [noOfRequests, setNoOfRequests] = useState<number>(1)
  const [requestSize, setRequestSize] = useState<number | undefined>(undefined)
  const [response, setResponse] = useState<any>(undefined)

  const numberMatch = new RegExp('[0-9]+', 'gi');

  function updateLanguage(language: string) {
    switch (language) {
      case 'rust': 
      case 'c++':
      case 'python multithreaded':
      case 'python async':
        setLanguage(language)
        break
      default:
        setLanguage('rust')
        break
    }
  }

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
    let requestSize = parseInt(text)
    if (requestSize < 1 || requestSize > 1024 * 1024) {
      setRequestSize(1)
      return;
    }
    setRequestSize(requestSize)
  }

  useEffect(() => {
    if (status === 'Running requests...') {
      async function sendRequestWrapper() {
        let response_ = await sendRequest(language, noOfRequests, request, requestSize)
        if (response_ !== undefined) {
          setResponse(await response_.json())
        }
        setStatus('Please fill in configuration')
      }
      sendRequestWrapper()
    }
  }, [status])

  useEffect(() => {
    if (!isCustom) {
      setRequest(undefined)
    } else {
      setRequestSize(undefined)
    }
  }, [isCustom])

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

      <YStack space>
        <XStack ai="center" space>
          <Label f={1} fb={0}>
            Pick a language:
          </Label>
          <SelectDemoItem onChange={updateLanguage}/>
        </XStack>
      </YStack>

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
      
      <br/>

      {response !== undefined 
        ? <Tabs defaultValue="producer" orientation="horizontal" flexDirection="column" width={400} borderRadius="$4" borderWidth="$0.25" overflow="hidden" borderColor="$borderColor">
          <Tabs.List disablePassBorderRadius="bottom" separator={<Separator vertical />} space>
            <Tabs.Tab flex={1} value="producer"> 
              <SizableText fontFamily="$body"> Producer </SizableText>
            </Tabs.Tab>
            <Tabs.Tab flex={1} value="consumer"> 
              <SizableText fontFamily="$body"> Consumer </SizableText>
            </Tabs.Tab>
          </Tabs.List>
          
          <Separator />

          <Tabs.Content alignItems="center" padding="$4" value="producer">
            <SizableText fontFamily="$body" > Throughput: {response.producer.throughput} </SizableText>
            <SizableText fontFamily="$body" > Latency: {response.producer.latency} </SizableText>
            <SizableText fontFamily="$body" > Total time: {response.producer.total_time} </SizableText>
          </Tabs.Content>
          <Tabs.Content alignItems="center" padding="$4" value="consumer">
            <SizableText fontFamily="$body" > Throughput: {response.consumer.throughput} </SizableText>
            <SizableText fontFamily="$body" > Latency: {response.consumer.latency} </SizableText>
            <SizableText fontFamily="$body" > Total time: {response.consumer.total_time} </SizableText>
          </Tabs.Content>
        </Tabs>
        : undefined
      }

    </Form>
  )
}
