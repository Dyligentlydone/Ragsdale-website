"use client"

import "leaflet/dist/leaflet.css"
import "./shop-map.css"

import L from "leaflet"
import { MapContainer, Marker, TileLayer } from "react-leaflet"

const SHOP = {
  lat: 43.1315639,
  lng: -85.5560469,
}

const pinIcon = L.divIcon({
  className: "",
  html: `
    <div style="position:relative;width:36px;height:36px;transform:translate(-50%,-50%);">
      <span style="position:absolute;inset:5px;border-radius:9999px;background:rgba(140,198,63,0.45);animation:ragsdale-pin-ping 2s cubic-bezier(0,0,0.2,1) infinite;"></span>
      <span style="position:absolute;inset:5px;border-radius:9999px;background:rgba(140,198,63,0.35);animation:ragsdale-pin-ping 2s cubic-bezier(0,0,0.2,1) infinite; animation-delay:0.6s;"></span>
      <img src="/images /LOGO.png" alt="Ragsdale" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 0 6px rgba(140,198,63,0.55));" />
    </div>
    <style>
      @keyframes ragsdale-pin-ping {
        0% { transform: scale(0.9); opacity: 0.7; }
        80%,100% { transform: scale(2); opacity: 0; }
      }
    </style>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
})

export default function ShopMapInner() {
  return (
    <MapContainer
      center={[SHOP.lat, SHOP.lng]}
      zoom={15}
      scrollWheelZoom={true}
      doubleClickZoom={true}
      dragging={true}
      style={{ height: "100%", width: "100%", background: "#000" }}
      zoomControl={true}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains={["a", "b", "c", "d"]}
        maxZoom={20}
      />
      <Marker position={[SHOP.lat, SHOP.lng]} icon={pinIcon} />
    </MapContainer>
  )
}
