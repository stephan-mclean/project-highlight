import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Theme from '../../theme/Theme';

import Test from './Test';

const stories = storiesOf('Test', module)
stories.add('Test', () => (
    <ThemeProvider theme={Theme.main}>
        <Test />
    </ThemeProvider>
));