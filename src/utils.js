export const createDate = () => {
    const currentDate = new Date();
  
    // Extract day, month, and year
    const day = currentDate.getDate().toString().padStart(2, '0'); // Ensure 2 digits with leading zero if needed
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed, so add 1
    const year = currentDate.getFullYear();
  
    // Combine into the desired format
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  }