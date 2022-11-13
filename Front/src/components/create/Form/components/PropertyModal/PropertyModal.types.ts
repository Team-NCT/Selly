import React from "react";
import { PropertyType } from "../Property/Property.types";

export interface PropertyModalProps {
  close: () => void;
  properties: PropertyType[];
  setProperties: React.Dispatch<React.SetStateAction<PropertyType[]>>;
}
