export const errors = {
  pdfGenerateError: 'შეცდომა PDF-ის გენერაციის დროს',
  pdfNotAvailableForDownload: 'ფაილის გაზიარება შეუძლებელია. PDF გადმოიწერება.',
  downloadError: 'ფაილის გაზიარება ვერ მოხერხდა',
  session: {
    lost: {
      message: 'სესიის შეცდომა.',
      description: 'სესიის განახლება ვერ მოხერხდა. გთხოვთ სცადოთ მოგვიანებით.',
      ps: 'შეცდომა.'
    }
  },
  errorHandler: {
    fallback: {
      message: 'რაღაც შეცდომა მოხდა',
      description: 'გთხოვთ სცადოთ მოგვიანებით'
    },
    network: {
      message: 'კავშირი სერვერთან არ არის',
      description: 'შეამოწმეთ ინტერნეტ კავშირი'
    },
    auth: {
      message: 'ავტორიზაციის შეცდომა',
      description: 'სესიის დადასტურება ვერ მოხერხდა'
    },
    validation: {
      message: 'მოთხოვნის შეცდომა',
      description: 'შეამოწმეთ მონაცემების სისწორე'
    },
    server: {
      message: 'სერვერის შეცდომა',
      description: 'სერვერი დროებით მიუწვდომელია'
    },
    client: {
      message: 'რაღაც შეცდომა მოხდა',
      description: 'გთხოვთ სცადოთ მოგვიანებით'
    },
    critical: {
      message: 'კრიტიკული შეცდომა',
      description: 'გთხოვთ გადატვირთოთ გვერდი'
    },
    warning: {
      message: 'ყურადღება',
      description: 'მოქმედება ვერ შესრულდა'
    },
    info: {
      message: 'ინფორმაცია',
      description: ''
    }
  },
  focusTesting: {
    message: 'ტესტირების შეცდომა.',
    description: 'ტესტირების ჩატარება ვერ მოხერხდა.'
  },
  errorTemporaryUnavailable: {
    message: 'რაღაც შეფერხდა',
    description: 'დროებით მიუწვდომელია'
  }
};
