import React from "react";
import { propertyType } from "../Property/Property.types";

export interface PropertyModalProps {
  close: () => void;
  properties: propertyType[];
  setProperties: React.Dispatch<React.SetStateAction<propertyType[]>>;
}
