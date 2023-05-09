export class Api {
	constructor(options){
		this._baseUrl = options.baseUrl;
		this.headers = options.headers;
	}
	getUserInformation(){
		return fetch(`${this._baseUrl}users/me`, {
			headers: this.headers
		})
		.then(this._checkResponse)
	}

	getInitialCards(){
		return fetch(`${this._baseUrl}cards`, {
			headers: this.headers
		})
		.then(this._checkResponse)

	}

	editProfileData(newName, newAbout){
		return fetch(`${this._baseUrl}users/me`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				name: newName,
				about: newAbout
			})
		})
		.then(this._checkResponse)
	}
	
	addNewCard(newData){
		return fetch(`${this._baseUrl}cards`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				name: newData.name,
				link: newData.link
			})
		})
		.then(this._checkResponse)
	}
	deleteMyCard(cardId){
		return fetch(`${this._baseUrl}cards/${cardId}`, {
			method: 'DELETE',
			headers: this.headers
		})
		.then(this._checkResponse)
	}

	putLikeCard(cardId){
		return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
			method: 'PUT',
			headers: this.headers
		})
		.then(this._checkResponse)
	}

	deleteLikeCard(cardId){
		return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: this.headers
		})
		.then(this._checkResponse)
	}

	updateAvatar(avatarLink){
		return fetch(`${this._baseUrl}users/me/avatar`, {
			 method: 'PATCH',
			 headers: this.headers,
			 body: JSON.stringify({
				avatar : avatarLink
			})
		 })
		 .then(this._checkResponse)
	 }

	 _checkResponse(res){
		if(res.ok){
			return res.json()
			}else{return Promise.reject(res.status)}
	 }
}