export const customError = (status, message) => {
    const err = new Error()
    err.status = status
    err.massage = message
    return err
}