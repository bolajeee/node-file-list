#!/usr/bin/env node

const fs = require('fs')

 // wrapping lstat as promise #2
// const util = require('util')
// const stat = util.promisify(fs.lstat)

 // wrapping lstat as promise #3
 const { lstat } = fs.promises
//  or
//  const lstat = fs.promises(lstat)

fs.readdir(process.cwd(), async (err, filenames) => {
    if(err){
        throw new error(err)
    }

   const statPromises = filenames.map(filename => {
    return lstat(filename)
   })

   const allstats = await Promise.all(statPromises)

   for(let stats of allstats){
    const index = allstats.indexOf(stats)

    console.log(filenames[index], stats.isFile())
   }
    

    // wrapping lstat as promise #1
    // const lstat = filename => {
    //     return new Promise ((resolve, reject) => {
    //         fs.lstat(filename, (err, stats)){
    //         if(err){
    //             reject(err)
    //         }
    //         resolve(stats)
    //     }
    //     })
    // }



    // bad code
    // for(let file of filename){
    //     fs.lstat(file,(err, filetype) => {
    //         if(err){
    //             throw new error(err)
    //         }

    //         console.log(file, filetype.isFile())
    //     })
    // }
    // bad code


})

