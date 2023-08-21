export default interface IOtp<T> {
    userId: T;
    type: string;
    otp: string;
    otpExpiration: Date;
}