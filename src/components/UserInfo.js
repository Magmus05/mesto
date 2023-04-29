export class UserInfo {
  constructor(nameSelector, professionSelector){
		this._nameSelector = nameSelector;
		this._professionSelector = professionSelector;
		this._profileName = document.querySelector(this._nameSelector);
		this._profileProfession = document.querySelector(this._professionSelector);
	}
	getUserInfo(){
		return {name: this._profileName.textContent, profession: this._profileProfession.textContent}

	}
	setUserInfo(newName, newProfession){
		this._profileName.textContent = newName;
		this._profileProfession.textContent = newProfession;
	}
}