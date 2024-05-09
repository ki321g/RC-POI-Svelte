<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { Control, Map as LeafletMap, LayerGroup } from "leaflet";
  import { browser } from "$app/environment";
  import L from "leaflet";
  
  export const ssr = false;

  export let id = "home-map-id";
  export let height = 80;
  export let location = { lat: 53.2734, lng: -7.7783203 };
  export let width = 54;

  export let zoom = 8;
  export let minZoom = 7;
  export let activeLayer = "Terrain";
  export let allowCategories = false;
  export let centerOnMarker = false;

  let imap: LeafletMap;
  let control: Control.Layers;
  let overlays: Control.LayersObject = {};
  let baseLayers: any;
  let categoryLayers: Record<string, LayerGroup> = {};
    

  const categories = ["JUNIOR", "SENIOR"];
  

  onMount(async () => {
    if (browser) {;
      const leaflet = await import("leaflet");

      if (allowCategories) {
      categories.forEach(category => {
              categoryLayers[category] = L.layerGroup();
          });
      };

      baseLayers = {
        Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 17,
          attribution:
            'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }),
        Satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
          attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        }),
        OpenTopoMap: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          maxZoom: 17,
          attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }),
        Stadia_AlidadeSatellite: L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
          minZoom: 0,
          maxZoom: 20,
          attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          ext: 'jpg'
        }),
        Stadia_AlidadeSmoothDark: L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
          }), 
        MtbMap: L.tileLayer('http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; USGS'
        })
      };

      let defaultLayer = baseLayers[activeLayer];

      imap = leaflet.map(id, {
        center: [location.lat, location.lng],
        zoom: zoom,
        minZoom: minZoom,
        layers: [defaultLayer]
      });

      if (allowCategories) {
        Object.values(categoryLayers).forEach(layer => {
              imap.addLayer(layer);
          });
      };

      // control = leaflet.control.layers(baseLayers, overlays, categoryLayers).addTo(imap);
      const control = leaflet.control.layers({
          'Terrain': baseLayers.Terrain,
          'Satellite': baseLayers.Satellite,
          'OpenTopoMap': baseLayers.OpenTopoMap,
          'Stadia_AlidadeSatellite': baseLayers.Stadia_AlidadeSatellite,
          'Stadia_AlidadeSmoothDark': baseLayers.Stadia_AlidadeSmoothDark,
          'MtbMap': baseLayers.MtbMap
            }, {
                ...categoryLayers
                }).addTo(imap)

      // // Add titles to the layer control
      // const layerControlElement = control.getContainer();
      // const separator = layerControlElement.querySelector('.leaflet-control-layers-base');
      // const baseLayersTitle = document.createElement('h3');
      // baseLayersTitle.textContent = 'Map';
      // const overlayLayersTitle = document.createElement('h3');
      // overlayLayersTitle.textContent = 'Categories';
      // layerControlElement.insertBefore(baseLayersTitle, separator.previousSibling);
      // layerControlElement.insertBefore(overlayLayersTitle, separator.nextSibling);
  
    }
  });

  export async function addMarker(lat: number, lng: number, popupText: string, category: string) {
    const leaflet = await import("leaflet");
    const marker = leaflet.marker([lat, lng]);
    marker.addTo(imap);
    const popup = leaflet.popup({ autoClose: true, closeOnClick: false });
    popup.setContent(popupText);
    marker.bindPopup(popup);  
    if (category !== '') {
      categoryLayers[category].addLayer(marker);
    }

    // Recenter the map to the marker's location
    if (centerOnMarker) {
      imap.setView([lat, lng], imap.getZoom());
    }
  }

  export function moveTo(lat: number, lng: number) {
    imap.flyTo({ lat: lat, lng: lng });
  }

</script>

<div {id} class="box" style="height: {height}vh; width: {width}vh" />
