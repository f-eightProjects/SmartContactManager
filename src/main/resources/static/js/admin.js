console.log("hello");

document.querySelector("#image_file_input").addEventListener('change', function(event) {
    var file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function(){
        document.getElementById("upload_image_preview").src = reader.result;
    };
    reader.readAsDataURL(file);
})