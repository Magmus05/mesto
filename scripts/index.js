let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let likeButton = document.querySelector('.element__like-button');
console.log(likeButton);

function popupOpened(){
	popup.classList.add('popup_opened');
	let profileName = document.querySelector('.profile__name'); // эти переменные тоже нужно вынести наверх? на мой взгляд, они нам не нужны до открытия окна
	let profileProfession = document.querySelector('.profile__profession');
	let popupButtonSave = document.querySelector('.popup__button');
	let nameInput = document.querySelector('.popup__text_type_name');
	let jobInput = document.querySelector('.popup__text_type_profession');
	nameInput.value = profileName.textContent;
	jobInput.value = profileProfession.textContent;
	
	function popupClosed(){
		popup.classList.remove('popup_opened');
	}

	function saveValue() {
		profileName.textContent = nameInput.value;
		profileProfession.textContent = jobInput.value;
		popupClosed();
	}

	popupButtonSave.addEventListener('click', saveValue); // возможно событие submit нужно слушать в следующих спринтах, когда эти данные у нас будут в отдельном файле или на сервере, потому как тут при этом событии форма перезагружается и редактированое имя теряется, если я не прав распишите пожалуйста подробней что требуется.
	popupClose.addEventListener('click', popupClosed);
}
function likeButtonActivate(){  // полный функционал, я так понимаю, тоже в следующем спринте, сейчас только возможность закрашивания.
	let likeButtonActive = document.querySelector('.element__like-button_active');
	if(likeButtonActive === null){
		likeButton.classList.add('element__like-button_active');
	} else{
			likeButtonActive.classList.remove('element__like-button_active');
		}
	}

likeButton.addEventListener('click', likeButtonActivate);
editButton.addEventListener('click', popupOpened);
