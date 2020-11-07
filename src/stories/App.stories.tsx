import React from 'react'
import {App} from '../components/App'
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator'
import StoryRouter from 'storybook-react-router'

export default {
  title: 'App Stories',
  component: App,
  decorators: [ReduxStoreProviderDecorator, StoryRouter()]
}

export const AppBaseExample = () => <App demo={true}/>
