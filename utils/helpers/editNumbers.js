// put asterixs in the middle of the number
export const editAccountNumber = (number) => {
  const numberArray = number.split("");
  const asterixs = numberArray.map((item, index) => {
    if (index > 2 && index < numberArray.length - 3) {
      return "*";
    }
    return item;
  });
  return asterixs.join("");
};

// format numbers to have commas
export const formatBalance = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const editNumberSign = (number, type) => {
  // deposit,witdrawal,sent,recieved
  switch (type) {
    case "deposit":
      return `+ $${number}`;
    case "withdrawal":
      return `- $${number}`;
    case "sent":
      return `- $${number}`;
    case "received":
      return `+ $${number}`;
    default:
      return number;
  }
};
