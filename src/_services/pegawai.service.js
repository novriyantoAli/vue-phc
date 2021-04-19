import { handleResponse, requestOptions } from '@/_helpers';

export const pegawaiService = {
    getAll,
    getByNIK
};

function getAll() {
    return fetch(`http://localhost:3000/api/pegawai`, requestOptions.get())
        .then(handleResponse);
}

function getByNIK(nik) {
    return fetch(`http://localhost:3000/api/pegawai?nik=${nik}`, requestOptions.get())
        .then(handleResponse); 
}