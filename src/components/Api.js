export class Api {
	constructor(options){
		this._options = options;
	}
	getUserInformation(){
		return fetch('https://mesto.nomoreparties.co/v1/cohort-65/users/me', {
			headers: {
				authorization: '01c577aa-8668-46fe-928c-79fc4aa9c83a'
			}
		})
		.then(res => {if(res.ok){
			return res.json()
			}else{return Promise.reject(res.status)}
			})
		.catch((err)=> console.log(err))
	}

	getInitialCards(){
		return fetch('https://mesto.nomoreparties.co/v1/cohort-65/cards', {
			headers: {
				authorization: '01c577aa-8668-46fe-928c-79fc4aa9c83a'
			}
		})
		.then(res => {if(res.ok){
			return res.json()
			}else{return Promise.reject(res.status)}
			})
		.catch((err)=> console.log(err))
	}

	editProfileData(newName, newAbout){
		return fetch('https://mesto.nomoreparties.co/v1/cohort-65/users/me', {
			method: 'PATCH',
			headers: {
				authorization: '01c577aa-8668-46fe-928c-79fc4aa9c83a',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: newName,
				about: newAbout
			})
		})
		.then(res => {if(res.ok){
			return res.json()
			}else{return Promise.reject(res.status)}
			})
		.catch((err)=> console.log(err))
	}
	
	addNewCard(newData){
		return fetch('https://mesto.nomoreparties.co/v1/cohort-65/cards', {
			method: 'POST',
			headers: {
				authorization: '01c577aa-8668-46fe-928c-79fc4aa9c83a',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: newData.name,
				link: newData.link
			})
		})
		.then(res => {if(res.ok){
			return res.json()
			}else{return Promise.reject(res.status)}
			})
		.catch((err)=> console.log(err))
	}
	deleteMyCard(cardId){
		return fetch(`https://mesto.nomoreparties.co/v1/cohort-65/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: '01c577aa-8668-46fe-928c-79fc4aa9c83a',
				'Content-Type': 'application/json'
			}
		})
		.then(res => {if(res.ok){
			return res.json()
			}else{return Promise.reject(res.status)}
			})
			// .then(res=>{console.log(res)})
		.catch((err)=> console.log(err))
	}

	putLikeCard(cardId){
		return fetch(`https://mesto.nomoreparties.co/v1/cohort-65/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: {
				authorization: '01c577aa-8668-46fe-928c-79fc4aa9c83a',
				'Content-Type': 'application/json'
			}
		})
		.then(res => {if(res.ok){
			return res.json()
			}else{return Promise.reject(res.status)}
			})
			//.then(res=>{console.log(res)})
		.catch((err)=> console.log(err))
	}

	deleteLikeCard(cardId){
		return fetch(`https://mesto.nomoreparties.co/v1/cohort-65/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: {
				authorization: '01c577aa-8668-46fe-928c-79fc4aa9c83a',
				'Content-Type': 'application/json'
			}
		})
		.then(res => {if(res.ok){
			return res.json()
			}else{return Promise.reject(res.status)}
			})
			// .then(res=>{console.log(res)})
		.catch((err)=> console.log(err))
	}

	updateAvatar(avatarLink){
		return fetch('https://mesto.nomoreparties.co/v1/cohort-65/users/me/avatar', {
			 method: 'PATCH',
			 headers: {
				 authorization: '01c577aa-8668-46fe-928c-79fc4aa9c83a',
				 'Content-Type': 'application/json'
			 },
			 body: JSON.stringify({
				avatar : avatarLink
			})
		 })
		 .then(res => {if(res.ok){
			 return res.json()
			 }else{return Promise.reject(res.status)}
			 })
		 .catch((err)=> console.log(err))
	 }

}