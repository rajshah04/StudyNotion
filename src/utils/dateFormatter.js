import React from 'react';

const dateFormatter = (createdAt) => {
    // console.log("Created at : ", createdAt) ;
    const options = { year: "numeric", month: "long", day: "numeric" } ;
    const date = new Date(createdAt) ;
    // console.log("Date : ", date) ;
    const formattedDate = date.toLocaleString('en-US', options) ;

    const hour = date.getHours() ;
    const minutes = date.getMinutes() ;
    const period = hour >= 12 ? "P.M." : "A.M." ;
    const formattedTime = `${(hour % 12) < 10 ? "0" + hour % 12 : hour % 12}:${minutes.toString().padStart(2, "0")} ${period}` ;

    // console.log(`${formattedDate} | ${formattedTime}`)

    return `${formattedDate} | ${formattedTime}` ;
}

export default dateFormatter