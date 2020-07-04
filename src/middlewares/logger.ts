
class Logger {
  private classLogger : string

  constructor (className:string) {
    this.classLogger = className
  }

  public logError (error: string): void {
    try {
      const splited = error.toString().split('\n')
      // console.log(logWithTag("ERRO", "Line: " + error.line + " -> " + splited[0] + " in " + splited[1]));
      this.logWithTag('ERRO', splited[0], true)
      console.error(error)
    } catch (error) {
      console.error('[HARD ERROR]', this.classLogger, '-> Erro ao tentar gerar o log:', error)
    }
  }

  public log (tag:string, message:string): void {
    this.logWithTag(tag, message, false)
  }

  public logInfo (message : string): void {
    this.logWithTag('INFO', message, false)
  }

  private logWithTag (tag: string, message: string, error : boolean): void {
    if (!error) {
      console.info('[' + tag + ']', this.classLogger, '-> message:', message)
    } else {
      console.error('[' + tag + ']', this.classLogger, '-> message:', message)
    }
  }
}

export default Logger
