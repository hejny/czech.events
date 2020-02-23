import { Entity, PrimaryGeneratedColumn, Column, Index, Unique } from 'typeorm';


export enum EventCodeType {
    DISCOUNT_PERCENT = 'DISCOUNT_PERCENT',
}


DROP TABLE IF EXISTS `EventCode`;
CREATE TABLE `EventCode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) NOT NULL,
  `type` enum('DISCOUNT_PERCENT') COLLATE utf8_bin NOT NULL,
  `code` varchar(200) COLLATE utf8_bin NOT NULL,
  `value` float(10,2) NOT NULL COMMENT '',
 
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `type` (`type`),
  KEY `value` (`value`),
  CONSTRAINT `EventCode_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `Event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Promo codes for events';




@Entity({ name: 'Event' /*TODO: DRY*/ })
@Index(['name', 'topic'], { unique: true })
export class Event {
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column({ nullable: false, length: 1000 })
    @Index({ unique: false })
    public event_id: string;

    @Column({ nullable: false, length: 1000 })
    @Index({ unique: true })
    public type: string;

    @Column({ nullable: false, length: 1000 })
    @Index({ unique: true })
    public code: string;

    @Column({ nullable: false, length: 1000, comment: 'Here are the percents. Please write them in 0-1 interval, for example, 25% has value 0.25 here.' })
    @Index({ unique: true })
    public value: string;

    @Column({ nullable: true, type: 'text', comment: 'Only a hidden note not visible for visitors of the web' })
    public note?: string;
  
}
