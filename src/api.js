
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

    changeLikeProductStatus(productId, like) {
        return fetch(`${this.#baseurl}/products/likes/${productId}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: this.#headers,
        })
            .then(this.#onResponse)
    }
    
}

const api = new Api({
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'Content-Type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI5MWMiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ5LCJleHAiOjE3MTAzMzg0NDl9.dvWkHpISMy3ox6hb58sbRlPZ61ceeAPeqshkZQwxgGQ'
    },
})

export default api;   




  
   

