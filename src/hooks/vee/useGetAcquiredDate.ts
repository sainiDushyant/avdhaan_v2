

const useGetAcquiredDate = (startDate: string, endDate: string) => {

const today = new Date().toDateString();
const startingDate = startDate ? new Date(startDate).toDateString() : ""
const endingDate =  endDate ? new Date(endDate).toDateString() : ""

return startingDate && endingDate
      ? `${startingDate} -> ${endingDate}`
      : startingDate && !endingDate
      ? `${startingDate} -> ${today}`
      : !startingDate && endingDate
      ? `${today} -> ${endingDate}`
      : today;
};

export default useGetAcquiredDate;
