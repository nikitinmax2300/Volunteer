/// clicks for forms to appear
document.querySelector(".leftBtn").addEventListener("click", function() {                      
  var x = document.querySelector(".input");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
});

document.querySelector(".rightBtn").addEventListener("click", function() {
  var x = document.querySelector(".projects");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
});

// function updateBtn(event){
//   event.preventDefault();                         //// tried this

//   console.log(event.target['country'].value);
// }

// const testCountry = document.querySelector('#country').value;
// console.log(testCountry);



//PUT request onclick event

const nameInput = document.querySelector('#name');
const countryInput = document.querySelector('#country');
const imageInput = document.querySelector('#image');
const descriptionInput = document.querySelector('#descriprion');
const applyInput = document.querySelector('#apply');


const update = document.querySelector('.update')
update.addEventListener('click', _ => {
  // Send PUT Request here

  fetch('/projects', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameInput.value,     
      country: countryInput.value,
      descriprion: descriptionInput.value,
      image: imageInput.value,
      applyInput: applyInput.value                                  
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(res=> {
    window.location.reload(true)
  })
})

const deleteButton = document.querySelector('.delete')
//Delete event onclick event 
deleteButton.addEventListener('click', _ => {
  fetch('/projects', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameInput.value
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      if (response === 'No project to delete') {
        alert('Please type the name of the project to delete!');
      } else {
        window.location.reload(true)
      }
    })
    .catch(console.error)
})