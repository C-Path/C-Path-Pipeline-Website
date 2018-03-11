<template>
    <input type="file" v-on:change="onFileChange">
</template>

<script>
/* eslint-disable no-console */

import { Upload } from 'tus-js-client';

export default {
    data() {
        return {
            loggedIn: localStorage.getItem('token') != null,
        }
    },
    methods: {
        onFileChange(e) {
            const files = e.target.files;

            if (!files) return;

            for (let i = 0; i < files.length; i += 1) {
                const upload = new Upload(files[i], {
                    endpoint: './api/files/',
                    retryDelays: [0, 1000, 3000, 5000],
                    onError(error) {
                        console.log(`Failed because: ${error}`);
                    },
                    onProgress(bytesUploaded, bytesTotal) {
                        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
                        console.log(bytesUploaded, bytesTotal, `${percentage}%`);
                    },
                    onSuccess() {
                        console.log(`Download ${upload.file.name} from ${upload.url}`);
                    },
                });
                upload.start();
            }
        },
    },
};
</script>
