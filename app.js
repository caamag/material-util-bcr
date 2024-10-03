const axios = require('axios');
//const FormData = require('FormData');

const baseUrl = 'https://con-bcrcx-caio.zendesk.com/api/v2/guide/theming/jobs/themes/imports'; 
const credentials = btoa(`caio.lopes@bcrcx.com/token:d1kSny145GQsPaTd6AaoFTOjWQC7fzVPTv20rD4F`);
const brandID = '17919875784987';
//const filePath = './template-pandora.zip';

const postNewTheme = async () => {
    try {
        const response = await axios.post(baseUrl, {
            job: {
                attributes: {
                brand_id: brandID,
                format: 'zip',
                },
            },
            }, {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json',
            },
        });

        const jobId = response.data.job.id;
        const storageUrl = response.data.job.data.upload.url;

    } catch (error) {
        console.log(error.message);
    }
}

postNewTheme()