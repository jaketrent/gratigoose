import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'

import * as routes from './common/config/routes'
import store from './common/store'

routes.map(store.getState().routing.basePath)
