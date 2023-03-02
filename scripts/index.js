// Редактирование профиля
let editButton = document.querySelector('.profile__edit-button');
let popupEditProfile = document.querySelector('.popup_type_editProfile');
let popupCloseEdit = popupEditProfile.querySelector('.popup__close');
let formElementEdit = popupEditProfile.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let nameInput = popupEditProfile.querySelector('.popup__text_type_name');
let jobInput = popupEditProfile.querySelector('.popup__text_type_profession');
// Создание карточек
const createButton = document.querySelector('.profile__add-button');
const popupCreateCard = document.querySelector('.popup_type_createCard');
const popupCloseCreate = popupCreateCard.querySelector('.popup__close');
const formElementCreate = popupCreateCard.querySelector('.popup__form');
const cardName = popupCreateCard.querySelector('.popup__text_type_name-card');
const cardLink = popupCreateCard.querySelector('.popup__text_type_link-card');

const popupCloseFoto = document.querySelector('.popup-foto__close');

//Добавление карточек
const sectionElements = document.querySelector('.elements');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
function addCard(card) {
	const newCard = document.querySelector('.cardTemplate').content.cloneNode(true);
	const cardImage = newCard.querySelector('.element__image');
	cardImage.setAttribute('src', card.link);
	const cardHeading = newCard.querySelector('.element__title');
	cardHeading.textContent = card.name;
	sectionElements.prepend(newCard);
}
initialCards.forEach(addCard);

// Редактирование профиля
function popupOpenedEdit(){
	popupEditProfile.classList.add('popup_opened');
	nameInput.value = profileName.textContent;
	jobInput.value = profileProfession.textContent;
}

function popupClosedEdit(){
	popupEditProfile.classList.remove('popup_opened');
}

function handleFormEditSubmit(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileProfession.textContent = jobInput.value;
	popupClosedEdit();
}

formElementEdit.addEventListener('submit', handleFormEditSubmit);
popupCloseEdit.addEventListener('click', popupClosedEdit);
editButton.addEventListener('click', popupOpenedEdit);

// Создание карточек
function popupOpenedCreate(){
	popupCreateCard.classList.add('popup_opened');
}
function popupClosedCreate(){
	popupCreateCard.classList.remove('popup_opened');
}
function handleFormCreateSubmit(evt) {
	evt.preventDefault();
	const createCard = document.querySelector('.cardTemplate').content.cloneNode(true);
	const cardCreateImage = createCard.querySelector('.element__image');
	cardCreateImage.setAttribute('src', cardLink.value);
	const cardHeading = createCard.querySelector('.element__title');
	cardHeading.textContent = cardName.value;
	sectionElements.prepend(createCard);
	cardLink.value = '';
	cardName.value = '';
	popupClosedCreate();
	const buttonElementDelete= document.querySelectorAll('.element__delete');
	buttonElementDelete.forEach(function(evt){
		evt.addEventListener('click', deleteCard)
	})
	const likeCardButton = document.querySelectorAll('.element__like-button');
	likeCardButton.forEach(function(evt){
	evt.addEventListener('click', clickedLike)
})

const imageCard = document.querySelectorAll('.element__image');
imageCard.forEach(function(evt){
	evt.addEventListener('click', clickedImage)
})


}

formElementCreate.addEventListener('submit', handleFormCreateSubmit);
popupCloseCreate.addEventListener('click', popupClosedCreate);
createButton.addEventListener('click', popupOpenedCreate);

function deleteCard(event){
	const button = event.target.closest('.element').remove();
}
const buttonElementDelete = document.querySelectorAll('.element__delete');
buttonElementDelete.forEach(function(evt){
	evt.addEventListener('click', deleteCard)
})

function clickedLike(event){
	const button = event.target.classList.toggle('element__like-button_active');
}
const likeCardButton = document.querySelectorAll('.element__like-button');
likeCardButton.forEach(function(evt){
	evt.addEventListener('click', clickedLike)
})

// попап с картинкой
function clickedImage(event){
	const popupOpenImage = document.querySelector('.popup-foto_type_foto');
	popupOpenImage.classList.add('popup_opened');
	const popupImage = document.querySelector('.popup-foto__image')
	popupImage.setAttribute('src', event.target.getAttribute('src')) ;
	const parentImage =  event.target.parentNode;
	popupOpenImage.querySelector('.popup-foto__image-name').textContent = parentImage.querySelector('.element__title').textContent;

	popupCloseFoto.addEventListener('click', function(){
		popupOpenImage.classList.remove('popup_opened')
	});
}
const imageCard = document.querySelectorAll('.element__image');
imageCard.forEach(function(evt){
	evt.addEventListener('click', clickedImage)
})
