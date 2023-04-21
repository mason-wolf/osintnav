import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() country;
  @Output() viewForce: EventEmitter<any> = new EventEmitter();

  private map;

  constructor() { }

  private initMap(): void {

    if (this.map !== undefined && this.map !== null) { this.map.remove(); }

    this.map = L.map('map', {
      center: [ 33.20097493343204, -87.54411968949736 ],
      zoom: 1,
    });

    const tiles = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    let zoomLocation = [];
    this.country.forces.forEach(force => {
      if (force.lat) {
        var icon = L.icon({
          iconUrl: 'assets/force_icon.png',
          iconSize: [30, 45]
          });

        var marker = L.marker([force.lat, force.lng], {icon: icon}).addTo(this.map).on('click', (event) => {
          this.viewForce.emit(force);
        });

      //  marker.bindPopup(force.description);
        zoomLocation = [force.lat, force.lng];
      }
    })

    this.map.flyTo(zoomLocation, 3);
    this.map.dragging.enable();

  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
  }

}
