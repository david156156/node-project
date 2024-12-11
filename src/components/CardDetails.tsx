import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCardById } from "../services/cardService";
import { Card } from "../interfaces/Card";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface CardDetailsProps {}

const CardDetails: FunctionComponent<CardDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<Card | null>(null);
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const geocodeAddress = (address: string) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        setMapCenter({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        });
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          status
        );
      }
    });
  };
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const fetchedCard = await getCardById(id!);
        setCard(fetchedCard);
        const address = `${fetchedCard.address.country}, ${fetchedCard.address.city},${fetchedCard.address.street} `;
        geocodeAddress(address);
      } catch (error) {
        console.error("Error fetching card:", error);
      }
    };

    fetchCard();
  }, [id]);

  if (!card) return <div>Loading...</div>;
  return (
    <>
      <div className="text-center">
        <div className="">
          <img
            src={card.image.url}
            className="object-fit-cover w-100"
            style={{ maxHeight: "400px" }}
            alt={card.image.alt || card.title}
          />
          <div className="card-body">
            <h2 className="display-5 p-3">{card.title}</h2>
            <p className="card-text">{card.subtitle}</p>
            <p className="card-text">{card.description}</p>
            <p className="card-text">
              <strong>Phone:</strong> {card.phone}
            </p>
            <p className="card-text">
              <strong>Email:</strong> {card.email}
            </p>
            <p className="card-text">
              <strong>Website:</strong>{" "}
              <a href={card.web} target="_blank" rel="noopener noreferrer">
                {card.web}
              </a>
            </p>
            <p className="card-text">
              <strong>Address:</strong> {card.address.city},{" "}
              {card.address.street}, {card.address.houseNumber},{" "}
              {card.address.country}
            </p>
            <LoadScript
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
            >
              {mapCenter && (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "400px" }}
                  center={mapCenter}
                  zoom={15}
                >
                  <Marker position={mapCenter} />
                </GoogleMap>
              )}
            </LoadScript>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetails;
