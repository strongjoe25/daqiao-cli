import logSymbols from "log-symbols"

export const log = {
    success: (message:string) => {
        return console.log(logSymbols.success, message)
    },
    info: (message:string) => {
        return console.log(logSymbols.info, message)
    },
    warn: (message:string) => {
        return console.log(logSymbols.warning, message)
    },
    error: (message:string) => {
        return console.log(logSymbols.error, message)
    },
}