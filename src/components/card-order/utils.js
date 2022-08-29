const orderDate = dateString => {
  const today = new Date().getDate();
  const createdAt = new Date(Date.parse(dateString));

  const difference = today - createdAt.getDate();

  if (difference === 0) {
    return 'Сегодня';
  } else if (difference === 1) {
    return 'Вчера';
  } else {
    return `${difference} дня назад`;
  }
};

const orderTime = dateString => {
  const createdAt = new Date(Date.parse(dateString));
  const hours = createdAt.getHours();
  const minutes = createdAt.getMinutes();

  return `${hours}:${minutes} `;
};

export const getTransformedDate = createdDate =>
  `${orderDate(createdDate)}, ${orderTime(createdDate)} i-GMT+3`;
