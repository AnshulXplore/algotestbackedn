
function otpTemplate(name, registrationTime) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New User Registration Alert</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #F5F5F5;
                color: #083938;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 30px auto;
                background-color: #FFFFFF;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .logo {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
                background-color: #E4FEEC;
            }
            .logo img {
                max-width: 150px;
                height: auto;
            }
            .header {
                background-color: #2FAB73;
                color: #FFFFFF;
                padding: 20px;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
            }
            .content {
                padding: 20px;
            }
            .footer {
                background-color: #1C3B35;
                color: #FFFFFF;
                padding: 10px;
                text-align: center;
                font-size: 12px;
            }
            .alert-box {
                background-color: #E4FEEC;
                color: #239C55;
                padding: 15px;
                border-left: 6px solid #2FAB73;
                border-radius: 5px;
                margin-bottom: 20px;
                font-size: 16px;
            }
            .info-line {
                font-size: 18px;
                color: #555;
                margin: 10px 0;
            }
            .bold {
                font-weight: bold;
                color: #083938;
            }
            .button {
                background-color: #2FAB73;
                color: #FFFFFF;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
                margin-top: 20px;
                transition: background-color 0.3s;
            }
            .button:hover {
                background-color: #239C55;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <img src="https://th.bing.com/th?id=OIP.U8GTY4DMP3xJosY-IyCeIwHaEc&w=322&h=193&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="Company Logo" />
            </div>
            <div class="header">
                New User Registration Alert
            </div>
            <div class="content">
                <h2>Dear Admin,</h2>
                <div class="alert-box">
                    <h3>A new user has registered on <b>Arthlab-algoTest</b>!</h3>
                    <p class="info-line">Name: <span class="bold">${name}</span></p>
                    <p class="info-line">Registration Time: <span class="bold">${registrationTime}</span></p>
                </div>
                <p>If this registration looks suspicious or was not intended, please take immediate action. Otherwise, feel free to welcome the user to our platform.</p>
                <p>To view more details or manage the user, click the button below:</p>
                <a href="https://bizvaarta.com" class="button">View Dashboard</a>
            </div>
            <div class="footer">
                <p>© 2024 Arthlab-algoTest. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

module.exports =  otpTemplate ;
