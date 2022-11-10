// https://github.com/react-dropzone/react-dropzone
// multipart/formdata
const csvtojson = require('csvtojson');

const csv = async (req, res, next) => {
    const csvRows = await csvtojson({
        // noheader: true,
        output: 'json',
    })
    .fromString(req.body.csv.toString());

    res.status(204).send();
};

module.exports = {
    csv,
};
