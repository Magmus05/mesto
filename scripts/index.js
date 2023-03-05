// Редактирование профиля
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_editProfile');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const nameInput = popupEditProfile.querySelector('.popup__text_type_name');
const jobInput = popupEditProfile.querySelector('.popup__text_type_profession');
const createButton = document.querySelector('.profile__add-button');
const popupCreateCard = document.querySelector('.popup_type_createCard');
const popupCloseCreate = popupCreateCard.querySelector('.popup__close');
const formElementCreate = popupCreateCard.querySelector('.popup__form');
const cardName = popupCreateCard.querySelector('.popup__text_type_name-card');
const cardLink = popupCreateCard.querySelector('.popup__text_type_link-card');
const popupCloseFoto = document.querySelector('.popup-foto__close');
const popupImage = document.querySelector('.popup-foto__image');
const popupOpenImage = document.querySelector('.popup-foto_type_foto');
const nameImagePopupFoto = document.querySelector('.popup-foto__image-name');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.cardTemplate').content.querySelector('.element');

function createCard(link, name) {
	const newCard = cardTemplate.cloneNode(true);
	const cardImage = newCard.querySelector('.element__image');
	cardImage.setAttribute('src', link);
	cardImage.setAttribute('alt', `Фотография: ${name}.`);
	const cardHeading = newCard.querySelector('.element__title');
	cardHeading.textContent = name;
	newCard.querySelector('.element__like-button').addEventListener('click', function (evt){ 
    evt.target.classList.toggle('element__like-button_active');
  });
	newCard.querySelector('.element__delete').addEventListener('click', function (evt){ 
    evt.target.closest('.element').remove();
  });
	
	newCard.querySelector('.element__image').addEventListener('click', () =>{openClickedPicture(name, link)})
	return newCard;
}

function openClickedPicture(name, link){
	openPopup(popupOpenImage)
	popupImage.setAttribute('src', link);
	popupImage.setAttribute('alt', `Фотография: ${name}.`);
	nameImagePopupFoto.textContent = name;
}

initialCards.forEach(card => {
	const cardFromArray = createCard(card.link, card.name);
	cardsContainer.prepend(cardFromArray);
})

function handleFormCreateSubmit (evt) {
	evt.preventDefault();
	const cardfromCreate = createCard(cardLink.value, cardName.value)
	cardsContainer.prepend(cardfromCreate);
	closePopup(popupCreateCard);
	cardName.value = '';
	cardLink.value = '';
}

function openPopupCreateCard(){ 
	openPopup(popupCreateCard);
}

formElementCreate.addEventListener('submit', handleFormCreateSubmit);
createButton.addEventListener('click', openPopupCreateCard);

document.querySelectorAll('.popup-close-button').forEach(button => {
  const buttonsPopup = button.closest('.close-popup'); // нашли родителя с нужным классом
  button.addEventListener('click', () => closePopup(buttonsPopup)); // закрыли попап
});  

function openPopup(popup){
	popup.classList.add('popup_opened');
}
function closePopup(popup){
	popup.classList.remove('popup_opened');
}

// Редактирование профиля
function openPopupdEditProfile(){
	openPopup (popupEditProfile)
	nameInput.value = profileName.textContent;
	jobInput.value = profileProfession.textContent;
}
function closePopupEditProfile(){
	closePopup (popupEditProfile);
}
function handleFormEditSubmit(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileProfession.textContent = jobInput.value;
	closePopupEditProfile();
}
formEditProfile.addEventListener('submit', handleFormEditSubmit);
editButton.addEventListener('click', openPopupdEditProfile);