interface IUser {
    username: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    roles?: string[];
}

export const validateUser = (user: IUser): string | null => {
    if (!user.username.match(/^[a-zA-Z ]*$/)) {
        return "Invalid username Entered";
    }

    if (!user.email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
        return "Invalid email Entered";
    }

    if (!user.phone.match(/^[0-9]{11}$/)) {
        return "Your Mobile Number isn't 11 Digits";
    }

    if (user.password.length < 8) {
        return "Password is too Short";
    }

    return null; // No validation errors
};


