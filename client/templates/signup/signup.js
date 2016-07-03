var imgData;

Template.signup.events({
    'submit .signup-form': function(e, t) {
        e.preventDefault();

        let name = String(t.$('input[name="username"]').val()).trim();
        let selfie = imgData;

        if (name && selfie) {
            Meteor.logout();
            Meteor.call('makeMeAUser', {
              name: name,
              image: selfie,
              destination: Session.get('destination'),
              location: Session.get('location')
            }, function(e, uid) {
              if (!e) {
                Meteor.loginAsAnyone(uid);
              }
            });
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
    var preview = document.querySelector('img.img-preview');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
        imgData = reader.result;
    }, false);

    if (file) {
        return reader.readAsDataURL(file);
    }
}
