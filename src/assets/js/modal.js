
function openModal(target, title) {
  var modal = document.querySelector(target);
  var modalTitle = modal.querySelector('.modal-title');
  modalTitle.textContent = title; // Set dynamic title
  modal.style.display = 'block';
}


function closeModal(target) {
  var modal = document.querySelector(target);
  modal.style.display = 'none';
}


function populateModalForUpdate(defaultData) {
  document.getElementById('name').value = defaultData.name || ''; // Set default value for the name field
  
 
  if (defaultData.image) {
    var imgView = document.getElementById('img-view');
    imgView.style.backgroundImage = `url(${defaultData.image})`; // Set background image
    imgView.style.border = 'none'; 
    imgView.innerHTML = '';
  }
  
}


document.querySelectorAll('.open-modal').forEach(function(button) {
  button.addEventListener('click', function() {
    var target = this.getAttribute('data-target');
    var action = this.getAttribute('data-action');
    var title = this.getAttribute('data-title');
    openModal(target, title);
    if (action === 'update') {
      var defaultData = {
        
        name: 'bmw', 
        image: 'images/bmw1.png',
        
      };
      populateModalForUpdate(defaultData);
    }
  });
});


document.querySelectorAll('[data-dismiss="modal"]').forEach(function(button) {
  button.addEventListener('click', function() {
    var target = this.closest('.modal');
    closeModal('#' + target.id);
  });
});

  const dropArea = document.getElementById("drop-area")
  const inputFile = document.getElementById("picture")
  const imgView = document.getElementById("img-view")

  inputFile.addEventListener("change",uploadImage)

  function uploadImage(){
    let imgLink=URL.createObjectURL(inputFile.files[0]);
    imgView.style.backgroundImage=`url(${imgLink})`;
    imgView.style.border=0;
    imgView.innerHTML = "";
  }

  dropArea.addEventListener("dragover",function(e){
    e.preventDefault();
  })
  dropArea.addEventListener("drop",function(e){
    e.preventDefault();
    inputFile.files=e.dataTransfer.files
    uploadImage()
  })

  new MultiSelectTag('subcategory')  

  