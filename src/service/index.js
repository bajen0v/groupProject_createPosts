import {postData} from '../posts';


const service = {
    getData: ({from, to}) => {
        return new Promise((resolve, reject) => {
            
            const data = postData.slice(from, to);

            resolve({
                count: postData.length,
                data: data
            })
        })
    }
}

export default service;