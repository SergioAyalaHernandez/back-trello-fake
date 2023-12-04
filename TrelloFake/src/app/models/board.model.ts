import {User} from "@models/user.model";
import {Colors} from "@models/colors.model";
import {List} from "@models/list.model";
import {Card} from "@models/Card.model";

export interface Board{
  id: string;
  title: string;
  backgroundColor: Colors;
  members: User[];
  lists : List[];
  cars: Card[];
}
