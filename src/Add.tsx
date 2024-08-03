import getDelimiters from "./lib/helper";
import { MAX_LIMIT } from "./lib/constant";
import { MSG } from "./lib/message";
import { TAdd } from "./lib/types";

export default function Add({ numbers }: TAdd): number {
  // if numbers has length more than 1 and all index are number then return addition of all
  if (numbers.length > 0) {
    // Get all Delimiters
    const delimiter = getDelimiters(numbers);

    // Slicing till delimiters end
    numbers =
      delimiter.position < 0 ? numbers : numbers.slice(delimiter.position);

    // Squeeze only the numbers
    const formatted = numbers
      // Replace all dynamic delimiters if provided with ,
      .replace(new RegExp(delimiter.values, "g"), ",")
      // Remove all new lines with ,
      .replace(/[\\n]+/g, ",")
      // Spit using comma to form array
      .split(",")
      // Filter Empty strings
      .filter((number) => number != "");

    let total = 0;
    const negatives = [];
    for (let i = 0; i < formatted.length; i++) {
      if (!/^-?\d+$/.test(formatted[i])) {
        total = 0;
        break;
      }
      const number = parseInt(formatted[i]);
      // Add negatives to bag
      if (number < 0) {
        negatives.push(number);
      }

      // Ignore if number greater than 1000
      if (number <= MAX_LIMIT) {
        total += number;
      }
    }
    if (negatives.length > 0) {
      throw new Error(`${MSG.NEGATIVES_NOT_ALLOWED} ${negatives.join(",")}`);
    }
    return total;
  }

  return 0;
}
