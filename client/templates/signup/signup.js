Template.signup.events({
    'submit .signup-form': function(e, t) {
        e.preventDefault();
        let data = Template.currentData();

        debugger
        let name = String(t.$('input[name="username"]').val()).trim();
        let selfie = previewFile();
        if (name && selfie) {
            let uid = Users.insert({
              name: name,
              image: selfie,
              destination: Session.get('destination'),
              location: Session.get('location')
            });
            Meteor.call('loginAsAnyone', uid);
            debugger
        }
    },
});

 toDataUrl = function (url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}

 uint8ToString = function (buf) {
    var i, length, out = '';
    for (i = 0, length = buf.length; i < length; i += 1) {
        out += String.fromCharCode(buf[i]);
    }
    return out;
};


previewFile = function () {
    var preview = document.querySelector('img[name=file]');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);

    if (file) {
        return reader.readAsDataURL(file);
    }
};
