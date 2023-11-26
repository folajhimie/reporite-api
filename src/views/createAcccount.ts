const createAccount = function (otp: string, sendOtpLink: string, userFirstName: string, userLastName: string) {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title></title>
            <link rel="stylesheet" href="css/style.css" />
        </head>

        <body>
            <div style="margin: 0 10px; padding: 0; background-color: #eff1ff">
            <table
                role="presentation"
                style="background-color: #eff1ff"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
            >
                <tbody>
                <tr>
                    <td class="m_-1149667885954612149data-container">
                    <table
                        role="presentation"
                        style="background-color: #eff1ff"
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        align="center"
                    >
                        <tbody>
                        <tr>
                            <td>
                            <table
                                class="m_-1149667885954612149row-content m_-1149667885954612149stack"
                                role="presentation"
                                style="
                                border-bottom: 1px solid transparent;
                                border-left: 1px solid transparent;
                                border-right: 1px solid transparent;
                                border-top: 1px solid transparent;
                                color: #333;
                                border-radius: 0;
                                width: 690px;
                                background-color: #fff;
                                border-top-width: 0;
                                border-right-width: 0;
                                border-bottom-width: 0;
                                border-left-width: 0;
                                "
                                width="690"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                                align="center"
                            >
                                <tbody style="background-color: #fff">
                                <tr style="background-color: #fff">
                                    <td
                                    class="m_-1149667885954612149column m_-1149667885954612149column-1"
                                    style="
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        padding-top: 0;
                                        padding-bottom: 0;
                                        border-top: 0;
                                        border-right: 0;
                                        border-bottom: 0;
                                        border-left: 0;
                                        background-color: #fff;
                                    "
                                    width="100%"
                                    >
                                    <table
                                        class="m_-1149667885954612149image_block m_-1149667885954612149block-1"
                                        role="presentation"
                                        style="background-color: #fff"
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                    >
                                        <tbody>
                                        <tr>
                                            <td
                                            class="m_-1149667885954612149pad"
                                            style="
                                                width: 100%;
                                                padding-right: 0;
                                                padding-left: 0;
                                                background-color: #eff1ff;
                                            "
                                            >
                                            <div
                                                style="
                                                line-height: 10px;
                                                background-color: #eff1ff;
                                                "
                                                align="center"
                                            >
                                                <a
                                                href="https://u14804762.ct.sendgrid.net/ls/click?upn=MVG8cHcVtJ9rW2eOKDlPEpzteEOU-2FDjO2evoxIUUI8s-3DpmcR_HPANJZtfk6Ma-2BSenNeySjaBZYo1GQ1QXRFyP18HGQdeHtRemdjWZpSRkhTLh7DoHXbgbOLlnDCNEYlsX-2B2f3PhcmYjxx9sGo5mhgkYdw-2FMBYbxdrsXoQw-2B1d7kyyAphRH9e4EpJHjh2wMrsT4Gd7aKxxpwkGcza-2Fh4qzUi7kMALnnBAykX-2B9KG8MD8-2BvjpEgQWoa5IkFnpQjlBiGWzwslM30oiFs9GY7slbUc2EOJA0-3D"
                                                style="outline: 0"
                                                target="_blank"
                                                data-saferedirecturl="https://www.google.com/url?q=https://u14804762.ct.sendgrid.net/ls/click?upn%3DMVG8cHcVtJ9rW2eOKDlPEpzteEOU-2FDjO2evoxIUUI8s-3DpmcR_HPANJZtfk6Ma-2BSenNeySjaBZYo1GQ1QXRFyP18HGQdeHtRemdjWZpSRkhTLh7DoHXbgbOLlnDCNEYlsX-2B2f3PhcmYjxx9sGo5mhgkYdw-2FMBYbxdrsXoQw-2B1d7kyyAphRH9e4EpJHjh2wMrsT4Gd7aKxxpwkGcza-2Fh4qzUi7kMALnnBAykX-2B9KG8MD8-2BvjpEgQWoa5IkFnpQjlBiGWzwslM30oiFs9GY7slbUc2EOJA0-3D&amp;source=gmail&amp;ust=1677011089418000&amp;usg=AOvVaw39aS7VAB0iAucNfGnA-b9u"
                                                ><img
                                                    class="m_-1149667885954612149big CToWUd"
                                                    src="https://ci4.googleusercontent.com/proxy/sg0v84zojSK1FZ2GEe1Dy85JPZ0Br2Rh3zQ1DWwirLNI4M8j4abvszhunTVDQA-xfiBh1g6d-zRvZQakgxvMOe8Kb5W909rv3bbw0XhhyWzkAnRAg2_1oZdmCk63r2B6iEySx_jpFDK5EkVad2zESj3kzqA5h6E4niJYQykUA8J1EX16Q1aq0zt6aHow2Rg5saaFhKkxE3BkLAcAevSvaQ-A3zkOOGjQQn6dRbzb2HzXdeo=s0-d-e1-ft#https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/669d5713-9b6a-46bb-bd7e-c542cff6dd6a/32f86b400f4f4d10a86c7dc94431c679/kuda-logo-email-banner.png"
                                                    style="
                                                    display: block;
                                                    height: auto;
                                                    border: 0;
                                                    width: 588px;
                                                    max-width: 100%;
                                                    "
                                                    title="Kuda Logo-purple"
                                                    data-bit="iit"
                                                    width="588"
                                                /></a>
                                            </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table
                        role="presentation"
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        align="center"
                    >
                        <tbody>
                        <tr>
                            <td>
                            <table
                                class="m_-1149667885954612149row-content m_-1149667885954612149stack"
                                role="presentation"
                                style="color: #333; width: 690px"
                                width="690"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                                align="center"
                            >
                                <tbody>
                                <tr>
                                    <td
                                    class="m_-1149667885954612149column m_-1149667885954612149column-1"
                                    style="
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        padding-top: 30px;
                                        padding-bottom: 0;
                                        border-top: 0;
                                        border-right: 0;
                                        border-bottom: 0;
                                        border-left: 0;
                                        background-color: #fff;
                                    "
                                    width="100%"
                                    >
                                    <table
                                        class="m_-1149667885954612149text_block m_-1149667885954612149block-1"
                                        role="presentation"
                                        style="word-break: break-word"
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                    >
                                        <tbody>
                                        <tr>
                                            <td
                                            class="m_-1149667885954612149pad"
                                            style="
                                                padding-left: 10px;
                                                padding-right: 10px;
                                                padding-top: 10px;
                                                background-color: #fff;
                                            "
                                            >
                                            <div>
                                                <div
                                                style="
                                                    color: #40196d;
                                                    line-height: 1.2;
                                                    background-color: #fff;
                                                "
                                                >
                                                <p
                                                    style="
                                                    margin: 0;
                                                    text-align: center;
                                                    "
                                                ></p>
                                                <h1
                                                    class="m_-1149667885954612149txt-center m_-1149667885954612149heading"
                                                    style="
                                                    font-size: 28px;
                                                    margin-top: 0;
                                                    font-weight: 830;
                                                    color: #0d084d;
                                                    text-align: center;
                                                    font-family: Mulish, sans-serif;
                                                    "
                                                >
                                                    Welcome On Board
                                                </h1>
                                                <p></p>
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table
                                        class="m_-1149667885954612149text_block"
                                        role="presentation"
                                        style="word-break: break-word"
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="30"
                                        border="0"
                                    >
                                        <tbody>
                                        <tr>
                                            <td
                                            class="m_-1149667885954612149pad"
                                            style="background-color: #fff"
                                            >
                                            <div style="font-family: sans-serif">
                                                <div
                                                style="
                                                    background-color: #fff;
                                                    font-size: 12px;
                                                    font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                    color: #000;
                                                    line-height: 1.2;
                                                    box-sizing: border-box;
                                                "
                                                >
                                                <p
                                                    style="
                                                    background-color: #fff;
                                                    margin: 0;
                                                    height: auto;
                                                    font-family: Mulish, sans-serif;
                                                    font-size: 14px;
                                                    "
                                                    >
                                                        
                                                        <h2 style="font-size: 16px; font-weight: 500; line-height: 1.5;">Dear ${userFirstName} ${userLastName}!</h2>
                                                        <p style="font-size: 16px; font-weight: 500; line-height: 1.5;">Congratulations on creating an account with us! We are delighted to have you as a new member of our community. To ensure the security of your account, we have generated a unique security code for you.</p>
                                                        <p style="font-size: 16px; font-weight: 500; line-height: 1.5;">This is your New security code <b>${otp}</b>.</p>
                                                        <p style="font-size: 16px; font-weight: 500; line-height: 1.5;">Please keep this code safe and do not share it with anyone, This code will be required to verify your account. To verify your account, please click on the link below and enter your security code when prompted:</p>
                                                        <p style="font-size: 16px; font-weight: 500; line-height: 1.5;">Press this Link to verify your account <a href=${sendOtpLink}>Press here</a></p>
                                            
                                                        <p style="font-size: 16px; font-weight: 500; line-height: 1.5;">If you have any questions or need assistance, please don't hesitate to reach out to our support team. We are here to help! Thank you again for choosing to be a part of our platform. We look forward to serving you.</p>
                                                        
                                                        <p style="font-size: 1rem; font-weight: 500;">Best regards,</p>  
                                                        <p style="font-size: 1rem; font-weight: 500;">The CarTtel Team</p>
                                                        
                                                        <div
                                                        style="height: 40px; background-color: gainsboro; width: 100%; margin-top: 10px; margin-bottom: 20px;"
                                                        ></div>
                                                </p>
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    
                    <table
                        role="presentation"
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        align="center"
                    >
                        <tbody>
                        <tr>
                            <td>
                            <table
                                class="m_-1149667885954612149row-content m_-1149667885954612149stack"
                                role="presentation"
                                style="color: #333; width: 690px"
                                width="690"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                                align="center"
                            >
                                <tbody>
                                <tr>
                                    <td
                                    class="m_-1149667885954612149column m_-1149667885954612149column-1"
                                    style="
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        padding-top: 0px;
                                        padding-bottom: 25px;
                                        border-top: 0;
                                        border-right: 0;
                                        border-bottom: 0;
                                        border-left: 0;
                                        background-color: #fff;
                                    "
                                    width="100%"
                                    >
                                    <table
                                        class="m_-1149667885954612149text_block m_-1149667885954612149block-1"
                                        role="presentation"
                                        style="word-break: break-word"
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="30"
                                        border="0"
                                    >
                                        <tbody>
                                        <tr>
                                            <td
                                            class="m_-1149667885954612149pad m_-1149667885954612149copyright"
                                            style="margin-top: 0"
                                            >
                                            <div>
                                                <div
                                                class="m_-1149667885954612149icons"
                                                style="
                                                    padding-top: 41.6px;
                                                    margin-bottom: 16px;
                                                    border-top: 1px solid #e3e3e3;
                                                "
                                                >
                                                <a
                                                    class="m_-1149667885954612149icon-link"
                                                    href="https://u14804762.ct.sendgrid.net/ls/click?upn=MVG8cHcVtJ9rW2eOKDlPEkK9T-2FaCDpXRSn8STpsqB0vM7LKPSUDx8owNsCj3-2Fzwhnp88_HPANJZtfk6Ma-2BSenNeySjaBZYo1GQ1QXRFyP18HGQdeHtRemdjWZpSRkhTLh7DoHXbgbOLlnDCNEYlsX-2B2f3PnlJQPPmJnI5u2m16NxMPwdOHCnZbn1maUGlilALlP0QcEPS09dhNRvLi5P4fmJn-2BuUpLKr6cfoBvEUIrOPXHirqxbRGyGvUBE48HNyqRXWPlePqCuryrPHdm4F3n3mV5Rt1SlObFmegzryzyZcPE44-3D"
                                                    style="
                                                    display: inline-block;
                                                    width: 27px;
                                                    height: 27px;
                                                    text-decoration: none;
                                                    margin-right: 6.4px;
                                                    "
                                                    target="_blank"
                                                    data-saferedirecturl="https://www.google.com/url?q=https://u14804762.ct.sendgrid.net/ls/click?upn%3DMVG8cHcVtJ9rW2eOKDlPEkK9T-2FaCDpXRSn8STpsqB0vM7LKPSUDx8owNsCj3-2Fzwhnp88_HPANJZtfk6Ma-2BSenNeySjaBZYo1GQ1QXRFyP18HGQdeHtRemdjWZpSRkhTLh7DoHXbgbOLlnDCNEYlsX-2B2f3PnlJQPPmJnI5u2m16NxMPwdOHCnZbn1maUGlilALlP0QcEPS09dhNRvLi5P4fmJn-2BuUpLKr6cfoBvEUIrOPXHirqxbRGyGvUBE48HNyqRXWPlePqCuryrPHdm4F3n3mV5Rt1SlObFmegzryzyZcPE44-3D&amp;source=gmail&amp;ust=1677011089419000&amp;usg=AOvVaw0P0vo9GDtPjqBEwxkBlcqH"
                                                    ><img
                                                    src="https://ci3.googleusercontent.com/proxy/GoP0zoWPN8xc6asaSrYDjhf_6DkLA-wb4Gnzg8pFVyl1wdO54Ja87mXI3sLhuRfqXJ8H_V1X_32gs37asKXuqBdkx7M=s0-d-e1-ft#https://d38v990enafbk6.cloudfront.net/twitter.png"
                                                    alt="Twitter"
                                                    style="
                                                        display: block;
                                                        width: 100%;
                                                    "
                                                    class="CToWUd"
                                                    data-bit="iit" /></a
                                                ><a
                                                    class="m_-1149667885954612149icon-link"
                                                    href="https://u14804762.ct.sendgrid.net/ls/click?upn=MVG8cHcVtJ9rW2eOKDlPEj2qpLGzsRc1glv2iwuHwnT3KBpgzn5G1x9I3q7YcgL-2F3R5Y_HPANJZtfk6Ma-2BSenNeySjaBZYo1GQ1QXRFyP18HGQdeHtRemdjWZpSRkhTLh7DoHXbgbOLlnDCNEYlsX-2B2f3PuNTfckUgI8N8m-2B0Zdw0xA-2BTom-2FHLI1xIqnLSN9LSq45rNw3PK9Us-2B-2BSAVged3PqnCrlirG6tVgpXTROuLlN8iOs-2Flt6WtroOEyJh7L7eTuKN10-2FhX5uZeYf7z1lLTU-2B341WeWymB2QAEL1NyvBPdEo-3D"
                                                    style="
                                                    display: inline-block;
                                                    width: 27px;
                                                    height: 27px;
                                                    text-decoration: none;
                                                    margin-right: 6.4px;
                                                    "
                                                    target="_blank"
                                                    data-saferedirecturl="https://www.google.com/url?q=https://u14804762.ct.sendgrid.net/ls/click?upn%3DMVG8cHcVtJ9rW2eOKDlPEj2qpLGzsRc1glv2iwuHwnT3KBpgzn5G1x9I3q7YcgL-2F3R5Y_HPANJZtfk6Ma-2BSenNeySjaBZYo1GQ1QXRFyP18HGQdeHtRemdjWZpSRkhTLh7DoHXbgbOLlnDCNEYlsX-2B2f3PuNTfckUgI8N8m-2B0Zdw0xA-2BTom-2FHLI1xIqnLSN9LSq45rNw3PK9Us-2B-2BSAVged3PqnCrlirG6tVgpXTROuLlN8iOs-2Flt6WtroOEyJh7L7eTuKN10-2FhX5uZeYf7z1lLTU-2B341WeWymB2QAEL1NyvBPdEo-3D&amp;source=gmail&amp;ust=1677011089419000&amp;usg=AOvVaw2df-V5w9bV6F7IeZcdKTlx"
                                                    ><img
                                                    src="https://ci5.googleusercontent.com/proxy/3r2y7dmFsfCFIlHXuM076CWtdmFs_LO7fzK3WJ3Jx3N75bL1KeuSl7F_ocpEM40SWQTYEGcVPSPpVXKNzZFtiIEvD5KEKQ=s0-d-e1-ft#https://d38v990enafbk6.cloudfront.net/Instagram.png"
                                                    alt="Instagram"
                                                    style="
                                                        display: block;
                                                        width: 100%;
                                                    "
                                                    class="CToWUd"
                                                    data-bit="iit" /></a
                                                ><a
                                                    class="m_-1149667885954612149icon-link"
                                                    href="https://u14804762.ct.sendgrid.net/ls/click?upn=MVG8cHcVtJ9rW2eOKDlPEu3pgnu8uV-2Fa2xGyju-2BALGskOwLvYe4Yv7EbqBzJO9-2BRN4eiFoDYYmtOEw871DFWqg-3D-3DexMt_HPANJZtfk6Ma-2BSenNeySjaBZYo1GQ1QXRFyP18HGQdeHtRemdjWZpSRkhTLh7DoHXbgbOLlnDCNEYlsX-2B2f3Psd7866ew80ozVYkgYdf3kuIr0ivmU9Y0D35FcGoA-2F85NXyS-2FXZ4QlPJzLZRwrwoQ7VYxmMY4n-2Fm4OfdfXjwB6TNiDCIg-2BDoJk-2BFmtaThC5NMYicyp-2B6mekXVTAmSxsw4ERR9mr8q7J-2FoVlLh0FiPs4-3D"
                                                    style="
                                                    display: inline-block;
                                                    width: 27px;
                                                    height: 27px;
                                                    text-decoration: none;
                                                    margin-right: 6.4px;
                                                    "
                                                    target="_blank"
                                                    data-saferedirecturl="https://www.google.com/url?q=https://u14804762.ct.sendgrid.net/ls/click?upn%3DMVG8cHcVtJ9rW2eOKDlPEu3pgnu8uV-2Fa2xGyju-2BALGskOwLvYe4Yv7EbqBzJO9-2BRN4eiFoDYYmtOEw871DFWqg-3D-3DexMt_HPANJZtfk6Ma-2BSenNeySjaBZYo1GQ1QXRFyP18HGQdeHtRemdjWZpSRkhTLh7DoHXbgbOLlnDCNEYlsX-2B2f3Psd7866ew80ozVYkgYdf3kuIr0ivmU9Y0D35FcGoA-2F85NXyS-2FXZ4QlPJzLZRwrwoQ7VYxmMY4n-2Fm4OfdfXjwB6TNiDCIg-2BDoJk-2BFmtaThC5NMYicyp-2B6mekXVTAmSxsw4ERR9mr8q7J-2FoVlLh0FiPs4-3D&amp;source=gmail&amp;ust=1677011089419000&amp;usg=AOvVaw3vyms3-hYb3K3PcKv5nzlP"
                                                    ><img
                                                    src="https://ci4.googleusercontent.com/proxy/pT6EmDtclf7jg9HhKSdhbJ-OX1_DrJlYZ6eMVzoIXGoxIqbFBbdWFhTZisYbhcR6zeQTnk9tqsAlhBtILOcHrUlZb7i4=s0-d-e1-ft#https://d38v990enafbk6.cloudfront.net/linkedin.png"
                                                    alt="Linkedin"
                                                    style="
                                                        display: block;
                                                        width: 100%;
                                                    "
                                                    class="CToWUd"
                                                    data-bit="iit" /></a
                                                ><a
                                                    class="m_-1149667885954612149icon-link"
                                                    href="https://u14804762.ct.sendgrid.net/ls/click?upn=MVG8cHcVtJ9rW2eOKDlPEjXun5zG0wJ2PJ9BhSBIjbFjNi91vV81oKTMgzKYIVAB-K0K_HPANJZtfk6Ma-2BSenNeySjaBZYo1GQ1QXRFyP18HGQdeHtRemdjWZpSRkhTLh7DoHXbgbOLlnDCNEYlsX-2B2f3Pv1-2BpTqcUQP1Hp8nPBl1c4L0mRpVnZzxzF-2F5saPSrXjx8Rdk7jnawuYOIrXwHnnYi5vz8CwfsYVsXO3Xuih3MOTUGkv6n-2BNXCeErZhLk46s64-2FxXwHz9htdiMSe9fCbO7l-2BUSw-2BF0by2ndFuTpiix3Q-3D"
                                                    style="
                                                    display: inline-block;
                                                    width: 27px;
                                                    height: 27px;
                                                    text-decoration: none;
                                                    margin-right: 6.4px;
                                                    "
                                                    target="_blank"
                                                    data-saferedirecturl="https://www.google.com/url?q=https://u14804762.ct.sendgrid.net/ls/click?upn%3DMVG8cHcVtJ9rW2eOKDlPEjXun5zG0wJ2PJ9BhSBIjbFjNi91vV81oKTMgzKYIVAB-K0K_HPANJZtfk6Ma-2BSenNeySjaBZYo1GQ1QXRFyP18HGQdeHtRemdjWZpSRkhTLh7DoHXbgbOLlnDCNEYlsX-2B2f3Pv1-2BpTqcUQP1Hp8nPBl1c4L0mRpVnZzxzF-2F5saPSrXjx8Rdk7jnawuYOIrXwHnnYi5vz8CwfsYVsXO3Xuih3MOTUGkv6n-2BNXCeErZhLk46s64-2FxXwHz9htdiMSe9fCbO7l-2BUSw-2BF0by2ndFuTpiix3Q-3D&amp;source=gmail&amp;ust=1677011089419000&amp;usg=AOvVaw0VJvBNiEXGE7FqfMlf-JaD"
                                                    ><img
                                                    src="https://ci4.googleusercontent.com/proxy/v7cUxADBOApsObUCldXuJx0ENs1fKDIRBSo-BVf6OTy0RvMlL5x9r3Fh6CwObuq_DkB12o8IltX8zVO9TSpXvl9Ytw=s0-d-e1-ft#https://d38v990enafbk6.cloudfront.net/medium.png"
                                                    alt="Medium"
                                                    style="
                                                        display: block;
                                                        width: 100%;
                                                    "
                                                    class="CToWUd"
                                                    data-bit="iit"
                                                /></a>
                                                </div>
                                                <div
                                                class="m_-1149667885954612149p-wrap"
                                                style="
                                                    color: #979797;
                                                    line-height: 1.2;
                                                    font-family: 'Mulish, sans-serif';
                                                "
                                                >
                                                <p
                                                    style="
                                                    margin: 0;
                                                    font-family: Mulish, sans-serif;
                                                    "
                                                >
                                                    <span style="line-height: 1.6"
                                                    >© 2023 Kuda Technologies Ltd
                                                    (Company No. 11472232). All rights
                                                    reserved.</span
                                                    >
                                                </p>
                                                <p
                                                    style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: center;
                                                    "
                                                >
                                                    &nbsp;
                                                </p>
                                                <p
                                                    style="
                                                    margin: 0;
                                                    font-family: Mulish, sans-serif;
                                                    "
                                                >
                                                    <span style="line-height: 1.6"
                                                    >If you would like to find out
                                                    more about which Kuda Technologies
                                                    entity you receive services from,
                                                    please reach out to us via the
                                                    in-app chat in the Kuda app.</span
                                                    >
                                                </p>
                                                <p
                                                    style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: center;
                                                    "
                                                >
                                                    &nbsp;
                                                </p>
                                                <p
                                                    style="
                                                    margin: 0;
                                                    font-family: Mulish, sans-serif;
                                                    "
                                                >
                                                    <span style="line-height: 1.6"
                                                    >Nigerian banking services offered
                                                    by Kuda Microfinance Bank
                                                    (RC796975) with registered address
                                                    at 151 - Herbert Macaulay Way,
                                                    Yaba, Lagos, Nigeria. Kuda
                                                    Microfinance Bank is licensed by
                                                    the Central Bank of Nigeria. All
                                                    Deposits are insured by the
                                                    Nigerian Deposit Insurance
                                                    Corporation (NDIC).</span
                                                    >
                                                </p>
                                                <p
                                                    style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: center;
                                                    "
                                                >
                                                    &nbsp;
                                                </p>
                                                <p
                                                    style="
                                                    margin: 0;
                                                    font-family: Mulish, sans-serif;
                                                    "
                                                >
                                                    <span style="line-height: 1.6"
                                                    >UK payments services are offered
                                                    by Kuda EMI Ltd (Company No.
                                                    13724208) with registered address
                                                    at 5 New Street Square, London,
                                                    EC4A 3TW, United Kingdom. Kuda EMI
                                                    Ltd is appointed representative of
                                                    Modulr FS Limited. Modulr FS
                                                    Limited (Company No 09897919), is
                                                    regulated by the Financial Conduct
                                                    Authority for issuance of
                                                    electronic money under reference
                                                    900573.</span
                                                    >
                                                </p>
                                                
                                                <p
                                                    class="m_-1149667885954612149p-logo"
                                                    style="padding-top: 25px"
                                                >
                                                    <img
                                                    src="https://ci4.googleusercontent.com/proxy/bH5aDbauSwuodyp7QXlFdT5FjiZkkvJEC-wt9zFaBBEJ5J505DnjUOlJ-YmbB5_AY0NYd_LXpH6JAVIRTO6nNag1qBt-ouYLGy00Sf9rB8VqGnID5vroh9xL1rkNaY6x__fcuhTAJEpV1NZVvwyxZygknxc=s0-d-e1-ft#https://res.cloudinary.com/kuda-freshdesk-icons/image/upload/v1665156001/isrfh3ttuh3yb6riedsp.png"
                                                    alt="Kuda logo"
                                                    title="Kuda logo"
                                                    style="
                                                        display: block;
                                                        width: 20%;
                                                        min-width: 80px;
                                                    "
                                                    class="CToWUd"
                                                    data-bit="iit"
                                                    />
                                                </p>
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table
                        role="presentation"
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        align="center"
                    >
                        <tbody>
                        <tr>
                            <td>
                            <table
                                class="m_-1149667885954612149row-content m_-1149667885954612149stack"
                                role="presentation"
                                style="border-radius: 0; color: #000; width: 590px"
                                width="590"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                                align="center"
                            >
                                <tbody>
                                <tr>
                                    <td
                                    class="m_-1149667885954612149column m_-1149667885954612149column-1"
                                    style="
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        padding-top: 5px;
                                        padding-bottom: 5px;
                                        border-top: 0;
                                        border-right: 0;
                                        border-bottom: 0;
                                        border-left: 0;
                                    "
                                    width="100%"
                                    >
                                    <table
                                        class="m_-1149667885954612149block-1"
                                        role="presentation"
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                    >
                                        <tbody>
                                        <tr>
                                            <td
                                            class="m_-1149667885954612149pad"
                                            style="background-color: #fff"
                                            >
                                            <div></div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </td>
                </tr>
                </tbody>
            </table>
            <img
                src="https://ci5.googleusercontent.com/proxy/H7XDimMNp5Ho9rApdpyckPGrjxLDKVNjBQ1O3Hg3oN_6s1fy2CGCrIUy3ihh7pCgAU0s2ZfNYvGkTNgOpnEK-RWImfgc6TeLA2QkGz2U7gdHYSpkAziwZnbrwLnqpEzFERIzFeo5Ug23iW9dz7cG-VQ5MCXQwQ8TVFRw9-qjKTnwMmtHRPqt0lweFSmskBQUmHfRDLei4ERTNHIX-ipwPnjF2SZV_ldQ2VXheQe7ZYwKM8dBUVnjifr4HxtUH-qBZBTK8dUbMLaLTXTnVs4siWpAfkO4knJPkCYqT6hU-YgzXLVWJ6XrNMKRAZCYLEeA2fro3UIwqghC6d3iQDDeXDGG-kKrvOCLoNEd7MZzcklZiwh95tDBD_X5jVV-IRGAKqswkjA9oz63f5LqEB_DJs7Z8fbi7tz4=s0-d-e1-ft#https://u14804762.ct.sendgrid.net/wf/open?upn=xc-2BjCwNx8xZVz89rjjryEDlUMcmzjh2PflnpUXNXyhmUsdDMDPqpUlHXO6WjvjJPBgyUfsOd40SyFGMHcg29n-2FvniQ3nwoJPLs-2FCqdsIbjWRI9jDzXJ4PSEONhLjJ-2ByhkRNtCyj1vGcR4zHYYqYl5aW7N8T6dzoXu821pOlASLXLj3VAEWxBZekDGwXigGV1oD0D8Kf0IhQEhpmYk2ll7hUtTTufeOT2YTpDcZZ41x4-3D"
                alt=""
                style="
                height: 1px !important;
                width: 1px !important;
                border-width: 0 !important;
                margin-top: 0 !important;
                margin-bottom: 0 !important;
                margin-right: 0 !important;
                margin-left: 0 !important;
                padding-top: 0 !important;
                padding-bottom: 0 !important;
                padding-right: 0 !important;
                padding-left: 0 !important;
                "
                class="CToWUd"
                data-bit="iit"
                width="1"
                height="1"
                border="0"
            />
            </div>
        </body>
        </html>

    `;
    const text = `
          Verify Email, A request to create your node-typescript-boilerplate account was received.
          Use this OTP to confirm your account and log in`;
    return {
        html: html,
        text: text,
    };
};

export default createAccount;
