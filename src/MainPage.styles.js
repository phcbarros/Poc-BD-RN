import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import { Text, Card } from 'react-native-elements'

export const Container = styled(LinearGradient).attrs({
  colors: ['#194C4D', '#2D8682'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  flex: 1;
`

export const Header = styled.View`
  margin: 20px;
`

export const Title = styled(Text)`
  color: #fff;
`

export const Subtitle = styled(Title)`
  margin-top: 20px;
`
