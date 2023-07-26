

export const sendToken = (user: any, statusCode: number, res: any): void => {

    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    })
}