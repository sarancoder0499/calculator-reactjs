export default function Add({ numbers }: { numbers: string }): number {
  // if numbers has length more than 1 and all index are number then return addition of all
  if (numbers.length > 0) {
    let total = 0;
    numbers.split(",").map((number) => {
      if (!/^\d$/.test(number)) {
        total = 0;
        return;
      }
      total += parseInt(number);
    });
    return total;
  }

  return 0;
}
