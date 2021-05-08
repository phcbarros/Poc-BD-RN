import { Text } from 'react-native-elements'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: #fff;
`

export const Header = styled.View`
  width: 100%;
`

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const Subtitle = styled(Text)`
  margin-top: 10px;
`
