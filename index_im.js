const ipp = require('ipp');
const mdns = require('mdns');
const browser  = mdns.createBrowser(mdns.tcp('ipp'));

const TIMEOUT = 1000;

const fs = require('fs')
const streamToBuffer = require('stream-to-buffer')
const { createCanvas, loadImage, registerFont } = require('canvas')
const canvas = createCanvas(1800, 1280)
const ctx = canvas.getContext('2d')
registerFont(__dirname + '/Pacifico-Regular.ttf', {family: 'Pacifico-Regular'})
registerFont(__dirname + '/GreatVibes-Regular.ttf', {family: 'GreatVibes-Regular'})


/***
 *
 * Node-Canvas Create Canvas with text rendered into it
 *
 */

// Fill write background
ctx.beginPath();
ctx.rect(0, 0, 1800, 1280);
ctx.fillStyle = "rgba(255,255,255,1)";
ctx.fill();

// Fill text
ctx.font = '72px "GreatVibes-Regular"'
ctx.fillStyle = "rgba(0,0,255,1)";
ctx.textAlign="center";
ctx.fillText('TEST test!' + "\n中文無辦法", canvas.width / 2, canvas.height / 2)

// canvas.toDataURL('image/jpeg', function(err, jpeg){
// 	console.log(jpeg)
// });

// DEBUG: Write canvas content into 'output.jpg'
let writeStream = fs.createWriteStream('output.jpg', { flags : 'w' });
canvas.jpegStream().pipe(writeStream)


/***
 *
 * IPP Printing
 *
 */


// new Promise((resolve, reject) => {
// 	// 
// 	// Search ipp printers using MDNS
// 	// 
// 	var printers = {}
// 	browser.on('serviceUp', function (rec) {
// 		printers[rec.name] = 'http://'+rec.host+':'+rec.port+'/'+rec.txtRecord.rp
// 	});
// 	browser.start();

// 	// Stop searching and return result after preset timeout
// 	setTimeout(() => {
// 		browser.stop()
// 		resolve(printers)
// 	}, TIMEOUT);
// })
// .then((printers) => {
// 	// 
// 	// Return found printers
// 	// 

// 	// DEBUG: Show return printers
// 	// console.log('Result: ', printers)

// 	// We are sending 1 copy to all printers found
// 	for (var i in printers) {
// 		let printer = ipp.Printer(printers[i]);

// 		// Get printer attributes based on IPP 2.0 protocols
// 		// e.g. Does the printer support 'media' option? => ['printer-attributes-tag']['media-supported']
// 		printer.execute("Get-Printer-Attributes", null, function(err, res){
// 			// console.log('******************\n' + i + '\n******************\n');
// 			// if(res['printer-attributes-tag']['job-creation-attributes-supported']) {
// 			// 	res['printer-attributes-tag']['job-creation-attributes-supported'].forEach((attribute) => {
// 			// 		console.log('#### ' + attribute + '-supported')
// 			// 		console.log('>> ', res['printer-attributes-tag'][attribute + '-supported'])
// 			// 	})
// 			// }

// 			let params = {
// 				"operation-attributes-tag": {
// 					"requesting-user-name": "NODE_PRINT",
// 					"job-name": "print_" + new Date(),
// 					"document-format": "image/jpeg"
// 				},
// 				"job-attributes-tag":{
// 					"media-col": {
// 						"media-source": "photo"
// 					}
// 				},
// 				"data":null
// 			}
// 			if(res['printer-attributes-tag']['copies-supported']) params['job-attributes-tag']['copies'] = 1
// 			if(res['printer-attributes-tag']['sides-supported']) params['job-attributes-tag']['sides'] = 'one-sided'
// 			if(res['printer-attributes-tag']['media-supported']) params['job-attributes-tag']['media'] = 'na_index-4x6_4x6in'
// 			if(res['printer-attributes-tag']['print-quality-supported']) params['job-attributes-tag']['print-quality'] = 'draft'
// 			// if(res['printer-attributes-tag']['print-scaling-supported']) params['job-attributes-tag']['print-scaling'] = 'auto'


			
// 			// 
// 			// Convert Canvas into JPEG stream and print
// 			// DEBUG: Temp disabled
// 			// 
// 			streamToBuffer(canvas.jpegStream(), (err, buffer) => { 
// 				console.log(err)
// 				if(err) return

// 				params.data = buffer

// 				// Send print job to ipp printer found
// 				printer.execute("Print-Job", params, function(err, res){
// 					console.log(err);
// 					console.log(res);

// 					// When job executed, show print job details and received attrubutes
// 					let msg = {
// 						"operation-attributes-tag": {
// 							'job-uri': res['job-attributes-tag']['job-uri']
// 						}
// 					};
// 					printer.execute("Get-Job-Attributes", msg, function(err, res){
// 						console.log(res);
// 					});
// 				})
// 			});
// 		});
// 	}
// })