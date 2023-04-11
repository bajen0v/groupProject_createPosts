
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

    getLogIn(data) {
        return fetch(`${this.#baseurl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
        })
            .then(this.#onResponse).then((res) => {
                this.#headers.authorization = res.token;
                return res;
            });
    }
    

    getPostList() {
        return fetch(`${this.#baseurl}/v2/group-11/posts`, {
            headers: {...this.#headers},
        })
            .then(this.#onResponse)
    }

    getUserInfo(userid) {
        return fetch(`${this.#baseurl}/users/${userid}`, {
            headers: {...this.#headers},

        })
            .then(this.#onResponse)
    }

    setUserInfo(data) {
        return fetch(`${this.#baseurl}/users/me`, {
            method: 'PATCH',
            headers: {...this.#headers},
            body: JSON.stringify(data)
        })
            .then(this.#onResponse)
    }
    
    setUserAvatar(avatar, token) {
        return fetch(`${this.#baseurl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {...this.#headers},
            body: JSON.stringify(avatar)
        })
            .then(this.#onResponse)
    }


    setUserNewPost(data, token) {
        return fetch(`${this.#baseurl}/v2/group-11/posts`, {
            method: 'POST',
            headers: {...this.#headers},
            body: JSON.stringify(data)
        })
            .then(this.#onResponse)
    }

    deleteUserPost(postid) {
        return fetch(`${this.#baseurl}/v2/group-11/posts/${postid}`, {
            method: 'DELETE',
            headers: {...this.#headers},
        })
            .then(this.#onResponse)
    }

    changeLikePost(postID, like) {
        return fetch(`${this.#baseurl}/v2/group-11/posts/likes/${postID}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: {...this.#headers},
        })
            .then(this.#onResponse)
    }

    getPostData(id) {
        return fetch(`${this.#baseurl}/v2/group-11/posts/${id}`, {
            headers: {...this.#headers},
        })
            .then(this.#onResponse)
    }
  
}

const api = new Api({
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'Content-Type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOGFhMzk3MTIxODM4ZjI4OWMiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQzLCJleHAiOjE3MTAzMzg0NDN9.T5rcouTKS7iJ0jHu95CaH73kwUXVYG4XEvPzxUbNHOs'
    },
})

export default api;   




  
   

