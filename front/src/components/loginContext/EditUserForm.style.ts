import styled from 'styled-components'

export const EditUserFromWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  .mantine-Paper-root {
    border-radius: 0 0 2em 2em;
    padding: 80px;
  }

  .mantine-Textarea-input {
    height: 100px;
  }

  .mantine-InputWrapper-label {
    font-size: 20px;
  }
  .mantine-Input-input{
    background-color: rgb(217, 217, 217);
    border-radius: 0;
    border-bottom-color: #000000;
    border-top: none;
    border-left: none;
    border-right: none;
  }
  .mantine-gszoqu:focus, .mantine-gszoqu:focus-within{
    border-bottom-color: #000000;
  }
`
