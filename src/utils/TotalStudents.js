const getTotalStudents = (courses) => {
    if(!courses || courses?.length === 0) return 0 ;

    const totalStudentCount = courses.reduce((acc, curr) => {
        acc += curr.studentsEnrolled.length ;
        return acc ;
    }, 0) ;

    return totalStudentCount ;
}

export default getTotalStudents