import {openClickedPicture} from './index.js';
export class Cards {
  constructor(link, name, templateSelector){
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }
  // функция создания карточки
    _getTemplate() {
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
      return cardElement;
    }
    createCard() {
      this._newCard = this._getTemplate();
      this._cardImage = this._newCard.querySelector('.element__image');
      this._cardImage.setAttribute('src', this._link);
      this._cardImage.setAttribute('alt', `Фотография: ${this._name}.`);
      const cardHeading = this._newCard.querySelector('.element__title');
      cardHeading.textContent = this._name;
      this._setEventListener();
      return this._newCard;
    }

    _setEventListener(){
      this._newCard.querySelector('.element__like-button').addEventListener('click', function (evt){ 
        evt.target.classList.toggle('element__like-button_active');
      });

      this._newCard.querySelector('.element__delete').addEventListener('click', function (evt){ 
        evt.target.closest('.element').remove();
      });

      this._cardImage.addEventListener('click', () =>{openClickedPicture(this._name, this._link)});
    }
}