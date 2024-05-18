"use strict";

const workoutScheduleData = [
   {
      "id": 1,
      "name": "Стретчинг",
      "time": "8:00 - 09:30",
      "maxParticipants": 10,
      "currentParticipants": 3
   },
   {
      "id": 2,
      "name": "Пилатес",
      "time": "11:30 - 12:30",
      "maxParticipants": 10,
      "currentParticipants": 5
   },
   {
      "id": 3,
      "name": "Кроссфит",
      "time": "13:00 - 14:00",
      "maxParticipants": 14,
      "currentParticipants": 13
   },
   {
      "id": 4,
      "name": "Боди балет",
      "time": "16:00 - 17:30",
      "maxParticipants": 12,
      "currentParticipants": 6
   },
   {
      
      "id": 5,
      "name": "Бокс",
      "time": "16:00 - 17:00",
      "maxParticipants": 8,
      "currentParticipants": 8
   },
   {
      "id": 6,
      "name": "Йога",
      "time": "10:00 - 11:00",
      "maxParticipants": 15,
      "currentParticipants": 7
   }
];
// переводим данные в JSON формат
const workoutScheduleJSON = JSON.stringify(workoutScheduleData);

//задаем ключ для localStorage
const localStorageKey  = "workout";
//получаем данные по ключу из localStorage)
const data = localStorage.getItem(localStorageKey);
// проверяем наличие данныех в localStorage, если их еще нет, записываем 
if (!data) {
 localStorage.setItem(localStorageKey, workoutScheduleJSON);
}
// основная секция в HTML  файле, куда будут помещены данные покаждому занятию
const mainSection = document.querySelector(".sections");
const modal = document.querySelector(".modal_result");
// парсим данные из localStorage в массив объектов
const workoutSchedule = JSON.parse(localStorage.getItem(localStorageKey));

//создаем с помощью функции div-ы с данными о занятии согласно постевленным в задаче условиям
workoutSchedule.forEach(element => {
    const scheduleItem = createSchedule(element.name, element.time, element.maxParticipants, element.currentParticipants, element.id);
    mainSection.append(scheduleItem);
});

//функция создания элементов html, и отработки нажатия кнопок, изменение данныех в localStorage
function createSchedule( name, time, maxParticipants, currentParticipants, id){

   
    const workoutInfoItem = document.createElement("div"); //блок, в который помещается нужная информация по каждому занятию: itemTitle, workoutTime, recordBtn, canselBtn, maxMembers, currentMembers
    workoutInfoItem.classList.add("workout-list");
   
    //срздание и заполнение элементов , вложенных в workoutInfoItem
    const itemTitle = document.createElement("h3");
    itemTitle.textContent = name;
    itemTitle.classList.add("mt-5");

    const workoutTime = document.createElement("p");
    workoutTime.textContent = time;

    const recordBtn = document.createElement("button");
    recordBtn.textContent = "Записаться";
    recordBtn.classList.add("btn", "btn-warning");

    const canselBtn = document.createElement("button");
    canselBtn.textContent = "Отменить запись";
    canselBtn.classList.add("btn", "btn-danger");
    canselBtn.disabled = true;

    const maxMembers = document.createElement("p");
    maxMembers.textContent = "Максимальное количество мест: " + `${maxParticipants}`;
    maxMembers.classList.add("mt-2", "max__count");

    const currentMembers = document.createElement("p");
    currentMembers.textContent = "Количество записавшихся участников: " + `${currentParticipants}`;
    currentMembers.classList.add("current__count");

   
    const resultMessage = document.createElement("div");
   //  modal.append(resultMessage);
   resultMessage.classList.add("hidden", "modal_result");


// заполнение workoutInfoItem
    workoutInfoItem.appendChild(itemTitle);
    workoutInfoItem.appendChild(workoutTime);
    workoutInfoItem.appendChild(recordBtn);
    workoutInfoItem.appendChild(canselBtn);
    workoutInfoItem.appendChild(maxMembers);
    workoutInfoItem.appendChild(currentMembers);
    workoutInfoItem.appendChild(resultMessage);

    let recordExist = false; //проверка есть ли уже запись
    const currentIndex = id -1; //получаем индекс элемента

    // убираем сообщение пользователю
    function returnHidden() {
      setTimeout(() => {
         resultMessage.classList.toggle('hidden');
      }, 1000);
    }

//слушатель событий на кнопку записи
    recordBtn.addEventListener("click", function (e) { 
        if (currentParticipants === maxParticipants) {
            recordBtn.disabled = true;
            resultMessage.classList.toggle('hidden');
            resultMessage.textContent = "к сожалению, мест нет"
            returnHidden();
        } else {currentMembers.textContent = "Количество записавшихся участников: " + `${currentParticipants += 1}`;
            workoutSchedule[currentIndex].currentParticipants += 1;
            localStorage.setItem(localStorageKey, JSON.stringify(workoutSchedule));
            recordExist = true;
            resultMessage.classList.toggle('hidden');
            resultMessage.textContent = "Вы успешно записались на тренировку"
            returnHidden();
            recordBtn.disabled = true;
            canselBtn.disabled = false;
      }
    })

//слушатель событий на кнопку отмены
    canselBtn.addEventListener("click",  function (e) {
        if (recordExist = true) {
            resultMessage.classList.toggle('hidden');
            resultMessage.textContent = "Запись отменена"
            returnHidden();
            currentMembers.textContent = "Количество записавшихся участников: " + `${currentParticipants -= 1}`;
         }
         workoutSchedule[currentIndex].currentParticipants -= 1;
         localStorage.setItem(localStorageKey, JSON.stringify(workoutSchedule));
         recordBtn.disabled = false;
         canselBtn.disabled = true;
    })
//возвращаем сформированный элемент
    return workoutInfoItem;
}

