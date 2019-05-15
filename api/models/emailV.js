module.exports = {

    attributes: {
        
        mailmd5: {
          type: 'string',
          required: true,
          unique: true
        },
        email: {
          type: 'email'
        }
    }
};