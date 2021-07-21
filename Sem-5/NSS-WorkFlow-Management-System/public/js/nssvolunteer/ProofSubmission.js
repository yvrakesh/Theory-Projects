function File_Upload(){
  function Init() {
    console.log("Upload started");
    var fileSelect    = document.getElementById('file-upload'),
        fileDrag      = document.getElementById('file-drag'),
        submitButton  = document.getElementById('submit-button');
    fileSelect.addEventListener('change', fileSelectHandler, false);
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
      fileDrag.addEventListener('dragover', fileDragHover, false);
      fileDrag.addEventListener('dragleave', fileDragHover, false);
      fileDrag.addEventListener('drop', fileSelectHandler, false);
    }
  }
  function fileDragHover(e) {
    var fileDrag = document.getElementById('file-drag');
    e.stopPropagation();
    e.preventDefault();
    fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
  }
  function fileSelectHandler(e) {
    var files = e.target.files || e.dataTransfer.files;
    fileDragHover(e);
    for (var i = 0, f; f = files[i]; i++) {
      parseFile(f);
      uploadFile(f);
    }
  }
  function output(msg) {
    var m = document.getElementById('messages');
    m.innerHTML = msg;
  }
  function parseFile(file) {
    console.log(file.name);
    output('<strong>' + encodeURI(file.name) + '</strong>');
    document.getElementById('start').classList.add("hidden");
    document.getElementById('response').classList.remove("hidden");
    document.getElementById('notimage').classList.add("hidden");
    document.getElementById('file-image').classList.remove("hidden");
  }
  function setProgressMaxValue(e) {
    var pBar = document.getElementById('file-progress');
    if (e.lengthComputable) {
      pBar.max = e.total;
    }
  }
  function updateFileProgress(e) {
    var pBar = document.getElementById('file-progress');
    if (e.lengthComputable)
      pBar.value = e.loaded;
  }
  function uploadFile(file) {
    var xhr = new XMLHttpRequest(),
      fileInput = document.getElementById('class-roster-file'),
      pBar = document.getElementById('file-progress'),
      fileSizeLimit = 1024;
    if (xhr.upload) {
      if (file.size <= fileSizeLimit * 1024 * 1024) {
        pBar.style.display = 'inline';
        xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
        xhr.upload.addEventListener('progress', updateFileProgress, false);
        xhr.open('POST', document.getElementById('file-upload-form').action, true);
        xhr.setRequestHeader('X-File-Name', file.name);
        xhr.setRequestHeader('X-File-Size', file.size);
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.send(file);
      } 
      else
        output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
    }
  }
  if (window.File && window.FileList && window.FileReader)
    Init();
  else
    document.getElementById('file-drag').style.display = 'none';
}
File_Upload();




function appear(){
  document.getElementById('submit').removeAttribute('disabled');
}