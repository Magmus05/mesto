export class UserInfo {
  constructor(nameSelector, professionSelector, avatarSelector){
		this._nameSelector = nameSelector;
		this._professionSelector = professionSelector;
		this._avatarSelector = avatarSelector;
		this._profileName = document.querySelector(this._nameSelector);
		this._profileProfession = document.querySelector(this._professionSelector);
		this._avatar = document.querySelector(this._avatarSelector);
	}
	getUserInfo(){
		return {
			name: this._profileName.textContent,
			profession: this._profileProfession.textContent,
			avatar: this._avatar.textContent
		}
	}
	setUserInfo(newProfile){
		this._profileName.textContent = newProfile.name;
		this._profileProfession.textContent = newProfile.about;
		this.id = newProfile._id;
		this._avatar.src = newProfile.avatar;
	}
	getUserID(){
		return this.id;
	}
}