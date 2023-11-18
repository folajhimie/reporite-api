// Logging.ts
// import kleur from 'kleur';

// export default class Logging {
//     public static log = (args: any) => this.info(args);
//     public static info = (args: any) => console.log(
//         kleur.blue(`[${new Date().toLocaleString()}][INFO]`), 
//         typeof args === 'string' ? (kleur as any).blueBright(args) : args
//     );
//     public static warn = (args: any) => 
//         console.log(kleur.yellow(`[${new Date().toLocaleString()}][INFO]`), 
//         typeof args === 'string' ? (kleur as any).yellowBright(args) : args
//     );
//     public static error = (args: any) => 
//         console.log(kleur.red(`[${new Date().toLocaleString()}][INFO]`), 
//         typeof args === 'string' ? (kleur as any).redBright(args) : args
//     );
// }
import kleur from 'kleur';

export default class Logging {
    public static log = (args: any) => this.info(args);
    public static info = (args: any) => console.log((kleur as any).blue(`[${new Date().toLocaleString()}][INFO]`), typeof args === 'string' ? (kleur as any).blue(args) : args);
    public static warn = (args: any) => console.log((kleur as any).yellow(`[${new Date().toLocaleString()}][INFO]`), typeof args === 'string' ? (kleur as any).yellow(args) : args);
    public static error = (args: any) => console.log((kleur as any).red(`[${new Date().toLocaleString()}][INFO]`), typeof args === 'string' ? (kleur as any).red(args) : args);
}




// Import chalk dynamically
// import('chalk').then((chalk) => {
//     export default class Logging {
//         public static log = (args: any) => this.info(args);
//         public static info = (args: any) =>
//             console.log(
//                 chalk?.blue(`[${new Date().toLocaleString()}][INFO]`),
//                 typeof args === 'string' ? chalk.blueBright(args) : args
//             );

//         public static warn = (args: any) =>
//             console.log(
//                 chalk.yellow(`[${new Date().toLocaleString()}][INFO]`),
//                 typeof args === 'string' ? chalk.yellowBright(args) : args
//             );

//         public static error = (args: any) =>
//             console.log(
//                 chalk.red(`[${new Date().toLocaleString()}][INFO]`),
//                 typeof args === 'string' ? chalk.redBright(args) : args
//             );
//     };
// });


