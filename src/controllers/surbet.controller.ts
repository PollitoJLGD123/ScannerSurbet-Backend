import { Request, Response } from 'express';
import { receiveSurbet } from '../services/surbet.service';
import { Surebet } from '../types/socket.type';

export const StopSurbet = async (req: Request, res: Response) => {
  try {
    const number_type = parseInt(req.params.type);
    let type = 'live'
    if(number_type === 1){
      type = 'live'
    }
    if(number_type === 2){
      type = 'prematch'
    }
    if(number_type === 3){
      type = 'live_demo'
    }
    if(number_type === 4){
      type = 'prematch_demo'
    }
    const data: Surebet[] = JSON.parse(req.body);
    if (await receiveSurbet(data, type)){
      res.status(200).json({ success: true, message: 'OK' });
    }
    else{
      res.status(500).json({ success: false, message: 'Error al procesar los datos' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any)?.message?.toString() });
  }
};