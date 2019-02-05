import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css?family=Muli:300,400,600");

    html,
    body,
    #root {
        height: 100%;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: "Muli", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        margin: 0;
        margin-block-start: 0;
        margin-block-end: 0;
    }
`;
