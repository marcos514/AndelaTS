export default class Logger {
    namespace: string;
    constructor(_namespace: string) {
        this.namespace = _namespace;
    }
    public info(message: string, object?: any): void {
        this.logging('INFO', message, object);
    }
    public warn(message: string, object?: any): void {
        this.logging('WARN', message, object);
    }
    public error(message: string, object?: any): void {
        this.logging('ERROR', message, object);
    }
    public debug(message: string, object?: any): void {
        this.logging('DEBUG', message, object);
    }
    private logging(logType: string, message: string, object?: any): void {
        if (object) {
            console.info(`[${getTimeStamp()}] [${logType}] [${this.namespace}] ${message}`, object);
        } else {
            console.info(`[${getTimeStamp()}] [${logType}] [${this.namespace}] ${message}`);
        }
    }
}

const getTimeStamp = (): string => {
    return new Date().toISOString();
};
