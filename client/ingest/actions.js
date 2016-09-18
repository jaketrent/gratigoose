import types from 'redux-types'

import * as alertsUtils from '../alerts/utils'

export const TYPES = types('ingest',
  'UPLOAD',
  'UPLOAD_SUCCESS',
  'UPLOAD_ERROR'
)

export function upload(args) {
  return {
    ...args,
    type: TYPES.UPLOAD
  }
}

export function uploadSuccess(transs) {
  return {
    type: TYPES.UPLOAD_SUCCESS,
    transs,
    alerts: [alertsUtils.createSuccess('Upload complete')]
  }
}

export function uploadError(errors) {
  return {
    type: TYPES.UPLOAD_ERROR,
    alerts: alertsUtils.createFromErrors(errors)
  }
}
