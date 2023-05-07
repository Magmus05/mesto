export class Card {
  constructor(item, templateSelector, openClickedPicture, popupDelete, putLikeCard, deleteLikeCard){
    this.item = item;
    this._name = item.name;
    this._link = item.link;
    this._likeCount = item.likes.length;
    this._isLike = item.likes
    this.owner_id = item.owner._id;
    this._templateSelector = templateSelector;
    this.openPic = openClickedPicture;
    this._popupDelete = popupDelete;
    this._putLikeCard = putLikeCard;
    this._deleteLikeCard = deleteLikeCard;

  }
    _getTemplate() {
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
      return cardElement;
    }
    createNewCard() {
      this._newCard = this._getTemplate();
      this._cardImage = this._newCard.querySelector('.element__image');
      this._likeButton = this._newCard.querySelector('.element__like-button');
      this._isLike.forEach(item=>{
        if(item._id === '70b70b8feea62dd20261e71b'){
          this._likeButton.classList.add('element__like-button_active')
        }
      })
      this.likeElement = this._newCard.querySelector('.element__like-count');
      this.likeElement.textContent = this._likeCount;
      if(this.owner_id === '70b70b8feea62dd20261e71b') {
        this._deleteButton = this._newCard.querySelector('.element__delete');
        this._deleteButton.classList.remove('element__delete_disabled')
        this._setEventListenerDelete();
      }
      this._cardImage.setAttribute('src', this._link);
      this._cardImage.setAttribute('alt', `Фотография: ${this._name}.`);
      const cardHeading = this._newCard.querySelector('.element__title');
      cardHeading.textContent = this._name;
      this._setEventListener();
      return this._newCard;
    }
    _handleLikeClick(){
      if (this._likeButton.classList.contains('element__like-button_active')){this._deleteLikeCard(this.item._id, this.likeElement)} 
      else{this._putLikeCard(this.item._id, this.likeElement)}
      this._likeButton.classList.toggle('element__like-button_active');
    }
    // _handleDeleteClick(){
    //   this._newCard.remove();
    //   this._newCard = null;
    // }
    _setEventListener(){
      this._likeButton.addEventListener('click', ()=> this._handleLikeClick());
      this._cardImage.addEventListener('click', () =>{this.openPic(this._name, this._link)});
    }
    _setEventListenerDelete(){
        this._deleteButton.addEventListener('click', ()=> {
          this._popupDelete(this.item._id, this._newCard)
        });

    }
}