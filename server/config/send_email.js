const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2; 

const create_transporter = async () => {
    const oauth2_client = new OAuth2(
        process.env.OAUTH_CLIENTID,
        process.env.OAUTH_CLIENT_SECRET,
        process.env.REDIRECT_URI
      );
      
      const gmail_scopes = [
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/gmail.modify',
        'https://www.googleapis.com/auth/gmail.compose',
        'https://www.googleapis.com/auth/gmail.send',
    ];
    
    // Generate a url that asks permissions for the Drive activity scope
     authorizationUrl = oauth2_client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        /** Pass in the scopes array defined above.
         * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
        scope: gmail_scopes,
        // Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes: true
     });
     

      oauth2_client.setCredentials({
          refresh_token: process.env.OAUTH_REFRESH_TOKEN
      });

      const access_token = await new Promise((resolve, reject) => {
          oauth2_client.getAccessToken((err, token) => {
              if(err){
                  reject('Couldnt retrieve access token' + err.message);
              }
              resolve(token);
          });
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            access_token,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            expires: Number.parseInt(process.env.OAUTH_EXPIRES, 10),
            scope: gmail_scopes
    
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    transporter.on('token', token => {
        console.log('A new access token has been generated');
        console.log('User: %s', token.user);
        console.log('Access token: %s', token.accessToken);
        console.log('Expires: %s', new Date(token.expires));

    })
    transporter.verify((err, success) => {
    err
      ? console.log(err)
      : console.log(`=== Server is ready to take messages: ${success} ===`);
   });
    return transporter;
      
};

exports.send_email = async (email_options) => {
    let email_transporter = await create_transporter();
    await email_transporter.sendMail(email_options);
}