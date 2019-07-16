const keys = require('../../config/keys');

module.exports = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align:center;">
          <h3>I'd like your inpuy!</h3>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.REDIRECT_DOMAIN}">Yes</a>
          </div>
          <div>
            <a href="${keys.REDIRECT_DOMAIN}">No</a>
          </div>
        </div>
      </body>
    </html>
  `
}