const departmentUserAdd = function (resetPasswordUrl: string, firstname: string, departmentName: string) {
  const html = `
    <!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <title>Reset your Password</title>
  <link
    href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700"
    rel="stylesheet" media="screen">
  <style>
    .hover-underline:hover {
      text-decoration: underline !important;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes ping {

      75%,
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }

    @keyframes pulse {
      50% {
        opacity: .5;
      }
    }

    @keyframes bounce {

      0%,
      100% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }

      50% {
        transform: none;
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
    }

    @media (max-width: 600px) {
      .sm-px-24 {
        padding-left: 24px !important;
        padding-right: 24px !important;
      }

      .sm-py-32 {
        padding-top: 32px !important;
        padding-bottom: 32px !important;
      }

      .sm-w-full {
        width: 100% !important;
      }
    }
  </style>
</head>

<body
  style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; --bg-opacity: 1; background-color: #eceff1;">
  <div style="display: none;"> You are invited to the ${departmentName} Department on CIVIX. </div>
  <div role="article" aria-roledescription="email" aria-label="Reset your Password" lang="en">
    <table style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%"
      cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center"
          style="--bg-opacity: 1; background-color: #eceff1; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
          <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;" width="600"
            cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td class="sm-py-32 sm-px-24"
                style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; padding: 48px; text-align: center;"
                align="center">
                <a href="">
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
                <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0"
                  cellspacing="0" role="presentation">
                  <tr>
                  <td class="sm-px-24"
                  style="--bg-opacity: 1; background-color: #ffffff; border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262;"
                  align="left">
                  
                      <p style="font-weight: 600; font-size: 18px; margin-bottom: 10px; margin-top: 10px">Hey ${firstname},</p>

                      <p style="margin: 0 0 4px;">
                        You have been added to the CIVIX digital signage dashboard for ${departmentName}.
                      </p>
                      <p style="margin: 0 0 24px;">
                        Please click on the link or button below to continue your registration process.
                      </p>
                      
                      <a href="${resetPasswordUrl}"
                        style="display: block; font-size: 14px; line-height: 100%; margin-bottom: 24px; --text-opacity: 1; color: #7367f0; text-decoration: none;">${resetPasswordUrl}</a>
                      <table style="font-family: 'Montserrat',Arial,sans-serif;" cellpadding="0" cellspacing="0"
                        role="presentation">
                        <tr>
                          <td
                            style="mso-padding-alt: 16px 24px; --bg-opacity: 1; background-color: #5a39a2;  border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                            <a href="${resetPasswordUrl}"
                              style="display: block; font-weight: 600; font-size: 14px; line-height: 100%; padding: 16px 24px; --text-opacity: 1; color: #ffffff; text-decoration: none;"> Join Company &rarr;</a>
                          </td>
                        </tr>
                      </table>
                      <p style="margin: 20px 0 2px;">Welcome to the ${departmentName} Department. We are excited to have you onboard.</p>
                      <p style="margin: 0 0 0px;">Neon Support</p>
                      <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%"
                        cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td
                            style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                            <div style="--bg-opacity: 1; background-color: #eceff1; height: 1px; line-height: 1px;">
                              &zwnj;</div>
                          </td>
                        </tr>
                      </table>
                      <p style="margin: 0 0 16px;">
                      Have additional questions or need direct assistance? <br /> Contact our team at 
                        <a href="mailto:support@civix.com" class="hover-underline"
                          style="--text-opacity: 1; color: #7367f0; text-decoration: none;">support@civix.com</a>.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;" height="20"></td>
                  </tr>
                  <tr>
                    <td style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;" height="16"></td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>

</html>`;
  const text = `
        Reset Password, You recently requested to reset your password for your Neon account. Copy and paste the URL into your browser:
        ${resetPasswordUrl}

If you did not requested a password reset, please ignore this email or reply to let us know. This password reset is only valid for the next 2 hours.`;
  return {
    html: html,
    text: text,
  };
};

export default departmentUserAdd;
