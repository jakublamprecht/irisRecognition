def getMethodHandlerAndMethodParams(stepName, config):
    from const.methodsConfig import METHODS

    selectedMethod = config['method']
    methodParams = config['methodParams']

    methodHandler = METHODS[stepName][selectedMethod]

    return methodHandler, methodParams
