import { Label, Separator, SizeTokens, Switch, XStack, YStack, styled } from 'tamagui'

export function SwitchDemo(props: {id: string, onCheckedChange: (checked: boolean) => void}) {
  return (
    <YStack width={200} alignItems="center" space="$3">
      <SwitchWithLabel size="$4" id={props.id} onCheckedChange={props.onCheckedChange}/>
    </YStack>
  )
}

export function SwitchWithLabel(props: { size: SizeTokens, id: string, onCheckedChange: (checked: boolean) => void}) {
  const id = props.id

  return (
    <XStack width={200} alignItems="center" space="$4">
      <Label
        paddingRight="$0"
        minWidth={120}
        justifyContent="flex-end"
        size={props.size}
        htmlFor={id}
      >
        Custom request
      </Label>
      <Separator minHeight={20} vertical />
      <Switch id={id} size={props.size} onCheckedChange={props.onCheckedChange}>
        <Switch.Thumb animation="quick" />
      </Switch>
    </XStack>
  )
}
