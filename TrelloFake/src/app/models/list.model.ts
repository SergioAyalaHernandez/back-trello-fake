import {Card} from "@models/Card.model";

export interface List{
  id: string;
  title: string;
  position: number;
  cars: Card[];
}
