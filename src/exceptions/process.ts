// import { errorHandler } from './exceptions/ErrorHandler';
import { errorHandler } from './errorHandler';
import { exitHandler } from '../exceptions/exitHandler';
// import { exitHandler } from './ExitHandler';


process.on('beforeExit', (code: number) => {
    console.log(`Process beforeExit event with code ${code}`);
    exitHandler.handleExit(1);
});


process.on('unhandledRejection', (reason: Error | any) => {
    console.log(`Unhandled Rejection: ${reason.message || reason}`);

    throw new Error(reason.message || reason);
});

process.on('uncaughtException', (error: Error) => {
    console.log(`Uncaught Exception: ${error.message}`);

    errorHandler.handleError(error);
});

process.on('SIGTERM', () => {
    console.log(`Process ${process.pid} received SIGTERM: Exiting with code 0`);
    exitHandler.handleExit(0);
});

process.on('SIGINT', () => {
    console.log(`Process ${process.pid} received SIGINT: Exiting with code 0`);
    exitHandler.handleExit(0);
});