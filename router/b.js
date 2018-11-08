

const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');

function execl (){
    const defpath = path.join(__dirname, '../');
    const excel = xlsx.parse(defpath + 'LISTOFEP-Jen.xlsx')
    const readlines = excel[0].data;
    const Referred = excel[1].data //简称数据
    let notrepeat = []//去重后的数组
    console.log(readlines,'9999');
    console.log(Referred,'88');
    for (let i = 1; i <= readlines.length - 1; i++) {
        let data = [...readlines[i]];
        if (!data[0]) {//participant_id不能为空
            // err.ParticipantId = `第${i + 1}行Participant ID不能为空`
            // dataArray.push(err);
            console.log(`第${i + 1}行Participant ID不能为空`)
        } else {
            if (typeof data[0] == 'number') {
                let cler = notrepeat.filter(param => { return param[0] == data[0] })//查找是否已经有此条数据
                if (!cler.length > 0) {//没有重复数据
                    let readfilter =  Referred.filter(param => { return data[2] == param[1] })
                    if(readfilter.length>0){
                        
                    }
                    let params2 = {
                        participant_id: data[0],
                        broker_no: data[1] || '',
                        participant_name: data[2] || '',
                        participant_name_chinese: data[3] || '',
                        trading_status: data[4] || '',
                        address_1: data[5] || '',
                        address_2: data[6] || '',
                        address_3: data[7] || '',
                        address_4: data[8] || '',
                        address_chinese: data[9] || '',
                        telephone_no: data[10] || '',
                        fax_no: data[11] || '',
                        website_address: data[12] || '',
                        stock_options_participantship: data[13] || '',
                        hkscc_participantship: data[14] || '',
                        seoch_participantship: data[15] || '',
                        other_business_address1: data[16] || '',
                        other_business_address2: data[17] || '',
                        other_business_address3: data[18] || '',
                        other_business_address4: data[19] || '',
                        status: 2,
                        update_import_time: new Date().getTime()
                    }
                }
            }
        }
    }
}
execl();

module.exports = qwe =>{
    
}

