
class Api {
    #baseurl;
    #headers;
    constructor({ baseUrl, headers}) {
        this.#baseurl = baseUrl;
        this.#headers = headers;
       
    }

    #onResponse(res) {
        return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
    }

    getPostList() {
        return fetch(`${this.#baseurl}/posts`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getUserInfo(userid, token) {
        console.log(token)
        return fetch(`${this.#baseurl}/users/${userid}`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: token, 
                },
        })
            .then(this.#onResponse)
    }

    setUserInfo(data, token) {
        console.log(token)
        return fetch(`${this.#baseurl}/users/me`, {
            method: 'PATCH',
            headers: {
                    'Content-Type': 'application/json',
                    authorization: token, 
                    },
            body: JSON.stringify(data)
        })
            .then(this.#onResponse)
    }

    setUserNewPost(data, token) {
        return fetch(`${this.#baseurl}/v2/group-11/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: token, 
                },
            body: JSON.stringify(data)
        })
            .then(this.#onResponse)
    }
    
}

const api = new Api({
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'Content-Type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI4ZTQiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ2LCJleHAiOjE3MTAzMzg0NDZ9.BSjB0YkM8SKyUHfrK25KEHQsmBpJi8zCuhddzkP4eT8'
    },
})

export default api;   




  
   

