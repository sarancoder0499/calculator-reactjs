export default function Add({ numbers }: { numbers: string }): number {
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
      if (number <= 1000) {
        total += number;
      }
    }
    if (negatives.length > 0) {
      throw new Error(`negatives not allowed ${negatives.join(",")}`);
    }
    return total;
  }

  return 0;
}

type TGetDelimiters = {
  position: number;
  values: string;
};
function getDelimiters(numbers: string): TGetDelimiters {
  const delimiters: string[] = [];

  // Check and return single delimiter
  if (!numbers.startsWith("//")) {
    return {
      position: -1,
      values: "",
    };
  }

  // Check and return double delimiter
  if (numbers[2] != "[") {
    delimiters.push(numbers[2]);
    return {
      position: 2,
      values: delimiters.join("|"),
    };
  }

  // Start finding delimiters from index 3
  let i = 3;
  let format = "";

  while (i <= numbers.length) {
    if (numbers[i] != "]") {
      format += numbers[i];
      i++;
    }
    if (numbers[i] == "]" && format) {
      format = format.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      delimiters.push(format);
      format = "";
      if (numbers[i + 1] && numbers[i + 1] == "[") {
        i = i + 2;
      } else {
        i++;
        break;
      }
    }

    if (numbers[i] == "]" && !format) {
      break;
    }
  }
  return {
    position: i,
    values: delimiters.join("|"),
  };
}
