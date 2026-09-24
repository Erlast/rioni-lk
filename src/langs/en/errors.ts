export const errors = {
  pdfGenerateError: 'PDF generate error',
  pdfNotAvailableForDownload: 'Not available for share. PDF will be downloaded.',
  downloadError: 'Share error',
  session: {
    lost: {
      message: 'Session error.',
      description: 'Failed to refresh the session. Please try again later.',
      ps: 'Error.'
    }
  },
  errorHandler: {
    fallback: {
      message: 'Something went wrong',
      description: 'Please try again later'
    },
    network: {
      message: 'No connection to server',
      description: 'Check your internet connection'
    },
    auth: {
      message: 'Authorization error',
      description: 'Failed to confirm session'
    },
    validation: {
      message: 'Request error',
      description: 'Check your input data'
    },
    server: {
      message: 'Server error',
      description: 'Server is temporarily unavailable'
    },
    client: {
      message: 'Something went wrong',
      description: 'Please try again later'
    },
    critical: {
      message: 'Critical error',
      description: 'Please reload the page'
    },
    warning: {
      message: 'Warning',
      description: 'Action not completed'
    },
    info: {
      message: 'Info',
      description: ''
    }
  },
  focusTesting: {
    message: 'Testing error.',
    description: 'Failed to perform the test.'
  },
  errorTemporaryUnavailable: {
    message: 'Something went wrong. Please try again later',
    description: 'Unavailable'
  }
};
