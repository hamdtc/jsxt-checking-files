
const jsxl = require('jsxl');
// jsxl(
//     {
//         input: {
//             nyc: { city: 'New York City' },
//             atl: { city: 'Atlanta' },
//             chi: { city: 'Chicago' }
//         }
//     },
//     {
//         $type: {
//             $: { 
//                 city: String 
//             }
//         },
//         $toArray: 'initials'
//     },
//     (err, output) => {
//         console.log(output);
//         // yields: [ { city: 'New York City', initials: 'nyc' },
//         //           { city: 'Atlanta', initials: 'atl' },
//         //           { city: 'Chicago', initials: 'chi' } 
//         //         ]
//     });

// to json object
jsxl(
    {
        input: [ { city: 'New York City', initials: 'nyc' },
                 { city: 'Atlanta', initials: 'atl' },
                 { city: 'Chicago', initials: 'chi' } 
               ]
    },
    {
        $type: [
            { 
                city: String,
                initials: String
            }
        ],
        $toObject: 'initials'
    },
    (err, output) => {
        console.log(output);
  
    });