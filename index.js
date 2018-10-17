const csv = require('csvtojson')
const fs = require('fs')
const Json2csvParser = require('json2csv').Parser;
const rfcDirectoryMap = require('./directory')

const fields = ['hris_id', 'userId', 'username', 'fullname', 'area', 'email', 'department', 'rank', 'position', 'employment_status', 'region', 'district'];

const csvFilePath = './prodrfcdata.csv'

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    // read csv

    var x = jsonObj.filter(emp => { // filter for visayas and ho first
      if(rfcDirectoryMap[emp.department] || emp.department.includes('HO-')){
        return emp
      }
    })
    .map(emp => {
      if(rfcDirectoryMap[emp.department]){
        return {...rfcDirectoryMap[emp.department], ...emp} // add corresponding region and district
      }

      return emp
    })

    const json2csvParser = new Json2csvParser({ fields });
    const csv = json2csvParser.parse(x);

    // write to file for upload
    fs.writeFile('test.csv', csv, function(err) {
      if(err) console.log(err)

      console.log('success writing')
    })
})
