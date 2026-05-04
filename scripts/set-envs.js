
const { writeFileSync, mkdirSync } = require( 'fs' );

require( 'dotenv' ).config();

const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

const restCountries = process.env[ 'REST_COUNTRIES_API' ];

if ( !restCountries ) {
  throw new Error( 'REST_COUNTRIES_API is not set' );
}

const envFileContent = `
export const environment = {
  restCountries: "${ restCountries }"
};
`;


mkdirSync( './src/environments', { recursive: true } );

writeFileSync( targetPath, envFileContent );
writeFileSync( targetPathDev, envFileContent );
