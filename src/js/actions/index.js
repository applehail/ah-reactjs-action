export const sendForm = values => ({type: 'SEND_FORM', values})
export const formSendedOk = values => ({type: 'SENDED_OK', values})
export const formSendedError = values => ({type: 'SENDED_ERROR', values})

export const FormStatuses = {
  SHOW_FORM: 'show-form',
  SEND_FORM: 'send-form',
  SENDED_OK: 'send-ok',
  SENDED_ERROR: 'send-error'
}

