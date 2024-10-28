import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const baseUrl = 'https://con-bcrcx-caio.zendesk.com/api/v2/guide/theming/jobs/themes/imports';
const credentials = btoa(`caio.lopes@bcrcx.com/token:d1kSny145GQsPaTd6AaoFTOjWQC7fzVPTv20rD4F`);
const brandID = '17919875784987';
const filePath = './template-pandora.zip';

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
        const storageParameters = response.data.job.data.upload.parameters;

        console.log(jobId + ' ' + storageUrl + ' ' + storageParameters);

        await uploadFile(storageUrl, storageParameters, filePath);

    } catch (error) {
        console.log(error.message);
    }
}

const uploadFile = async (storageUrl, storageParams, filePath) => {
    try {
        const form = new FormData();

        for (let [key, value] of Object.entries(storageParams)) {
            form.append(key, value);
        }

        form.append('file', fs.createReadStream(filePath), 'theme.zip');

        await axios.post(storageUrl, form, {
            headers: {
                ...form.getHeaders(),
            }
        });

        console.log('Upload concluído');

    } catch (error) {
        console.log(error.message);
    }
}

postNewTheme();