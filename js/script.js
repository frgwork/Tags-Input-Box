const ul = document.querySelector('ul'),
   input = ul.querySelector('input'),
   countNunb = document.querySelector('.details span');

let maxTags = 10,
   tags = [];

countTag();

function countTag() {
   input.focus();
   countNunb.innerHTML = maxTags - tags.length; //subtracting max value with tags length (вычитание максимального значения с длиной тегов)
}

function createTag() {
   ul.querySelectorAll('li').forEach(li => li.remove()); // removing all li tags before adding so there will be no duplicate tag (удаление всех тегов li перед добавлением, чтобы не было дубликатов тегов)
   tags.slice().reverse().forEach(tag => {
      let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="remove(this, '${tag}')"></i></li>`;
      ul.insertAdjacentHTML('afterbegin', liTag); // inserting or adding li inside ul tag (вставка или добавление li внутри тега ul)
   });
   countTag();
}

function remove(element, tag) {
   let index = tags.indexOf(tag); // getting removing tag index (получение индекса удаления тегов)
   tags = [...tags.slice(0, index), ...tags.slice(index + 1)]; // removing or excluding selected tag from an array (удаление или исключение выбранного тега из массива)
   element.parentElement.remove(); // removing li of removed tag (удаление li удаленной метки)
   countTag();
}

function addTag(e) {
   if (e.key == 'Enter') {
      let tag = e.target.value.replace(/\s+/g, ' '); // removing unwanted spaces from user tag (удаление ненужных пробелов из тега пользователя)

      if (tag.length > 1 && !tags.includes(tag)) { // if tag lenght is greater than 1 and the tag isn't exist already (если длина тега больше 1 и тег еще не существует)
         if (tags.length < 10) {
            tag.split(',').forEach(tag => { // splitting each tag from comma (,) (разделение каждого тега с запятой (,))
               tags.push(tag); // adding each tag inside array (добавление каждого тега внутри массива)
               createTag();
            });
         }
      }
      e.target.value = '';
   }
}

input.addEventListener('keyup', addTag)

const removeBtn = document.querySelector('button');
removeBtn.addEventListener('click', () => {
   tags.length = 0; // making array empty (сделать массив пустым)
   ul.querySelectorAll('li').forEach(li => li.remove()); // removing all li tags (удаление всех тегов li)
   countTag();
})