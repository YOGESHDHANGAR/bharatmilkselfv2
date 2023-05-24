const lastWeekDates = (currentDate, numberOfLastWeeks) => {
  const calculater = (currentDate) => {
    let startDate;
    let endDate;
    const currentYear = currentDate.slice(0, 4);
    const currentMonth = currentDate.slice(5, 7);
    const currendDay = currentDate.slice(8, 10);

    if (currentMonth == 1) {
      if (currendDay >= 1 && currendDay <= 10) {
        startDate = `${currentYear - 1}-${12}-${21}`;
        endDate = `${currentYear - 1}-${12}-${31}`;
      } else if (currendDay >= 11 && currendDay <= 20) {
        startDate = `${currentYear}-${currentMonth}-0${1}`;
        endDate = `${currentYear}-${currentMonth}-${10}`;
      } else if (currendDay >= 21 && currendDay <= 31) {
        startDate = `${currentYear}-${currentMonth}-${11}`;
        endDate = `${currentYear}-${currentMonth}-${20}`;
      }
    } else if (currentMonth == 2) {
      if (currendDay >= 1 && currendDay <= 10) {
        startDate = `${currentYear}-0${currentMonth - 1}-${21}`;
        endDate = `${currentYear}-0${currentMonth - 1}-${31}`;
      } else if (currendDay >= 11 && currendDay <= 20) {
        startDate = `${currentYear}-${currentMonth}-0${1}`;
        endDate = `${currentYear}-${currentMonth}-${10}`;
      } else if (currendDay >= 21 && currendDay <= 28) {
        startDate = `${currentYear}-${currentMonth}-${11}`;
        endDate = `${currentYear}-${currentMonth}-${20}`;
      }
    } else if (currentMonth == 3) {
      if (currendDay >= 1 && currendDay <= 10) {
        startDate = `${currentYear}-0${currentMonth - 1}-${21}`;
        endDate = `${currentYear}-0${currentMonth - 1}-${28}`;
      } else if (currendDay >= 11 && currendDay <= 20) {
        startDate = `${currentYear}-${currentMonth}-0${1}`;
        endDate = `${currentYear}-${currentMonth}-${10}`;
      } else if (currendDay >= 21 && currendDay <= 31) {
        startDate = `${currentYear}-${currentMonth}-${11}`;
        endDate = `${currentYear}-${currentMonth}-${20}`;
      }
    } else if (currentMonth == 4) {
      if (currendDay >= 1 && currendDay <= 10) {
        startDate = `${currentYear}-0${currentMonth - 1}-${21}`;
        endDate = `${currentYear}-0${currentMonth - 1}-${31}`;
      } else if (currendDay >= 11 && currendDay <= 20) {
        startDate = `${currentYear}-${currentMonth}-0${1}`;
        endDate = `${currentYear}-${currentMonth}-${10}`;
      } else if (currendDay >= 21 && currendDay <= 30) {
        startDate = `${currentYear}-${currentMonth}-${11}`;
        endDate = `${currentYear}-${currentMonth}-${20}`;
      }
    } else if (currentMonth == 5) {
      if (currendDay >= 1 && currendDay <= 10) {
        startDate = `${currentYear}-0${currentMonth - 1}-${21}`;
        endDate = `${currentYear}-0${currentMonth - 1}-${30}`;
      } else if (currendDay >= 11 && currendDay <= 20) {
        startDate = `${currentYear}-${currentMonth}-0${1}`;
        endDate = `${currentYear}-${currentMonth}-${10}`;
      } else if (currendDay >= 21 && currendDay <= 31) {
        startDate = `${currentYear}-${currentMonth}-${11}`;
        endDate = `${currentYear}-${currentMonth}-${20}`;
      }
    } else if (currentMonth == 6) {
      if (currendDay >= 1 && currendDay <= 10) {
        startDate = `${currentYear}-0${currentMonth - 1}-${21}`;
        endDate = `${currentYear}-0${currentMonth - 1}-${31}`;
      } else if (currendDay >= 11 && currendDay <= 20) {
        startDate = `${currentYear}-${currentMonth}-0${1}`;
        endDate = `${currentYear}-${currentMonth}-${10}`;
      } else if (currendDay >= 21 && currendDay <= 30) {
        startDate = `${currentYear}-${currentMonth}-${11}`;
        endDate = `${currentYear}-${currentMonth}-${20}`;
      }
    } else if (currentMonth == 7) {
      if (currendDay >= 1 && currendDay <= 10) {
        startDate = `${currentYear}-0${currentMonth - 1}-${21}`;
        endDate = `${currentYear}-0${currentMonth - 1}-${30}`;
      } else if (currendDay >= 11 && currendDay <= 20) {
        startDate = `${currentYear}-${currentMonth}-0${1}`;
        endDate = `${currentYear}-${currentMonth}-${10}`;
      } else if (currendDay >= 21 && currendDay <= 31) {
        startDate = `${currentYear}-${currentMonth}-${11}`;
        endDate = `${currentYear}-${currentMonth}-${20}`;
      }
    } else if (currentMonth == 8) {
      if (currendDay >= 1 && currendDay <= 10) {
        startDate = `${currentYear}-0${currentMonth - 1}-${21}`;
        endDate = `${currentYear}-0${currentMonth - 1}-${31}`;
      } else if (currendDay >= 11 && currendDay <= 20) {
        startDate = `${currentYear}-${currentMonth}-0${1}`;
        endDate = `${currentYear}-${currentMonth}-${10}`;
      } else if (currendDay >= 21 && currendDay <= 31) {
        startDate = `${currentYear}-${currentMonth}-${11}`;
        endDate = `${currentYear}-${currentMonth}-${20}`;
      }
    } else if (currentMonth == 9) {
      if (currendDay >= 1 && currendDay <= 10) {
        startDate = `${currentYear}-0${currentMonth - 1}-${21}`;
        endDate = `${currentYear}-0${currentMonth - 1}-${31}`;
      } else if (currendDay >= 11 && currendDay <= 20) {
        startDate = `${currentYear}-${currentMonth}-0${1}`;
        endDate = `${currentYear}-${currentMonth}-${10}`;
      } else if (currendDay >= 21 && currendDay <= 30) {
        startDate = `${currentYear}-${currentMonth}-${11}`;
        endDate = `${currentYear}-${currentMonth}-${20}`;
      }
    } else if (currentMonth == 10) {
      if (currendDay >= 1 && currendDay <= 10) {
        startDate = `${currentYear}-0${currentMonth - 1}-${21}`;
        endDate = `${currentYear}-0${currentMonth - 1}-${30}`;
      } else if (currendDay >= 11 && currendDay <= 20) {
        startDate = `${currentYear}-${currentMonth}-0${1}`;
        endDate = `${currentYear}-${currentMonth}-${10}`;
      } else if (currendDay >= 21 && currendDay <= 31) {
        startDate = `${currentYear}-${currentMonth}-${11}`;
        endDate = `${currentYear}-${currentMonth}-${20}`;
      }
    } else if (currentMonth == 11) {
      if (currendDay >= 1 && currendDay <= 10) {
        startDate = `${currentYear}-${currentMonth - 1}-${21}`;
        endDate = `${currentYear}-${currentMonth - 1}-${31}`;
      } else if (currendDay >= 11 && currendDay <= 20) {
        startDate = `${currentYear}-${currentMonth}-0${1}`;
        endDate = `${currentYear}-${currentMonth}-${10}`;
      } else if (currendDay >= 21 && currendDay <= 30) {
        startDate = `${currentYear}-${currentMonth}-${11}`;
        endDate = `${currentYear}-${currentMonth}-${20}`;
      }
    } else if (currentMonth == 12) {
      if (currendDay >= 1 && currendDay <= 10) {
        startDate = `${currentYear}-${currentMonth - 1}-${21}`;
        endDate = `${currentYear}-${currentMonth - 1}-${30}`;
      } else if (currendDay >= 11 && currendDay <= 20) {
        startDate = `${currentYear}-${currentMonth}-0${1}`;
        endDate = `${currentYear}-${currentMonth}-${10}`;
      } else if (currendDay >= 21 && currendDay <= 31) {
        startDate = `${currentYear}-${currentMonth}-${11}`;
        endDate = `${currentYear}-${currentMonth}-${20}`;
      }
    }

    return { startDate, endDate };
  };

  let lastWeekStartDate;
  let lastWeekEndDate;
  for (let i = 1; i <= numberOfLastWeeks; i++) {
    const { startDate, endDate } = calculater(currentDate);
    currentDate = startDate;
    lastWeekStartDate = startDate;
    lastWeekEndDate = endDate;
  }
  return { lastWeekStartDate, lastWeekEndDate };
};

module.exports = lastWeekDates;
