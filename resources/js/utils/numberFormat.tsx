export const NumberFormat = (number: number): string => {
    return new Intl.NumberFormat().format(number);
};