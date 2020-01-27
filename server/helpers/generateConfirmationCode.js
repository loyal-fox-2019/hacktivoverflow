const generateConfirmationCode = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 15; i++) {
        result += characters.charAt(Math.floor(Math.random() * 15));
    }
    return result;
};

module.exports = generateConfirmationCode;