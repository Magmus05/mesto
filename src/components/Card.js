export class Card {
  constructor(item, templateSelector, openClickedPicture){
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this.openPic = openClickedPicture
  }
    _getTemplate() {
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
      return cardElement;
    }
    createNewCard() {
      this._newCard = this._getTemplate();
      this._cardImage = this._newCard.querySelector('.element__image');
      this._likeButton = this._newCard.querySelector('.element__like-button');
      this._deleteButton = this._newCard.querySelector('.element__delete');
      this._cardImage.setAttribute('src', this._link);
      this._cardImage.setAttribute('alt', `Фотография: ${this._name}.`);
      const cardHeading = this._newCard.querySelector('.element__title');
      cardHeading.textContent = this._name;
      this._setEventListener();
      return this._newCard;
    }
    _handleLikeClick(){
      this._likeButton.classList.toggle('element__like-button_active');
    }
    _handleDeleteClick(){
      this._newCard.remove();
      this._newCard = null;
    }
    _setEventListener(){
      this._likeButton.addEventListener('click', ()=> this._handleLikeClick());

      this._deleteButton.addEventListener('click', ()=> this._handleDeleteClick());

      this._cardImage.addEventListener('click', () =>{this.openPic(this._name, this._link)});
    }
}