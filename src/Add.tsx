export default function Add({ numbers }: { numbers: string }): number {
  if (numbers != "") {
    return parseInt(numbers);
  }
  return 0;
}
