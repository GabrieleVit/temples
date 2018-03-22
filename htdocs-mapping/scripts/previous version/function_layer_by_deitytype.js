﻿function layer_by_deitytype() {
<!--  My datafile -->
	$.getJSON("scripts/json.php", function (data) {
        temples1.addData(data);
        temples2.addData(data);
        temples3.addData(data);
        temples4.addData(data);
        temples5.addData(data);
        temples6.addData(data);
        temples7.addData(data);
    });

    // Save the currently visible basemap
    for (i in baseLayers) {
        if (map.hasLayer(baseLayers[i]) == true) {
            currentMap = baseLayers[i]
        };
    }

    // Remove existing layers & controls
    clearLayers();

    if (typeof ctl !== 'undefined') {
        map.removeControl(ctl);
    }

    // Define layers for the various kinds of monuments in temples.js
    var city = new L.LayerGroup(),
        concept = new L.LayerGroup(),
        emperor = new L.LayerGroup(),
        family = new L.LayerGroup(),
        god = new L.LayerGroup(),
        hero = new L.LayerGroup(),
        nature = new L.LayerGroup();

    temples1 = new L.geoJson(null, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: greyIcon
            });
        },
        filter: function (feature, layer) {
            return (feature.properties.deitytype.includes("city"));
        }
    }).addTo(city);

    temples2 = new L.geoJson(null, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: blackIcon
            });
        },
        filter: function (feature, layer) {
            return (feature.properties.deitytype.includes("concept"));
        }
    }).addTo(concept);

    temples3 = new L.geoJson(null, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: orangeIcon
            });
        },
        filter: function (feature, layer) {
            return (feature.properties.deitytype.includes("emperor"));
        }
    }).addTo(emperor);

    temples4 = new L.geoJson(null, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: yellowIcon
            });
        },
        filter: function (feature, layer) {
            return (feature.properties.deitytype.includes("family"));
        }
    }).addTo(family);

    temples5 = new L.geoJson(null, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: redIcon
            });
        },
        filter: function (feature, layer) {
            return (feature.properties.deitytype.includes("god"));
        }
    }).addTo(god);

    temples6 = new L.geoJson(null, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: blueIcon
            });
        },
        filter: function (feature, layer) {
            return (feature.properties.deitytype.includes("hero"));
        }
    }).addTo(hero);

    temples7 = new L.geoJson(null, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: greenIcon
            });
        },
        filter: function (feature, layer) {
            return (feature.properties.deitytype.includes("nature"));
        }
    }).addTo(nature);

    var overlays = {
        "<span style='color: grey'>Rome</span>": city,
        "<span style='color: black'>concept</span>": concept,
        "<span style='color: orange'>emperor</span>": emperor,
        "<span style='color: #c8c831'>family</span>": family,
        "<span style='color: red'>god</span>": god,
        "<span style='color: blue'>hero</span>": hero,
        "<span style='color: green'>nature</span>": nature
    };

    // Make sure this is global so the control can be deleted.
    ctl = L.control.layers(baseLayers, overlays, {
        collapsed: false,
        position: 'bottomleft'
    }).addTo(map);

    // Make the layers visible
    // First restore the map currently in use
    map.addLayer(currentMap);

    // Now add the overlays
    map.addLayer(city);
    map.addLayer(concept);
    map.addLayer(emperor);
    map.addLayer(family);
    map.addLayer(god);
    map.addLayer(hero);
    map.addLayer(nature);
}
