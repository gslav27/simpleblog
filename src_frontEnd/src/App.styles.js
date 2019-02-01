import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  & * {
    font-family: 'Merriweather', serif;
    box-sizing: border-box;
  };
  #root {
    margin: 0 auto;
    padding: 0.5em;
    max-width: 1000px;
    font-size: 1.2em;
  };
  ${({ theme }) => theme.hightResolutionMediaMixin(
    `#root {
      font-size: 1.3em;
    }`,
  )}
`;
