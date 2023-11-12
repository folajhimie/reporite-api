
// ROLE ENUMS
export enum RoleType {
    Owner = "Owner",
    Manager = "Manager",
    Admin = "Admin",
    Accountant = "Accountant",
    User = "User"
}

//USER ACCOUNT STATUS ENUMS
export enum AccountStatus {
    ACTIVE = 'activate',
    DEACTIVE = 'deactivate'
}

//OTP SEND TYPE ENUMS
export enum OtpType {
    CREATED = 'created',
    FORGET = 'forget',
    VERIFICATION = 'verification',
    CONFIRM = 'confirm'
}