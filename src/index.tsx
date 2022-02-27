import Ukraine from 'save-ukraine';
import { EventsApp } from './EventsApp';
import './style/body.css';

Ukraine.save();

(window as any).EventsApp = EventsApp;
