import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { EventCode } from "./EventCode";
import { EventNewsletter } from "./EventNewsletter";

@Index("serializeId", ["serializeId"], { unique: true })
@Index("name_topic", ["name", "topic"], { unique: true })
@Index("type", ["type"], {})
@Index("city", ["city"], {})
@Index("year", ["year"], {})
@Index("month", ["month"], {})
@Index("time", ["time"], {})
@Index("price", ["price"], {})
@Index("priceCurrency", ["priceCurrency"], {})
@Index("visibility", ["visibility"], {})
@Entity("Event", { schema: "czechevents" })
export class Event {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "serializeId", unique: true, length: 1000 })
  serializeId: string;

  @Column("varchar", { name: "name", length: 300 })
  name: string;

  @Column("varchar", { name: "topic", nullable: true, length: 500 })
  topic: string | null;

  @Column("enum", {
    name: "type",
    enum: ["CONFERENCE", "MEETUP", "WORKSHOP", "HACKATHON"]
  })
  type: "CONFERENCE" | "MEETUP" | "WORKSHOP" | "HACKATHON";

  @Column("varchar", { name: "web", nullable: true, length: 1000 })
  web: string | null;

  @Column("varchar", { name: "city", nullable: true, length: 200 })
  city: string | null;

  @Column("year", { name: "year", nullable: true })
  year: number | null;

  @Column("int", { name: "month", nullable: true })
  month: number | null;

  @Column("varchar", { name: "days", nullable: true, length: 5 })
  days: string | null;

  @Column("varchar", { name: "time", nullable: true, length: 8 })
  time: string | null;

  @Column("int", { name: "price", nullable: true })
  price: number | null;

  @Column("enum", {
    name: "priceCurrency",
    nullable: true,
    enum: ["CZK", "EUR"]
  })
  priceCurrency: "CZK" | "EUR" | null;

  @Column("enum", {
    name: "visibility",
    enum: ["PENDING", "VISIBLE", "HIDDEN", "FEATURED"],
    default: () => "'PENDING'"
  })
  visibility: "PENDING" | "VISIBLE" | "HIDDEN" | "FEATURED";

  @Column("text", { name: "note", nullable: true })
  note: string | null;

  @OneToMany(
    () => EventCode,
    eventCode => eventCode.event
  )
  eventCodes: EventCode[];

  @OneToMany(
    () => EventNewsletter,
    eventNewsletter => eventNewsletter.event
  )
  eventNewsletters: EventNewsletter[];
}
