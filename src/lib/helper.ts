import { TGetDelimiters } from "./types";

export default function getDelimiters(numbers: string): TGetDelimiters {
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
