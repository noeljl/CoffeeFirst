import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';

export default function MapEmbedSection({coords}) {
  const position = { lat: coords.lat, lng: coords.lng };

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2 style={{fontSize: "22px"}}>Find the café</h2>
    <APIProvider apiKey={"AIzaSyC89_WpYeV6ocfM01wfJRSuIa6XadUq8pY"}>
      <div style={{ height: "620px", width: "60%" }}>
        <Map zoom={18} center={position} mapId={"e09678bdb8a175f651fc8ad3"}>
          <AdvancedMarker position={position}>
            <Pin
              background={"red"}
              borderColor={"red"}
              glyphColor={"white"}
            />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
    </section>
  );
}