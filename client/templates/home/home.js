Template.home.onRendered(function() {
    var platform = new H.service.Platform({
    'app_id': 'BTyOs9Gi6lXm5zM7zS9P',
    'app_code': 'QAnZFHMjfbkKXg9aezRngA'
    });

    var maptypes = platform.createDefaultLayers();

    var map = new H.Map(
    document.getElementsByClassName('map-container')[0],
    maptypes.normal.map,
    {
      zoom: 10,
      center: { lng: 13.4, lat: 52.51 }
    });
});
