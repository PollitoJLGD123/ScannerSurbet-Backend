import { Request } from 'express';

export interface WebSocketWithEvents extends WebSocket {
    on(event: 'close', listener: () => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
}

export interface HeaderSurebet {
    percent: string;
    percent_color: string;
    sportName: string;
    home1: string;
    home2: string;
    period: string;
    middle_value: string;
    time: string | any;
}

export interface SectionSurebet {
    book_name: string;
    event_name: string;
    league_name: string;
    market: string;
    odds: string;
    arrowClass: string;
    score?: string;
    date_game?: string;
}

export interface Surebet {
    header: HeaderSurebet;
    sections: SectionSurebet[];
}