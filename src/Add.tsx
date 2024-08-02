export default function Add({ numbers }: { numbers: string }): number {
  // if numbers has length more than 1 and all index are number then return addition of all
  if (numbers.length > 0) {
    // Check for dynamic delimiters
    if (numbers.startsWith("//")) {
      numbers = numbers.replace(new RegExp(`${numbers[2]}`, "g"), ",").slice(3);
    }

    // Replace //n with comma if present (making delimiter universal)
    const formatted = numbers
      .replace(/[\\n]+/g, ",")
      .split(",")
      // Filter Empty index
      .filter((number) => number != "");

    let total = 0;
    for (let i = 0; i < formatted.length; i++) {
      if (!/^\d$/.test(formatted[i])) {
        total = 0;
        break;
      }
      total += parseInt(formatted[i]);
    }
    return total;
  }

  return 0;
}
