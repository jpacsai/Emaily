const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
  const invalidEmails = emails.split(',').reduce((total, email) => {
    const trimmedEmail = email.trim();
    // if trimmed email string is empty or if it passes validation do not add error
    return !trimmedEmail || regEx.test(trimmedEmail) ? total : [...total, trimmedEmail];
  }, []);

  if (invalidEmails.length > 0) {
    return `These emails are invalid: ${invalidEmails}`;
  }
}