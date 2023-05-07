export const editButton = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('.popup_type_editProfile');
export const formEditProfile = document.forms['editProfile'];
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');
export const profileAvatar = document.querySelector('.profile__avatar-image');
export const editButtonProfileAvatar = document.querySelector('.profile__avatar-editImage');
export const nameInput = popupEditProfile.querySelector('.popup__text_type_name');
export const jobInput = popupEditProfile.querySelector('.popup__text_type_profession');
export const createButton = document.querySelector('.profile__add-button');
export const popupCreateCard = document.querySelector('.popup_type_createCard');
export const formElementCreate = document.forms['createProfile'];
export const formElementAvatar = document.forms['newAvatar'];
export const deleteCardButton = document.forms['deleteCard'];
export const popupImage = document.querySelector('.popup-foto__image');
export const popupOpenImage = document.querySelector('.popup-foto_type_foto');
export const popups = document.querySelectorAll('.popup');
export const cardsContainer = document.querySelector('.elements');
export const data = {
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: '.popup__span_type_',
	errorClass: 'popup__text_error',
	inputSelector: '.popup__text'
}







// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];