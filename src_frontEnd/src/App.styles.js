import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  #root {
    margin: 0 auto;
    padding: 0.5em;
    max-width: 1000px;
    font-size: 1.2em;
    & * {
      font-family: 'Merriweather', serif;
    };
  };
  ${({ theme }) => theme.hightResolutionMediaMixin(
    `#root {
      font-size: 1.3em;
    }`,
  )}
`;
