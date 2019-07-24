export interface ILogger {
  log?: Function
  warn?: Function
  error?: Function
  info?: Function
}

export let logger: ILogger = console

export const setLogger = (
  _logger: ILogger
) => {
  if (!_logger.log) {
    _logger.log = () => {}
  }

  if (!_logger.warn) {
    _logger.warn = () => {}
  }

  if (!_logger.error) {
    _logger.error = () => {}
  }

  if (!_logger.info) {
    _logger.info = () => {}
  }

  logger = _logger
}