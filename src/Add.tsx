export default function Add({ numbers }: { numbers: string }): number {
  // check numbers has length 1 and it is number
  if (numbers.length == 1 && /^\d$/.test(numbers[0])) {
    return parseInt(numbers);
  }
  return 0;
}
