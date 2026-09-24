export const errors = {
  pdfGenerateError: 'Ошибка при генерации PDF',
  pdfNotAvailableForDownload: 'Поделиться файлом невозможно. PDF будет скачан.',
  downloadError: 'Не удалось поделиться файлом',
  session: {
    lost: {
      message: 'Ошибка сессии.',
      description: 'Не удалось обновить сессию. Повторите поптыку позже.',
      ps: 'Ошибка.'
    }
  },
  errorHandler: {
    fallback: {
      message: 'Что-то пошло не так',
      description: 'Попробуйте повторить позже'
    },
    network: {
      message: 'Нет соединения с сервером',
      description: 'Проверьте подключение к интернету'
    },
    auth: {
      message: 'Ошибка авторизации',
      description: 'Не удалось подтвердить сессию'
    },
    validation: {
      message: 'Ошибка запроса',
      description: 'Проверьте корректность данных'
    },
    server: {
      message: 'Ошибка сервера',
      description: 'Сервер временно недоступен'
    },
    client: {
      message: 'Что-то пошло не так',
      description: 'Попробуйте повторить позже'
    },
    critical: {
      message: 'Критическая ошибка',
      description: 'Перезагрузите страницу'
    },
    warning: {
      message: 'Внимание',
      description: 'Действие не выполнено'
    },
    info: {
      message: 'Информация',
      description: ''
    }
  },
  focusTesting: {
    message: 'Ошибка тестирования.',
    description: 'Не удалось провести тестирование.'
  },
  errorTemporaryUnavailable: {
    message: 'Что-то пошло не так',
    description: 'Временно недоступно'
  }
};
