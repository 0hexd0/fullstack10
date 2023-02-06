import { Gender } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === "number" || num instanceof Number;
};

const isObject = (obj: unknown): obj is object => {
  return Object.prototype.toString.call(obj) === "[Object Object]";
};

function isTObject<T extends object>(
  obj: unknown,
  props: Array<keyof T>
): obj is T {
  return (
    isObject(obj) &&
    Object.keys(obj).sort().toString() === props.sort().toString()
  );
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

function isArray<T>(
  array: unknown,
  typeChecker: (item: unknown) => boolean
): array is Array<T> {
  return Array.isArray(array) && array.every((item) => typeChecker(item));
}

export { isString, isNumber, isTObject, isObject, isDate, isGender, isArray };
