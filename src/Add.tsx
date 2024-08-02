export default function Add({ numbers }: { numbers: string }): number {
  // if numbers has length 1 and it is number then return first index
  if (numbers.length == 1 && /^\d$/.test(numbers[0])) {
    return parseInt(numbers);
  }

  // if numbers has length 2 with comma and it is number then return addition of two value
  if (numbers.length == 3 && /^.,/.test(numbers)) {
    return parseInt(numbers[0]) + parseInt(numbers[2]);
  }

  return 0;
}
