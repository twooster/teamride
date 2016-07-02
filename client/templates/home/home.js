Template.home.onCreated(function () {
    this.locationVar = new ReactiveVar();
});

Template.home.onRendered(function () {
    var platform = new H.service.Platform({
        'app_id': 'BTyOs9Gi6lXm5zM7zS9P',
        'app_code': 'QAnZFHMjfbkKXg9aezRngA'
    });

    var maptypes = platform.createDefaultLayers();

    this.map = new H.Map(
        document.getElementsByClassName('map-container')[0],
        maptypes.normal.map,
        {
            zoom: 15,
            center: {lng: 13.4, lat: 52.51}
        }
    );

    this.places = platform.getPlacesService();
});

Template.home.events({
    'change input#destination': function (e, t) {
        //destination unknown known known
        t.places.search({
            q: e.currentTarget.value,
            in: '53.12,10.15;r=6000000'
        }, function (r) {
            if (r.results.items.length > 0) {
                var res = r.results.items[0];
                t.map.setCenter({lng: res.position[1], lat: res.position[0]});
                t.locationVar.set(res);
            }
        }, function (e, r) {
            console.log(e, r);
        });
    },
    'click .page-footer button': function (e, t) {
        e.preventDefault();
        Session.set("selfLocationData", t.locationVar.get());
        Router.go("/signup");
    }
});

Template.home.helpers({
    location: function () {
        return Template.instance().locationVar.get();
    }
});
