import { Surebet } from '../types/socket.type';
import { organizationData } from '../socket/process';
import { sendData } from '../socket/socket';


export const receiveSurbet = async (surebets: Surebet[], type = 'live') => {
    try{
        let processedData:any[]
        if (!surebets || !Array.isArray(surebets) || surebets.length === 0) {
            processedData = []
        }
        else{
            processedData = await organizationData(surebets);
        }
        await sendData(processedData, type);
        return true
    }catch(Exception){
      console.log(Exception);
      return false
    }
};