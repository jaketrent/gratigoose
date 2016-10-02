import * as actions from '../actions'
import * as utils from '../utils'

const alertDismissal = store => next => action => {
  if (utils.hasAlerts(action)) {
    action.alerts
      .filter(utils.isSuccess)
      .forEach((alert, i) => {
        setTimeout(_ => {
          store.dispatch(actions.dismissAlert(alert.id))
        }, utils.AUTO_DISMISS_DELAY * (i + 1))
      })
  }

  return next(action)
}

export default alertDismissal
